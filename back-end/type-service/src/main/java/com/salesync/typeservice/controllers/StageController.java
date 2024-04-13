package com.salesync.typeservice.controllers;

import com.salesync.typeservice.constants.Route;
import com.salesync.typeservice.dtos.StageDto;
import com.salesync.typeservice.entities.Stage;
import com.salesync.typeservice.services.stage.StageService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/{realm}" + Route.Stage.STAGE_ROUTE)
@RequiredArgsConstructor
public class StageController {

    private final StageService stageService;

    @PostMapping
    public ResponseEntity createStage(@Valid @RequestBody StageDto stageDto) {
        return ResponseEntity.status(HttpStatus.CREATED).body(stageService.createStage(stageDto));
    }

    @GetMapping(Route.Stage.GET_STAGES_BY_TYPE_ID)
    public ResponseEntity<List<StageDto>> getStagesByTypeId(@PathVariable UUID typeId) {
        return ResponseEntity.ok(stageService.getStagesByTypeId(typeId));
    }

    @PutMapping
    public ResponseEntity updateStage(@Valid @RequestBody StageDto stageDto) {
        return ResponseEntity.ok(stageService.updateStage(stageDto));
    }

    @GetMapping(Route.Stage.GET_STAGE_ID_BY_TYPE_ID_AND_SEQUENCE_NUMBER)
    public ResponseEntity getStageIdByTypeIdAndSequenceNumber(@PathVariable String typeId, @PathVariable String stageName) {
        return ResponseEntity.ok(stageService.getStageIdByTypeIdAndSequenceNumber(typeId, stageName));
    }
}
