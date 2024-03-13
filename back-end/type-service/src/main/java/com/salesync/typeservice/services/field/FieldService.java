package com.salesync.typeservice.services.field;

import com.salesync.typeservice.dtos.FieldDto;
import com.salesync.typeservice.entities.Field;

import java.util.List;

public interface FieldService {
    List<FieldDto> getAllFields();
    FieldDto createField(FieldDto fieldDto);
}
