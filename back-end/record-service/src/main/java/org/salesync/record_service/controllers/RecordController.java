package org.salesync.record_service.controllers;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.salesync.record_service.dtos.*;
import org.salesync.record_service.constants.Route;
import org.salesync.record_service.dtos.record_type_relation_dto.ListRecordTypeRelationsDto;
import org.salesync.record_service.dtos.record_type_relation_dto.RecordTypeRelationDto;
import org.salesync.record_service.dtos.record_type_relation_dto.RequestRecordTypeRelationDto;
import org.salesync.record_service.services.record.RecordService;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/{realm}" + Route.RECORD_ROUTE)
@RequiredArgsConstructor
public class RecordController {

    private final RecordService recordService;

    @PostMapping(Route.LIST_RECORD)
    public ResponseEntity<ListRecordsResponseDto> getFilteredRecords(@Valid @RequestBody ListRecordsRequestDto listRecordsRequestDto) {
        return ResponseEntity.ok(recordService.getFilteredRecords(listRecordsRequestDto));
    }

    @GetMapping(Route.RECORD_ID)
    public RecordDto getRecordById(@PathVariable String recordId) {
        return recordService.getRecordById(recordId);
    }

    @GetMapping
    public List<RecordDto> getAllRecords() {
        return recordService.getAllRecords();
    }

    @PostMapping
    public RecordDto createRecordByType(@RequestBody RequestRecordDto requestRecordDto) {
        return recordService.createRecordByType(requestRecordDto);
    }

    @PostMapping(Route.RECORD_TYPE_RELATION)
    public RecordTypeRelationDto createRecordTypeRelation(@RequestBody RequestRecordTypeRelationDto requestRecordTypeRelationDto) {
        return recordService.createRecordTypeRelation(requestRecordTypeRelationDto);
    }

    @GetMapping(Route.LIST_RECORD_TYPE_RELATION)
    public ListRecordTypeRelationsDto getListRecordTypeRelationsById(@PathVariable String sourceRecordId, @PathVariable String realm, @RequestHeader(name = "Authorization") String authorization) {
        return recordService.getListRecordTypeRelationsById(UUID.fromString(sourceRecordId),authorization, realm);
    }

    @PutMapping(Route.PROPERTY)
    public ResponseEntity<RecordTypePropertyDto> updateRecordProperty(@RequestBody RecordTypePropertyDto recordTypePropertyDto) {
        return ResponseEntity.ok(recordService.updateRecordProperty(recordTypePropertyDto));
    }

    @DeleteMapping
    public ResponseEntity<RecordDto> deleteRecordsById(@RequestBody List<UUID> recordIds) {
        recordService.deleteRecordsById(recordIds);
        return ResponseEntity.noContent().build();
    }

    @PutMapping(Route.UPDATE_STAGE)
    public ResponseEntity<RecordDto> updateStage(@RequestBody RequestUpdateStageDto requestUpdateStageDto,
                                                 @RequestHeader(name = "Authorization") String authorization, @PathVariable String realm) {
        return ResponseEntity.ok(recordService.updateStage(requestUpdateStageDto, authorization, realm));
    }

    @PostMapping(Route.TYPE_ID + Route.CREATE)
    public ResponseEntity<RecordDto> createRecordByTypeId(@PathVariable String typeId, @RequestHeader(name = "Authorization") String authorization, @RequestBody CreateRecordRequestDto createRecordRequestDto) {
        return ResponseEntity.ok(recordService.createRecordByTypeId(typeId, authorization, createRecordRequestDto));
    }

    @PutMapping(Route.RECORD_ID + Route.UPDATE)
    public ResponseEntity<RecordDto> updateRecordByRecordId(@PathVariable String recordId, @RequestHeader(name = "Authorization") String authorization, @RequestBody RecordDto updateRecordRequestDto) {
        return ResponseEntity.ok(recordService.updateRecordByRecordId(recordId, authorization, updateRecordRequestDto));
    }
}
