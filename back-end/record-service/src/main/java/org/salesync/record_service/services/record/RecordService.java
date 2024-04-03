package org.salesync.record_service.services.record;

import org.salesync.record_service.dtos.*;
import org.salesync.record_service.dtos.record_type_relation_dto.ListRecordTypeRelationsDto;
import org.salesync.record_service.dtos.record_type_relation_dto.RecordTypeRelationDto;
import org.salesync.record_service.dtos.record_type_relation_dto.RequestRecordTypeRelationDto;
import org.salesync.record_service.entities.RecordTypeRelation;

import java.util.List;
import java.util.UUID;

public interface RecordService {
    ListRecordsResponseDto getFilteredRecords(ListRecordsRequestDto requestDto);

    List<RecordDto> getAllRecords();

    ListRecordsResponseDto getAllRecordsWithCondition(ListRecordsRequestDto listRecordsRequestDto);

    RecordDto createRecordByType(RequestRecordDto requestRecordDto);

    RecordDto getRecordById(String recordId);

    RecordTypeRelationDto createRecordTypeRelation(RequestRecordTypeRelationDto requestRecordTypeRelationDto);



    ListRecordTypeRelationsDto getListRecordTypeRelationsById(UUID sourceRecordId);
}
