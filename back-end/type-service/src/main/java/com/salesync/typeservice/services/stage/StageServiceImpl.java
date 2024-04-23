package com.salesync.typeservice.services.stage;

import com.salesync.typeservice.components.RabbitMQProducer;
import com.salesync.typeservice.dtos.RabbitMQMessageDto;
import com.salesync.typeservice.dtos.StageDto;
import com.salesync.typeservice.dtos.StageUpdateSeqNumberRequestDto;
import com.salesync.typeservice.entities.Stage;
import com.salesync.typeservice.entities.Type;
import com.salesync.typeservice.enums.ActionType;
import com.salesync.typeservice.enums.TemplateEnum;
import com.salesync.typeservice.exceptions.ObjectNotFoundException;
import com.salesync.typeservice.exceptions.TypeServiceException;
import com.salesync.typeservice.mapper.StageMapper;
import com.salesync.typeservice.repositories.StageRepository;
import com.salesync.typeservice.repositories.TypeRepository;
import lombok.Builder;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Transactional(rollbackFor = Throwable.class)
@Builder
public class StageServiceImpl implements StageService {
    private final StageRepository stageRepository;
    private final TypeRepository typeRepository;
    private final StageMapper stageMapper = StageMapper.INSTANCE;
    private final RabbitMQProducer rabbitMQProducer;

    @Override
    public StageDto createStage(StageDto stageDto) {
        Type type = typeRepository.findById(stageDto.getType().getId()).orElseThrow(
                () -> new ObjectNotFoundException(
                        Type.class.getSimpleName(), stageDto.getType().getId().toString()
                )
        );
        if (TemplateEnum.StageObject.equals(type.getTemplate().getName())) {
            Stage stage = stageMapper.dtoToEntity(stageDto);
            stage.setType(type);
            Integer seq = stageRepository.findTopByTypeIdOrderBySequenceNumberDesc(type.getId()).map(Stage::getSequenceNumber).orElse(0);
            stage.setSequenceNumber(seq + 1);
            return stageMapper.entityToDto(stageRepository.save(stage));
        }
        throw new TypeServiceException("Type is not a stage object");
    }

    @Override
    public List<StageDto> getStagesByTypeId(UUID typeId) {
        List<Stage> stageList = stageRepository.findAllByTypeIdOrderBySequenceNumberAsc(typeId);
        return stageList.stream().map(stageMapper::entityToDto).toList();
    }

    @Override
    public StageDto updateStage(StageDto stageDto) {
        Type type = typeRepository.findById(stageDto.getType().getId()).orElseThrow(
                () -> new ObjectNotFoundException(
                        Type.class.getSimpleName(), stageDto.getType().getId().toString()
                )
        );
        if (!TemplateEnum.StageObject.equals(type.getTemplate().getName())) {
            throw new TypeServiceException("Type is not a stage object");
        }
        Stage sourceStage = stageRepository.findById(stageDto.getId()).orElseThrow(
                () -> new ObjectNotFoundException(
                        Stage.class.getSimpleName(), stageDto.getId().toString()
                )
        );
        sourceStage.setName(stageDto.getName() == null ? sourceStage.getName() : stageDto.getName());
        Integer seq = stageRepository.findTopByTypeIdOrderBySequenceNumberDesc(type.getId()).map(Stage::getSequenceNumber).orElse(0);
        if (stageDto.getSequenceNumber() != null && !sourceStage.getSequenceNumber().equals(stageDto.getSequenceNumber())
        ) {
            if (seq < stageDto.getSequenceNumber()) {
                throw new TypeServiceException("Sequence number is greater than the last sequence number");
            }
            Stage targetStage = stageRepository.findByTypeIdAndSequenceNumber(type.getId(), stageDto.getSequenceNumber()).orElseThrow(
                    () -> new ObjectNotFoundException(
                            Stage.class.getSimpleName(), stageDto.getSequenceNumber().toString()
                    )
            );
            targetStage.setSequenceNumber(sourceStage.getSequenceNumber());
            stageRepository.save(targetStage);
            sourceStage.setSequenceNumber(stageDto.getSequenceNumber());
        }
        return stageMapper.entityToDto(stageRepository.save(sourceStage));
    }

    @Override
    public void deleteStage(UUID stageId) {
        Stage stage = stageRepository.findById(stageId).orElseThrow(
                () -> new ObjectNotFoundException(
                        Stage.class.getSimpleName(), stageId.toString()
                )
        );
        List<Stage> stageList = stageRepository.findAllByTypeIdOrderBySequenceNumberAsc(stage.getType().getId());
        if (Objects.equals(stageList.get(0).getId(), stageId)) {
            throw new TypeServiceException("Cannot delete the last stage");
        }

        if (Objects.equals(stageList.get(stageList.size() - 1).getId(), stageId)) {
            throw new TypeServiceException("Cannot delete the last stage");
        }
        rabbitMQProducer.sendMessage("type", RabbitMQMessageDto.builder().actionType(ActionType.DELETE_STAGE).payload(stageId).build());
        stageRepository.delete(stage);
    }

    @Override
    public List<StageDto> updateSequenceNumber(UUID typeId, List<StageUpdateSeqNumberRequestDto> stageDtos) {
        List<StageDto> result = new ArrayList<>();
        stageDtos.forEach(stageDto -> {
            Stage stage = stageRepository.findById(stageDto.getStageId()).orElseThrow(
                    () -> new ObjectNotFoundException(
                            Stage.class.getSimpleName(), stageDto.getStageId().toString()
                    )
            );
            if (!stage.getType().getId().equals(typeId)) {
                throw new TypeServiceException("Stage does not belong to the type");
            }
            stage.setSequenceNumber(stageDto.getSequenceNumber());
            result.add(stageMapper.entityToDto(stageRepository.save(stage)));
        });
        return result;
    }
}
