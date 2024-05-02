package org.salesync.authentication.configurations;

import org.springframework.amqp.core.*;
import org.springframework.amqp.rabbit.connection.ConnectionFactory;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.amqp.support.converter.Jackson2JsonMessageConverter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class MessageQueueConfig {

    @Bean
    public Queue authQueue() {
        return new Queue("auth-queue", true, false, false);
    }

    @Bean
    public Exchange exchange() {
        return new TopicExchange("topic-exchange");
    }

    @Bean
    public Binding binding(Queue queue, Exchange exchange) {
        return BindingBuilder.bind(queue).to(exchange).with("auth-queue").noargs();
    }

    @Bean
    public RabbitTemplate rabbitTemplate(final ConnectionFactory connectionFactory) {
        final var rabbitTemplate = new RabbitTemplate(connectionFactory);
        rabbitTemplate.setMessageConverter(producerJackson2MessageConverter());
        return rabbitTemplate;
    }

    @Bean
    public Jackson2JsonMessageConverter producerJackson2MessageConverter() {
        return new Jackson2JsonMessageConverter();
    }
}