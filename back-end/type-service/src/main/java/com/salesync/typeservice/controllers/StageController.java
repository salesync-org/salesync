package com.salesync.typeservice.controllers;

import com.salesync.typeservice.constants.Route;
import com.salesync.typeservice.dtos.StageDto;
import com.salesync.typeservice.services.stage.StageService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/{realm}" + Route.Stage.STAGE_ROUTE)
@RequiredArgsConstructor
public class StageController {

    private final StageService stageService;

    @PostMapping
    public ResponseEntity createStage(@Valid @RequestBody StageDto stageDto) {
        return ResponseEntity.status(HttpStatus.CREATED).body(stageService.createStage(stageDto));
    }

    @PutMapping
    public ResponseEntity updateStage(@Valid @RequestBody StageDto stageDto) {
        return ResponseEntity.ok(stageService.updateStage(stageDto));
    }
}
