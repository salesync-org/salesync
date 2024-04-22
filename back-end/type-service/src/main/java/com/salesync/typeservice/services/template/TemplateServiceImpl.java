package com.salesync.typeservice.services.template;

import com.salesync.typeservice.dtos.*;
import com.salesync.typeservice.entities.*;
import com.salesync.typeservice.exceptions.BadRequestException;
import com.salesync.typeservice.exceptions.ObjectNotFoundException;
import com.salesync.typeservice.mapper.RelationMapper;
import com.salesync.typeservice.mapper.TypeMapper;
import com.salesync.typeservice.mapper.TypeRelationMapper;
import com.salesync.typeservice.repositories.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Set;
import java.util.UUID;
import java.util.stream.Collectors;

@Transactional(rollbackFor = Throwable.class)
@Service
@RequiredArgsConstructor
public class TemplateServiceImpl implements TemplateService {
    private final TemplateRepository templateRepository;

    @Override
    public List<TemplateDto> getTemplates() {
        return templateRepository.findAll()
                .stream()
                .map(template -> TemplateDto.builder()
                        .id(template.getId())
                        .name(template.getName())
                        .build()
                )
                .collect(Collectors.toList());
    }
}
