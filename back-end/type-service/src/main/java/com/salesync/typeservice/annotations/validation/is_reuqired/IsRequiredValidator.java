package com.salesync.typeservice.annotations.validation.is_reuqired;

import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

public class IsRequiredValidator implements ConstraintValidator<IsRequired, Object> {
    @Override
    public boolean isValid(Object o, ConstraintValidatorContext constraintValidatorContext) {
        if (o == null) {
            return false;
        }
        if (o instanceof String) {
            return !((String) o).isEmpty();
        }
        return true;
    }
}
