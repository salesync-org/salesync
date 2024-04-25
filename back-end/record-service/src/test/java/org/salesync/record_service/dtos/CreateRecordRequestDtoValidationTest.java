package org.salesync.record_service.dtos;

import jakarta.validation.Validation;
import jakarta.validation.ValidationException;
import jakarta.validation.Validator;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;

import java.util.Collections;
import java.util.UUID;

public class CreateRecordRequestDtoValidationTest {

    private Validator validator;

    @Before
    public void setUp() {
        validator = Validation.buildDefaultValidatorFactory().getValidator();
    }

    private CreateRecordRequestDto getCreateRecordRequestDto(String name) {
        return CreateRecordRequestDto.builder().recordName(name).stageId(null).properties(null).build();
    }

    private RecordTypePropertyDto getRecordTypePropertyDto(UUID id, String itemValue) {
        return RecordTypePropertyDto.builder().id(id).itemValue(itemValue).build();
    }

    @Test
    public void testRecordNameIsNull() {
        CreateRecordRequestDto createRecordRequestDto = getCreateRecordRequestDto(null);
        Assert.assertThrows(ValidationException.class, () -> validator.validate(createRecordRequestDto, CreateRecordRequestDto.class));
    }

    @Test
    public void testRecordNameIsEmpty() {
        CreateRecordRequestDto createRecordRequestDto = getCreateRecordRequestDto("");
        Assert.assertThrows(ValidationException.class, () -> validator.validate(createRecordRequestDto, CreateRecordRequestDto.class));
    }

    @Test
    public void testPropertyNotContainId() {
        CreateRecordRequestDto createRecordRequestDto = getCreateRecordRequestDto("recordName");
        RecordTypePropertyDto recordTypePropertyDto = getRecordTypePropertyDto(null, "itemValue");
        createRecordRequestDto.setProperties(Collections.singletonList(recordTypePropertyDto));
        Assert.assertThrows(ValidationException.class, () -> validator.validate(createRecordRequestDto, CreateRecordRequestDto.class));
    }

}
