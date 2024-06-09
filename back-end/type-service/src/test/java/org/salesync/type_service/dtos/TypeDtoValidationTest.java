package org.salesync.type_service.dtos;

import com.salesync.typeservice.dtos.TemplateDto;
import com.salesync.typeservice.dtos.TypeDTO;
import jakarta.validation.Validation;
import jakarta.validation.ValidationException;
import jakarta.validation.Validator;
import jakarta.validation.ValidatorFactory;
import org.junit.After;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;

public class TypeDtoValidationTest {
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
		TypeDTO typeDto = TypeDTO.builder()
				.template(TemplateDto.builder().id(null).build())
				.build();

		// when // then
		Throwable e = Assert.assertThrows(ValidationException.class,
				() -> validator.validate(typeDto, TypeDTO.class));
	}

	@Test
	public void testRequiredTemplate() {
		// given
		TypeDTO typeDto = TypeDTO.builder()
				.name("Type")
				.build();

		// when // then
		Assert.assertThrows(ValidationException.class,
				() -> validator.validate(typeDto, TypeDTO.class));
	}

	@Test
	public void testContainId() {
		// given
		TypeDTO typeDto = TypeDTO.builder()
				.name("Type")
				.template(TemplateDto.builder().build())
				.build();

		// when // then
		Assert.assertThrows(ValidationException.class,
				() -> validator.validate(typeDto, TypeDTO.class));
	}
}
