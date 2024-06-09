package org.salesync.record_service.dtos;

import jakarta.validation.Validation;
import jakarta.validation.ValidationException;
import jakarta.validation.Validator;
import jakarta.validation.ValidatorFactory;
import org.junit.After;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;

public class ListRecordRequestDtoValidationTest {
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
	public void testValidation() {
		// given
		ListRecordsRequestDto listRecordsRequestDto = ListRecordsRequestDto.builder()
				.searchTerm("searchTerm")
				.typeId(null)
				.propertyName("propertyName")
				.isAsc(true)
				.pageSize(5)
				.currentPage(1)
				.build();
		// when // then
		Assert.assertThrows(ValidationException.class,
				() -> validator.validate(listRecordsRequestDto, ListRecordsRequestDto.class));
	}

}
