package org.salesync.authentication.configurations;


import org.salesync.authentication.components.MessageQueueProducer;
import org.springframework.amqp.core.Exchange;
import org.springframework.amqp.core.Queue;
import org.springframework.amqp.core.TopicExchange;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class MessageQueueConfig {

    @Bean
    public Queue typeQueue() {
        return new Queue("type-queue", true, false, false);
    }

    @Bean
    public Exchange exchange() {
        return new TopicExchange("topic-exchange");
    }
}