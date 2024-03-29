package com.salesync.typeservice.annotations.validation.contain_id;

import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;
import jakarta.validation.ValidationException;
import lombok.SneakyThrows;
import org.springframework.web.bind.MethodArgumentNotValidException;

import java.lang.reflect.Field;
import java.util.Optional;
import java.util.UUID;

public class ContainIdValidator implements ConstraintValidator<ContainId, Object> {

    @Override
    public boolean isValid(Object o, ConstraintValidatorContext constraintValidatorContext) {
        if (o == null) {
            return false;
        }
        Class<?> clazz = o.getClass();
        Field field = null;
        try {
            field = clazz.getField("id");
            field.setAccessible(true);
            Object fieldValue = field.get(o);
        } catch (NoSuchFieldException | IllegalAccessException e) {
            return false;
        }
        if (o instanceof String) {
            return !((String) o).isEmpty();
        }
        return true;

    }
}
