package com.salesync.typeservice.controllers;

import com.salesync.typeservice.constants.Route;
import com.salesync.typeservice.dtos.*;
import com.salesync.typeservice.entities.Type;
import com.salesync.typeservice.entities.TypeProperty;
import com.salesync.typeservice.services.template.TemplateService;
import com.salesync.typeservice.services.type.TypeService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/{realm}" + Route.Template.TEMPLATE_ROUTE)
@RequiredArgsConstructor
public class TemplateController {

    private final TemplateService templateService;

    @GetMapping
    public ResponseEntity<List<TemplateDto>> getTemplates() {
        return ResponseEntity.ok(templateService.getTemplates());
    }
}
