package org.salesync.record_service.services.record;

import org.salesync.record_service.dtos.ListRecordsRequestDto;
import org.salesync.record_service.dtos.ListRecordsResponseDto;
import org.salesync.record_service.dtos.RecordDto;
import org.salesync.record_service.dtos.RequestRecordDto;

import java.util.List;

public interface RecordService {
    ListRecordsResponseDto getFilteredRecords(ListRecordsRequestDto requestDto);

    List<RecordDto> getAllRecords();

    ListRecordsResponseDto getAllRecordsWithCondition(ListRecordsRequestDto listRecordsRequestDto);

    RecordDto createRecordByType(RequestRecordDto requestRecordDto);

    RecordDto getRecordById(String recordId);
}
