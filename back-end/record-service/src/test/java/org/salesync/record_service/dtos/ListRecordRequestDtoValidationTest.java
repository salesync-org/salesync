package org.salesync.record_service.dtos;

import jakarta.validation.Validation;
import jakarta.validation.ValidationException;
import jakarta.validation.Validator;
import org.junit.After;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;

public class ListRecordRequestDtoValidationTest {
    private Validator validator;

    @Before
    public void setUp() {
        validator = Validation.buildDefaultValidatorFactory().getValidator();
    }

    @After
    public void tearDown() {
        validator = null;
    }

    @Test
    public void testValidation() {
        ListRecordsRequestDto listRecordsRequestDto = ListRecordsRequestDto.builder().searchTerm("searchTerm").typeId(null).propertyName("propertyName").isAsc(true).pageSize(5).currentPage(1).build();
        Assert.assertThrows(ValidationException.class, () -> validator.validate(listRecordsRequestDto, ListRecordsRequestDto.class));
    }

}
