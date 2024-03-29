package com.salesync.rabbitmq.configuration;
import org.springframework.amqp.core.*;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;


@Configuration
public class RabbitMQConfig {

    @Bean
    public Queue typeQueue() {
        return new Queue("type-queue", true,false,false);
    }

    @Bean
    public Queue recordQueue() {
        return new Queue("record-queue", true,false,false);
    }

    @Bean public Exchange exchange()
    {
        return new TopicExchange("topic-exchange");
    }



    // map các routing_key
    @Bean
    public Binding binding1(Queue typeQueue, Exchange exchange)
    {
        return BindingBuilder.bind(typeQueue)
                .to(exchange)
                .with("type")
                .noargs();
    }

    @Bean
    public Binding binding2(Queue recordQueue, Exchange exchange)
    {
        return BindingBuilder.bind(recordQueue)
                .to(exchange)
                .with("record")
                .noargs();
    }


}
