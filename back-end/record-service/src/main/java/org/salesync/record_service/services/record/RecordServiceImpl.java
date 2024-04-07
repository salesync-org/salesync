package org.salesync.record_service.services.record;

import lombok.RequiredArgsConstructor;
import org.salesync.record_service.constants.Message;
import org.salesync.record_service.dtos.*;
import org.salesync.record_service.dtos.record_type_relation_dto.ListRecordTypeRelationsDto;
import org.salesync.record_service.dtos.record_type_relation_dto.RecordTypeRelationDto;
import org.salesync.record_service.dtos.record_type_relation_dto.RequestRecordTypeRelationDto;
import org.salesync.record_service.entities.Record;
import org.salesync.record_service.entities.RecordTypeProperty;
import org.salesync.record_service.entities.RecordTypeRelation;
import org.salesync.record_service.exceptions.ConcurrentUpdateException;
import org.salesync.record_service.exceptions.ObjectNotFoundException;
import org.salesync.record_service.mappers.RecordMapper;
import org.salesync.record_service.mappers.RecordTypePropertyMapper;
import org.salesync.record_service.mappers.RecordTypeRelationMapper;
import org.salesync.record_service.mappers.RelationItemMapper;
import org.salesync.record_service.repositories.RecordRepository;
import org.salesync.record_service.repositories.RecordTypePropertyRepository;
import org.salesync.record_service.repositories.RecordTypeRelationRepository;
import org.salesync.record_service.repositories.RecordTypeRepository;
import org.salesync.record_service.utils.SecurityContextHelper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.RestTemplate;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Transactional(rollbackFor = Throwable.class)
public class RecordServiceImpl implements RecordService {

    private final RecordRepository recordRepository;
    private final RecordTypeRepository recordTypeRepository;
    private final RecordTypePropertyRepository recordTypePropertyRepository;
    private final RestTemplate restTemplate;
    private final RecordTypeRelationRepository recordTypeRelationRepository;
    private final RecordMapper recordMapper = RecordMapper.INSTANCE;
    private final RecordTypeRelationMapper recordTypeRelationMapper = RecordTypeRelationMapper.INSTANCE;
    private final RelationItemMapper relationItemMapper = RelationItemMapper.INSTANCE;
    private final RecordTypePropertyMapper recordTypePropertyMapper = RecordTypePropertyMapper.INSTANCE;

    @Override
    public ListRecordsResponseDto getFilteredRecords(ListRecordsRequestDto requestDto) {
        Pageable pageRequest = PageRequest.of(requestDto.getCurrentPage() - 1, requestDto.getPageSize());
        Page<Record> page = null;
        if (requestDto.getPropertyName() != null) {
            page = recordRepository
                    .getFilteredRecord(requestDto.getPropertyName(),
                            requestDto.getTypeId(),
                            requestDto.getSearchTerm(),
                            requestDto.getIsAsc(),
                            pageRequest
                    );
        } else {
            page = recordRepository
                    .getFilteredRecordsAndOrderByName(requestDto.getTypeId(),
                            requestDto.getSearchTerm(),
                            requestDto.getIsAsc(),
                            pageRequest
                    );
        }
        List<RecordDto> recordDtos = page.getContent().stream()
                .map(recordMapper::recordToRecordDto)
                .toList();

        return ListRecordsResponseDto.builder()
                .records(recordDtos)
                .totalSize(page.getTotalElements())
                .pageSize(page.getSize())
                .currentPage(page.getNumber() + 1)
                .build();
    }

    @Override
    public List<RecordDto> getAllRecords() {
        return recordRepository.findAll()
                .stream().map(recordMapper::recordToRecordDto)
                .toList();
    }

    @Override
    public ListRecordsResponseDto getAllRecordsWithCondition(ListRecordsRequestDto listRecordsRequestDto) {
        return ListRecordsResponseDto.builder()
                .records(recordRepository.findAll().stream()
                        .map(recordMapper::recordToRecordDto)
                        .toList())
                .build();
    }

    @Override
    public RecordDto createRecordByType(RequestRecordDto requestRecordDto) {
        Record recordEntity = new Record();
        recordEntity.setUserId(UUID.fromString(requestRecordDto.getUserId()));

        return recordMapper.recordToRecordDto(recordRepository.save(recordEntity));
    }

    @Override
    public RecordDto getRecordById(String recordId) {
        return recordMapper.recordToRecordDto(recordRepository.findById(UUID.fromString(recordId)).orElse(null));
    }

    @Override
    public RecordTypeRelationDto createRecordTypeRelation(RequestRecordTypeRelationDto requestRecordTypeRelationDto) {
        System.out.println(requestRecordTypeRelationDto);

        UUID sourceRecordId = requestRecordTypeRelationDto.getSourceRecordId();
        Record sourceRecord = recordRepository.findById(sourceRecordId).orElseThrow(
                () -> new ObjectNotFoundException(
                        "Source type",
                        sourceRecordId.toString()
                )
        );

        UUID destinationRecordId = requestRecordTypeRelationDto.getDestinationRecordId();
        Record destinationRecord = recordRepository.findById(destinationRecordId).orElseThrow(
                () -> new ObjectNotFoundException(
                        "Destination type",
                        destinationRecordId.toString()
                )
        );

        RecordTypeRelation recordTypeRelation = RecordTypeRelation.builder()
                .typeRelationId(requestRecordTypeRelationDto.getTypeRelationId())
                .sourceRecord(sourceRecord)
                .destinationRecord(destinationRecord)
                .build();

        return recordTypeRelationMapper.recordTypeRelationToRecordTypeRelationDto(
                recordTypeRelationRepository.save(recordTypeRelation)
        );
    }

    @Override
    public RecordTypePropertyDto updateRecordProperty(RecordTypePropertyDto recordTypePropertyDto) {
        RecordTypeProperty recordTypeProperty = recordTypePropertyRepository.findById(recordTypePropertyDto.getId()).orElseThrow(
                () -> new ObjectNotFoundException(
                        "Record type property",
                        recordTypePropertyDto.getId().toString()
                )
        );
        recordTypeProperty.setItemValue(recordTypePropertyDto.getItemValue());
        return recordTypePropertyMapper.entityToDto(recordTypePropertyRepository.save(recordTypeProperty));
    }

    @Override
    public void deleteRecordsById(List<UUID> recordIds) {
        String userContextId = SecurityContextHelper.getContextUserId();
        recordIds.forEach(recordId -> {
            Record record = recordRepository.findById(recordId).orElseThrow(
                    () -> new ConcurrentUpdateException(Message.CONCURRENT_UPDATE)
            );
            if (userContextId.equals(record.getUserId().toString())) {
                throw new AccessDeniedException("You are not allowed to delete this record");
            }
            recordRepository.delete(record);
        });
    }

    @Override
    public ListRecordTypeRelationsDto getListRecordTypeRelationsById(UUID sourceRecordId) {

        List<RecordTypeRelation> listRecordTypeRelations = recordTypeRelationRepository.findBySourceRecordId(sourceRecordId);
        RecordDto sourceRecordDto;

        if (listRecordTypeRelations.isEmpty()) {
            sourceRecordDto = recordMapper.recordToRecordDto(recordRepository.findById(sourceRecordId).orElse(null));
            if (sourceRecordDto == null) {
                throw new ObjectNotFoundException("Record type relations", sourceRecordId.toString());
            }
        } else
            sourceRecordDto = recordMapper.recordToRecordDto(listRecordTypeRelations.get(0).getSourceRecord());

        return ListRecordTypeRelationsDto.builder()
                .sourceRecord(sourceRecordDto)
                .relations(relationItemMapper.recordTypeRelationsToRelationItemDtos(listRecordTypeRelations))
                .build();
    }


}
