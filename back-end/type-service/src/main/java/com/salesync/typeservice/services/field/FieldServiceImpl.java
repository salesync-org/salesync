package com.salesync.typeservice.services.field;

import com.salesync.typeservice.dtos.FieldDto;
import com.salesync.typeservice.entities.Field;
import com.salesync.typeservice.mapper.FieldMapper;
import com.salesync.typeservice.repositories.FieldRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@RequiredArgsConstructor
@Service
public class FieldServiceImpl implements FieldService {

    private final FieldRepository fieldRepository;
    private final FieldMapper fieldMapper = FieldMapper.INSTANCE;

    @Override
    public List<FieldDto> getAllFields() {
        return fieldRepository.findAll().stream().map(fieldMapper::fieldToFieldDto).toList();
    }

    @Override
    public FieldDto createField(FieldDto fieldDto) {
        Field savedField = fieldRepository.save(
                fieldMapper.fieldDtoToField(fieldDto)
        );
        return fieldMapper.fieldToFieldDto(savedField);
    }
}
