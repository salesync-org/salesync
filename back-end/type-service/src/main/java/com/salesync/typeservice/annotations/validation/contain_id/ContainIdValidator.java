package com.salesync.typeservice.annotations.validation.contain_id;

import java.util.Collection;

import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

public class ContainIdValidator implements ConstraintValidator<ContainId, Object> {

	@Override
	public boolean isValid(Object o, ConstraintValidatorContext constraintValidatorContext) {
		if(o == null) {
			return false;
		}
		Class<?> clazz = o.getClass();

		if(o instanceof Collection<?> collection) {
			if(collection.isEmpty()) {
				return false;
			}
			for(Object item : collection) {
				if(!isValid(item, constraintValidatorContext)) {
					return false;
				}
			}
			return true;
		}

		try {
			clazz.getDeclaredField("id");
		} catch(NoSuchFieldException e) {
			e.printStackTrace();
			return false;
		}
		if(o instanceof String) {
			return !((String)o).isEmpty();
		}
		return true;

	}
}
