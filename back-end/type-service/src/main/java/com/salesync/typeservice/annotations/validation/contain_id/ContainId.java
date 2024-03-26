package com.salesync.typeservice.annotations.validation.contain_id;

import com.salesync.typeservice.annotations.validation.is_reuqired.IsRequiredValidator;
import jakarta.validation.Constraint;
import jakarta.validation.Payload;

import java.lang.annotation.*;

@Constraint(validatedBy = ContainIdValidator.class)
@Target({ElementType.FIELD})
@Retention(RetentionPolicy.RUNTIME)
@Documented
public @interface ContainId {
    String message() default "must contain id field";
    Class<?>[] groups() default {};
    Class<? extends Payload>[] payload() default {};
}
