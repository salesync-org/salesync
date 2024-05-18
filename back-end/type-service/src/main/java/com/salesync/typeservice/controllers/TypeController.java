package com.salesync.typeservice.controllers;

import com.salesync.typeservice.constants.Route;
import com.salesync.typeservice.dtos.*;
import com.salesync.typeservice.entities.Type;
import com.salesync.typeservice.entities.TypeProperty;
import com.salesync.typeservice.services.type.TypeService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/{realm}" + Route.Type.TYPE_ROUTE)
@RequiredArgsConstructor
public class TypeController {

    private final TypeService typeService;

    @GetMapping(Route.Type.TYPE_ID)
    public ResponseEntity<TypeDTO> getType(@PathVariable UUID typeId) {
        return ResponseEntity.ok(typeService.getType(typeId));
    }

    @PostMapping
    public ResponseEntity<TypeDTO> createType(@PathVariable String realm, @Valid @RequestBody TypeDTO typeDTO) {
        return ResponseEntity.status(HttpStatus.CREATED).body(typeService.createType(realm, typeDTO));
    }

    @GetMapping
    public ResponseEntity<List<TypeDTO>> getAllType(@PathVariable String realm) {

        return ResponseEntity.ok(typeService.getAllType(realm));
    }

    @GetMapping(Route.Type.GET_RELATION)
    public ResponseEntity<List<TypeRelationDTO>> getAllRelationsByType(@PathVariable UUID typeId) {
        return ResponseEntity.ok(typeService.getAllRelationsByType(typeId));
    }

    @PostMapping(Route.Type.CREATE_RELATION)
    public ResponseEntity<TypeRelationResponseDTO> createLink(@RequestBody TypeRelationDTO typeRelationDTO) {
        return ResponseEntity.ok(typeService.makeRelation(typeRelationDTO));
    }

    @PutMapping
    public ResponseEntity<TypeRelationResponseDTO> updateTypeRelation(@RequestBody TypeRelationDTO typeRelationDTO) {
        return ResponseEntity.ok(typeService.updateLabelOfTypeRelation(typeRelationDTO));
    }

    @GetMapping(Route.Type.TYPE_DETAILS)
    public ResponseEntity<Type> getTypeDetails(@PathVariable UUID typeId) {
        return ResponseEntity.ok(typeService.getTypeDetailsById(typeId));
    }

    @PostMapping(Route.Type.CREATE_PROPERTY)
    public ResponseEntity<TypeProperty> createProperty(@RequestBody RequestCreatePropertyDto requestCreatePropertyDto) {
        return ResponseEntity.ok(typeService.createProperty(requestCreatePropertyDto));
    }

    @PutMapping(Route.Type.UPDATE_PROPERTY)
    public ResponseEntity<TypeProperty> updateProperty(@RequestBody RequestEditPropertyDto requestEditPropertyDto) {
        return ResponseEntity.ok(typeService.updateProperty(requestEditPropertyDto));
    }

    @PostMapping(Route.Type.CREATE_TYPE_RELATION)
    public ResponseEntity<RelationTypeResponseDto> createRelationType(@Valid @RequestBody RelationTypeRequestDto request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(typeService.createRelationType(request));
    }

    @DeleteMapping(Route.Type.DELETE_PROPERTY)
    public ResponseEntity<String> deleteProperty(@PathVariable UUID typePropId) {
        return ResponseEntity.ok(typeService.deleteProperty(typePropId));
    }

}
