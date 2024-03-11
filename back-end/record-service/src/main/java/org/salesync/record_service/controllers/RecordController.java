package org.salesync.record_service.controllers;

import lombok.RequiredArgsConstructor;
import org.salesync.record_service.dtos.RecordDto;
import org.salesync.record_service.dtos.RequestRecordDto;
import org.salesync.record_service.services.record.RecordService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/records")
@RequiredArgsConstructor
public class RecordController {

    private final RecordService recordService;

    @GetMapping
    public List<RecordDto> getRecordsByType(@RequestParam("type_id") String typeId) {
        return recordService.getRecordsByType(typeId);
    }

    @GetMapping("/all")
    public List<RecordDto> getAllRecords() {
        return recordService.getAllRecords();
    }

    @PostMapping("/create")
    public RecordDto createRecordByType(@RequestBody RequestRecordDto requestRecordDto) {
        return recordService.createRecordByType(requestRecordDto);
    }
}
