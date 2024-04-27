package com.salesync.typeservice.annotations.validation.contain_id;

import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;
import java.lang.reflect.Field;
import java.util.Collection;

public class ContainIdValidator implements ConstraintValidator<ContainId, Object> {

    @Override
    public boolean isValid(Object o, ConstraintValidatorContext constraintValidatorContext) {
        if (o == null) {
            return false;
        }
        Class<?> clazz = o.getClass();

        if (o instanceof Collection<?>) {
            Collection<?> collection = (Collection<?>) o;
            if (collection.isEmpty()) {
                return false;
            }
            for (Object item : collection) {
                if (!isValid(item, constraintValidatorContext)) {
                    return false;
                }
            }
            return true;
        }

        Field field = null;
        try {
            field = clazz.getDeclaredField("id");
            field.setAccessible(true);
            Object fieldValue = field.get(o);
        } catch (NoSuchFieldException | IllegalAccessException e) {
            e.printStackTrace();
            return false;
        }
        if (o instanceof String) {
            return !((String) o).isEmpty();
        }
        return true;

    }
}
