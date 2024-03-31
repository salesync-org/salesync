package org.salesync.record_service.controllers;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.salesync.record_service.dtos.ListRecordsRequestDto;
import org.salesync.record_service.dtos.ListRecordsResponseDto;
import org.salesync.record_service.dtos.RecordDto;
import org.salesync.record_service.constants.Route;
import org.salesync.record_service.dtos.RequestRecordDto;
import org.salesync.record_service.services.record.RecordService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(Route.RECORD_ROUTE)
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
}
