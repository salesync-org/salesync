package org.salesync.record_service.controllers;

import lombok.RequiredArgsConstructor;
import org.salesync.record_service.dtos.RecordDto;
import org.salesync.record_service.services.record.RecordService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/records")
@RequiredArgsConstructor
public class RecordController {

    private final RecordService recordService;

    @GetMapping("")
    public List<RecordDto> getRecordsByType(@RequestParam("type_id") String typeId) {
        return recordService.getRecordsByType(typeId);
    }
}
