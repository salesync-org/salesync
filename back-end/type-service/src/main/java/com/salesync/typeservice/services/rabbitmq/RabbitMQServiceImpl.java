package com.salesync.typeservice.services.rabbitmq;

import com.salesync.typeservice.services.type.TypeService;
import lombok.RequiredArgsConstructor;
import com.salesync.typeservice.dtos.RabbitMQMessageDto;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class RabbitMQServiceImpl implements RabbitMQService {
    private final TypeService typeService;

    @Override
    public void dispatchMessage(RabbitMQMessageDto message) {
        System.out.println("Received message action: " + message.getActionType().toString());
        switch (message.getActionType()) {
            case INIT_TYPES -> initTypes((String) message.getPayload());
        }
    }

    private void initTypes(String realmName) {
        System.out.println("Initialize company successfully with name: " + realmName);
        typeService.initializeStandardTypes(realmName);
    }
}
