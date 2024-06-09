package org.salesync.record_service.dtos;

import java.util.UUID;

import jakarta.validation.Validation;
import jakarta.validation.ValidationException;
import jakarta.validation.Validator;
import jakarta.validation.ValidatorFactory;
import org.junit.After;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;

public class RecordDtoValidationTest {
	private Validator validator;
	private ValidatorFactory factory;

	@Before
	public void setUp() {
		factory = Validation.buildDefaultValidatorFactory();
		validator = factory.getValidator();
	}

	@After
	public void tearDown() {
		factory.close();
	}

	@Test
	public void testRequiredName() {
		// given
		RecordDto recordDto = RecordDto.builder()
				.type(TypeDto.builder().id(UUID.randomUUID()).build())
				.build();

		// when // then
		Assert.assertThrows(ValidationException.class,
				() -> validator.validate(recordDto, RecordDto.class));
	}

	@Test
	public void testRequiredType() {
		// given
		RecordDto recordDto = RecordDto.builder()
				.name("Record")
				.build();

		// when // then
		Assert.assertThrows(ValidationException.class,
				() -> validator.validate(recordDto, RecordDto.class));
	}

	@Test
	public void testContainId() {
		// given
		RecordDto recordDto = RecordDto.builder()
				.name("Record")
				.type(TypeDto.builder().build())
				.build();
		// when // then
		Assert.assertThrows(ValidationException.class,
				() -> validator.validate(recordDto, RecordDto.class));
	}
}
