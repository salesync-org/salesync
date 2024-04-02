package com.salesync.rabbitmq;

import com.salesync.rabbitmq.component.RabbitMQProducer;
import com.salesync.rabbitmq.dto.MessageDTO;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Component;


@SpringBootApplication
public class RabbitmqApplication {

	public static void main(String[] args) {
		SpringApplication.run(RabbitmqApplication.class, args);
	}


	@Bean
	public CommandLineRunner commandLineRunner(RabbitMQProducer rabbitMQProducer) {
		return args -> {
			rabbitMQProducer.sendMessage("record","thang");

			};
	};
}
