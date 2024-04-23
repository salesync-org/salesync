package org.salesync.type_service.dtos;

import com.salesync.typeservice.dtos.StageUpdateSeqNumberRequestDto;
import jakarta.validation.Validation;
import jakarta.validation.ValidationException;
import jakarta.validation.Validator;
import jakarta.validation.ValidatorFactory;
import org.junit.After;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;

import java.util.UUID;

public class StageUpdateSeqRequestDtoValidationTest {
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
    public void testStageIdIsNull() {
        // given
        StageUpdateSeqNumberRequestDto stageUpdateSeqNumberRequestDto = StageUpdateSeqNumberRequestDto.builder().sequenceNumber(1).build();

        // when // then
        Assert.assertThrows(ValidationException.class, () -> validator.validate(stageUpdateSeqNumberRequestDto, StageUpdateSeqNumberRequestDto.class));
    }

    @Test
    public void testSequenceNumberIsNull() {
        // given
        StageUpdateSeqNumberRequestDto stageUpdateSeqNumberRequestDto = StageUpdateSeqNumberRequestDto.builder().stageId(UUID.randomUUID()).build();

        // when // then
        Assert.assertThrows(ValidationException.class, () -> validator.validate(stageUpdateSeqNumberRequestDto, StageUpdateSeqNumberRequestDto.class));
    }

}
