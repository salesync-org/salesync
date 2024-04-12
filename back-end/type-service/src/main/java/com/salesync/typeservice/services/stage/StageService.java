package com.salesync.typeservice.services.stage;

import com.salesync.typeservice.dtos.StageDto;
import com.salesync.typeservice.entities.Stage;
import java.util.List;
import java.util.UUID;

public interface StageService {
    StageDto createStage(StageDto stageDto);

    List<Stage> getStagesByTypeId(UUID typeId);

    StageDto updateStage(StageDto stageDto);
}
