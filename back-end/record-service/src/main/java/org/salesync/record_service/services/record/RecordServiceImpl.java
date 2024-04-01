package org.salesync.record_service.services.record;

import lombok.RequiredArgsConstructor;
import org.salesync.record_service.dtos.*;
import org.salesync.record_service.entities.Record;
import org.salesync.record_service.entities.RecordTypeRelation;
import org.salesync.record_service.exceptions.ObjectNotFoundException;
import org.salesync.record_service.mappers.RecordMapper;
import org.salesync.record_service.repositories.RecordRepository;
import org.salesync.record_service.repositories.RecordTypeRepository;
import org.salesync.record_service.repositories.RecordTypeRelationRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class RecordServiceImpl implements RecordService {

    private final RecordRepository recordRepository;
    private final RecordTypeRepository recordTypeRepository;
    private final RestTemplate restTemplate;
    private final RecordTypeRelationRepository recordTypeRelationRepository;
    private final RecordMapper recordMapper = RecordMapper.INSTANCE;


    @Override
    public ListRecordsResponseDto getFilteredRecords(ListRecordsRequestDto requestDto) {
        Pageable pageRequest = PageRequest.of(requestDto.getCurrentPage() - 1, requestDto.getPageSize());
        Page<Record> page = recordRepository
                .getFilteredRecord(requestDto.getTypePropertyId(),
                        requestDto.getTypeId(),
                        requestDto.getSearchTerm(),
                        requestDto.getIsAsc(),
                        pageRequest
                );
//        Map typeData = restTemplate.getForObject("http://type-service/api/v1/types/{typeId}", Map.class, typeId);
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
    public RecordDto createRecordTypeRelation(RequestRecordTypeRelationDto requestRecordTypeRelationDto) {
        System.out.println(requestRecordTypeRelationDto);

        UUID sourceRecordId= requestRecordTypeRelationDto.getSourceRecordId();
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

        recordTypeRelationRepository.save(recordTypeRelation);
        return null;
    }
}
