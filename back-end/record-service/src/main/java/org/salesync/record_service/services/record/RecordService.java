package org.salesync.record_service.services.record;

import org.salesync.record_service.dtos.RecordDto;

import java.util.List;

public interface RecordService {
    List<RecordDto> getRecordsByType(String typeId);
}
