package org.salesync.record_service;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

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
