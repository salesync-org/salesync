package com.salesync.typeservice.controllers;

import com.salesync.typeservice.constants.Route;
import com.salesync.typeservice.dtos.FieldDto;
import com.salesync.typeservice.services.field.FieldService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/{realm}" + Route.Field.FIELD_ROUTE)
@RequiredArgsConstructor
public class FieldController {

    private final FieldService fieldService;

    @GetMapping
    public ResponseEntity<List<FieldDto>> getAllFields() {
        return ResponseEntity.ok(
                fieldService.getAllFields()
        );
    }

    @PostMapping
    public ResponseEntity<FieldDto> createField(@Valid @RequestBody FieldDto fieldDto) {
        return ResponseEntity.status(HttpStatus.CREATED).body(
                fieldService.createField(fieldDto)
        );
    }

}
