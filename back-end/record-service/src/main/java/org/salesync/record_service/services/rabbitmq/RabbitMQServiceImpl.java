package org.salesync.record_service.services.rabbitmq;

import lombok.RequiredArgsConstructor;
import org.salesync.record_service.dtos.RabbitMQMessageDto;
import org.salesync.record_service.repositories.RecordRepository;
import org.salesync.record_service.repositories.RecordStageRepository;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
@RequiredArgsConstructor
public class RabbitMQServiceImpl implements RabbitMQService {
    private final RecordRepository recordRepository;
    private final RecordStageRepository recordStageRepository;
    @Override
    public void dispatchMessage(RabbitMQMessageDto message) {
        switch (message.getActionType()) {
            case DELETE_STAGE:
                deleteStage(UUID.fromString((String) message.getPayload()));
                break;
        }
    }

    private void deleteStage(UUID stageId) {
        recordStageRepository.deleteByStageId(stageId);
    }
}
