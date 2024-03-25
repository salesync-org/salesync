package org.salesync.record_service.repositories.record;

import org.salesync.record_service.dtos.ListRecordsRequestDto;
import org.salesync.record_service.dtos.ListRecordsResponseDto;

public interface RecordCustomRepository {

    ListRecordsResponseDto getListRecord(ListRecordsRequestDto listRecordsRequestDto);
}
