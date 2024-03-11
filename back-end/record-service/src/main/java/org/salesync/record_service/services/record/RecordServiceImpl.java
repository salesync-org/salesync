package org.salesync.record_service.services.record;

import lombok.RequiredArgsConstructor;
import org.salesync.record_service.dtos.RecordDto;
import org.salesync.record_service.dtos.RequestRecordDto;
import org.salesync.record_service.entities.Record;
import org.salesync.record_service.mappers.RecordMapper;
import org.salesync.record_service.repositories.RecordRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class RecordServiceImpl implements RecordService {

    private final RecordRepository recordRepository;
    private final RecordMapper recordMapper = RecordMapper.INSTANCE;

    @Override
    public List<RecordDto> getRecordsByType(String typeId) {
        return recordRepository.findByTypeId(UUID.fromString(typeId))
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
    public RecordDto createRecordByType(RequestRecordDto requestRecordDto) {
        Record recordEntity = new Record();
        recordEntity.setTypeId(UUID.fromString(requestRecordDto.getTypeId()));
        recordEntity.setUserId(UUID.fromString(requestRecordDto.getUserId()));
        recordEntity.setCurrentStageId(UUID.fromString(requestRecordDto.getCurrentStageId()));

        return recordMapper.recordToRecordDto(recordRepository.save(recordEntity));
    }
}
