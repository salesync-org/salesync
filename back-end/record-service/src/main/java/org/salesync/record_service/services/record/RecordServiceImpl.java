package org.salesync.record_service.services.record;

import lombok.RequiredArgsConstructor;
import org.salesync.record_service.constants.Message;
import org.salesync.record_service.dtos.*;
import org.salesync.record_service.dtos.record_type_relation_dto.ListRecordTypeRelationsDto;
import org.salesync.record_service.dtos.record_type_relation_dto.RecordTypeRelationDto;
import org.salesync.record_service.dtos.record_type_relation_dto.RelationItemDto;
import org.salesync.record_service.dtos.record_type_relation_dto.RequestRecordTypeRelationDto;
import org.salesync.record_service.entities.*;
import org.salesync.record_service.entities.Record;
import org.salesync.record_service.entities.RecordStage;
import org.salesync.record_service.entities.RecordTypeProperty;
import org.salesync.record_service.entities.RecordTypeRelation;
import org.salesync.record_service.exceptions.ConcurrentUpdateException;
import org.salesync.record_service.exceptions.ObjectNotFoundException;
import org.salesync.record_service.mappers.RecordMapper;
import org.salesync.record_service.mappers.RecordTypePropertyMapper;
import org.salesync.record_service.mappers.RecordTypeRelationMapper;
import org.salesync.record_service.mappers.RelationItemMapper;
import org.salesync.record_service.repositories.*;
import org.salesync.record_service.utils.SecurityContextHelper;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.*;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Transactional(rollbackFor = Throwable.class)
public class RecordServiceImpl implements RecordService {

    private final RecordRepository recordRepository;
    private final RecordTypeRepository recordTypeRepository;
    private final RecordTypePropertyRepository recordTypePropertyRepository;
    private final RecordTypeRelationRepository recordTypeRelationRepository;
    private final RecordStageRepository recordStageRepository;
    private final RecordMapper recordMapper = RecordMapper.INSTANCE;
    private final RecordTypeRelationMapper recordTypeRelationMapper = RecordTypeRelationMapper.INSTANCE;
    private final RelationItemMapper relationItemMapper = RelationItemMapper.INSTANCE;
    private final RecordTypePropertyMapper recordTypePropertyMapper = RecordTypePropertyMapper.INSTANCE;
    private final RestTemplate restTemplate;

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
    public ListRecordTypeRelationsDto getListRecordTypeRelationsById(UUID sourceRecordId,String token,String realm) {

        List<RecordTypeRelation> listRecordTypeRelations = recordTypeRelationRepository.findBySourceRecordId(sourceRecordId);
        RecordDto sourceRecordDto;
        Record sourceRecord;

        if (listRecordTypeRelations.isEmpty()) {

            sourceRecord=recordRepository.findById(sourceRecordId).orElse(null);
            sourceRecordDto = recordMapper.recordToRecordDto(sourceRecord);
            if (sourceRecordDto == null) {
                throw new ObjectNotFoundException("Record type relations", sourceRecordId.toString());
            }
        } else {
            sourceRecordDto = recordMapper.recordToRecordDto(listRecordTypeRelations.get(0).getSourceRecord());
            sourceRecord = listRecordTypeRelations.get(0).getSourceRecord();
        }

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.set("Authorization", token);
        HttpEntity<String> entity = new HttpEntity<>(headers);

        // Make the HTTP GET request
        ResponseEntity<List<TypeDto>> response = restTemplate.exchange(
                "http://type-service/api/v1/"+realm+"/types",
                HttpMethod.GET,
                entity,
                new ParameterizedTypeReference<List<TypeDto>>() {}
        );
        List<TypeDto> allType = response.getBody();

        assert sourceRecord != null;
        assert allType != null;
        sourceRecordDto.setType(findTypeById(sourceRecord.getRecordType().getTypeId(),allType));

        return ListRecordTypeRelationsDto.builder()
                .sourceRecord(sourceRecordDto)
                .relations(
                        listRecordTypeRelations.stream().map(recordTypeRelation -> {
                            RecordDto destinationRecordDto = recordMapper.recordToRecordDto(recordTypeRelation.getDestinationRecord());
                            TypeDto typeDto = findTypeById(recordTypeRelation.getDestinationRecord().getRecordType().getTypeId(),allType);
                            RelationItemDto  item= relationItemMapper.recordTypeRelationToRelationItemDto(recordTypeRelation);
                            destinationRecordDto.setType(typeDto);
                            item.setDestinationRecord(destinationRecordDto);
                            return item;
                        }).toList()
                )
                .build();
    }

    @Override
    public RecordDto updateStage(RequestUpdateStageDto requestUpdateStageDto) {

        /* TODO: validate stageId */
        Record record = recordRepository.findById(requestUpdateStageDto.getRecordId()).orElseThrow(
                () -> new ObjectNotFoundException(
                        "Record",
                        requestUpdateStageDto.getRecordId().toString()
                )
        );
        RecordStage recordStage =record.getRecordStage();
        recordStage.setStageId(requestUpdateStageDto.getStageId());
        record.setRecordStage(recordStage);
        return recordMapper.recordToRecordDto(recordRepository.save(record));
    }

    @Override
    public RecordDto createRecordByTypeId(String typeId, String realm, String token, CreateRecordRequestDto createRecordRequestDto) {
        String userContextId = SecurityContextHelper.getContextUserId();

        Record recordEntity = new Record();
        recordEntity.setUserId(UUID.fromString(userContextId));
        recordEntity.setName(createRecordRequestDto.getRecordName());
        recordRepository.saveAndFlush(recordEntity);

        RecordType recordType = new RecordType();
        recordType.setRecord(recordEntity);
        recordType.setTypeId(UUID.fromString(typeId));
        recordEntity.setRecordType(recordType);
        recordTypeRepository.save(recordType);

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.set("Authorization", token);
        HttpEntity<String> entity = new HttpEntity<>(headers);

        // Get stage id with typeId and sequence = 1
        ResponseEntity<String> response = restTemplate.exchange(
                "http://type-service"+"/api/v1/"+realm+"/stages"+"/"+typeId+"/1",
                HttpMethod.GET,
                entity,
                new ParameterizedTypeReference<String>() {}
        );
        String stageId = response.getBody();

        if (stageId != null) {
            RecordStage recordStage = new RecordStage();
            recordStage.setRecord(recordEntity);
            recordStage.setStageId(UUID.fromString(stageId));
            recordEntity.setRecordStage(recordStage);
            recordStageRepository.save(recordStage);
        }

        recordEntity.setRecordProperties(new ArrayList<>());
        for (RecordTypePropertyDto recordTypePropertyDto : createRecordRequestDto.getProperties()) {
            RecordTypeProperty recordTypeProperty = new RecordTypeProperty();
            recordTypeProperty.setItemValue(recordTypePropertyDto.getItemValue());
            recordTypeProperty.setPropertyName(recordTypePropertyDto.getPropertyName());
            recordTypeProperty.setRecordTypePropertyLabel(recordTypePropertyDto.getPropertyLabel());
            recordTypeProperty.setRecord(recordEntity);

            recordEntity.getRecordProperties().add(recordTypeProperty);

            recordTypePropertyRepository.save(recordTypeProperty);
        }

        return recordMapper.recordToRecordDto(recordEntity);
    }

    public TypeDto findTypeById(UUID typeId,List<TypeDto> allType)
    {
        return allType.stream().filter(typeDto -> typeDto.getId().equals(typeId)).findFirst().orElse(null);
    }
}
