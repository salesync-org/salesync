package org.salesync.record_service.annotations.validation;

import jakarta.validation.Constraint;
import jakarta.validation.Payload;

import java.lang.annotation.*;

@Constraint(validatedBy = IsRequiredValidator.class)
@Target({ElementType.FIELD, ElementType.TYPE})
@Retention(RetentionPolicy.RUNTIME)
@Documented
public @interface IsRequired {
    String message() default "is required";
    Class<?>[] groups() default {};
    Class<? extends Payload>[] payload() default {};
}
