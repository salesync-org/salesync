package org.salesync.record_service;

import org.salesync.record_service.dtos.ListRecordsRequestDto;
import org.salesync.record_service.repositories.record.RecordRepository;
import org.springframework.boot.ApplicationRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.core.env.Environment;

import java.util.UUID;

@SpringBootApplication
public class RecordServiceApplication {

	public static void main(String[] args) {
		SpringApplication.run(RecordServiceApplication.class, args);
	}

//	@Bean
//	ApplicationRunner applicationRunner(Environment environment, RecordRepository recordRepository) {
//		return args -> {
//			recordRepository.getListRecord(ListRecordsRequestDto.builder()
//							.typeId(UUID.fromString("f4828793-28c2-465b-b783-0c697e41dafb"))
//					.build());
//			System.out.println("message from application.yml " + environment.getProperty("message-from-application-properties"));
//		};
//	}
}
