package com.salesync.typeservice.services.template;

import com.salesync.typeservice.dtos.*;
import com.salesync.typeservice.entities.Type;
import com.salesync.typeservice.entities.TypeProperty;

import java.util.List;
import java.util.UUID;

public interface TemplateService {
    List<TemplateDto> getTemplates();
}
