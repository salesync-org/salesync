package org.salesync.record_service.services.record;

import lombok.RequiredArgsConstructor;
import org.salesync.record_service.dtos.RecordDto;
import org.salesync.record_service.repositories.RecordRepository;
import org.salesync.record_service.utils.mappers.RecordMapper;
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
}
