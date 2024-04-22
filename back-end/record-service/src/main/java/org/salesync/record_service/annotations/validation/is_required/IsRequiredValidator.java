package org.salesync.record_service.annotations.validation.is_required;

import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;
import org.salesync.record_service.annotations.validation.is_required.IsRequired;

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
