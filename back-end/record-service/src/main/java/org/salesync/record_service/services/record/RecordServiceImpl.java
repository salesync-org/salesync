package org.salesync.record_service.services.record;

import lombok.RequiredArgsConstructor;
import org.salesync.record_service.dtos.*;
import org.salesync.record_service.entities.Record;
import org.salesync.record_service.entities.RecordType;
import org.salesync.record_service.mappers.RecordMapper;
import org.salesync.record_service.repositories.RecordRepository;
import org.salesync.record_service.repositories.RecordTypeRepository;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class RecordServiceImpl implements RecordService {

    private final RecordRepository recordRepository;
    private final RecordTypeRepository recordTypeRepository;
    private final RestTemplate restTemplate;
    private final RecordMapper recordMapper = RecordMapper.INSTANCE;

    @Override
    public List<RecordDto> getRecordsByType(UUID typeId) {
        List<Record> record = recordTypeRepository.findByTypeId(typeId).stream()
                .map(RecordType::getRecord)
                .toList();
        Map typeData = restTemplate.getForObject("http://type-service/api/v1/types/{typeId}", Map.class, typeId);
        return record
                .stream()
                .map(recordMapper::recordToRecordDto)
                .toList();
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
}
