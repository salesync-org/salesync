package com.salesync.typeservice.services.rabbitmq;

import com.salesync.typeservice.services.type.TypeService;
import lombok.RequiredArgsConstructor;
import com.salesync.typeservice.dtos.RabbitMQMessageDto;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
@RequiredArgsConstructor
public class RabbitMQServiceImpl implements RabbitMQService {
    private final TypeService typeService;

    @Override
    public void dispatchMessage(RabbitMQMessageDto message) {
        switch (message.getActionType()) {
            case INIT_TYPES:
                initTypes((String) message.getPayload());
                break;
        }
    }

    private void initTypes(String realmName) {
        typeService.initializeStandardTypes(realmName);
    }
}
