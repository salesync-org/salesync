package org.salesync.record_service.services.record;

import jakarta.validation.Valid;
import org.salesync.record_service.dtos.*;
import org.salesync.record_service.dtos.record_type_relation_dto.ListRecordTypeRelationsDto;
import org.salesync.record_service.dtos.record_type_relation_dto.RecordTypeRelationDto;
import org.salesync.record_service.dtos.record_type_relation_dto.RequestRecordTypeRelationDto;

import java.util.List;
import java.util.UUID;

public interface RecordService {
    ListRecordsResponseDto getFilteredRecords(@Valid ListRecordsRequestDto requestDto, String companyName);

    List<RecordDto> getAllRecords(String companyName);

    ListRecordsResponseDto getAllRecordsWithCondition(ListRecordsRequestDto listRecordsRequestDto);

    RecordDto createRecordByType(String realm, RequestRecordDto requestRecordDto);

    RecordDto getRecordById(String recordId);

    RecordTypeRelationDto createRecordTypeRelation(RequestRecordTypeRelationDto requestRecordTypeRelationDto);

    RecordTypePropertyDto updateRecordProperty(RecordTypePropertyDto recordTypePropertyDto);

    void deleteRecordsById(List<UUID> recordIds);

    ListRecordTypeRelationsDto getListRecordTypeRelationsById(UUID sourceRecordId, String token, String realm);

    RecordDto updateStage(RequestUpdateStageDto requestUpdateStageDto, String token, String realm);

    RecordDto createRecordByTypeId(String companyName, String typeId, String token, CreateRecordRequestDto createRecordRequestDto);

    RecordDto updateRecordByRecordId(String recordId, String token, RecordDto updateRecordRequestDto);
}
