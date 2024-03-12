package com.salesync.typeservice.controllers;


import com.salesync.typeservice.constants.Route;
import com.salesync.typeservice.dtos.TypeDTO;
import com.salesync.typeservice.dtos.TypeRelationDTO;
import com.salesync.typeservice.dtos.TypeRelationResponseDTO;
import com.salesync.typeservice.services.type.TypeService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping(Route.Type.TYPE_ROUTE)
public class TypeController {

    private final TypeService typeService;

    @Autowired
    public TypeController(TypeService typeService) {
        this.typeService = typeService;
    }

    @GetMapping(Route.Type.TYPE_ID)
    public ResponseEntity<TypeDTO> getType(@PathVariable String typeId) {
        return ResponseEntity.ok(typeService.getType(typeId));
    }

    @PostMapping
    public ResponseEntity<TypeDTO> createType(@Valid @RequestBody TypeDTO typeDTO) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(typeService.createType(typeDTO));
    }

    @GetMapping
    public ResponseEntity<List<TypeDTO>> getAllType() {

        return ResponseEntity.ok(typeService.getAllType());
    }

    @GetMapping(Route.Type.GET_RELATION)
    public ResponseEntity<List<TypeRelationDTO>> getAllTypeLink(@PathVariable String typeId) {
        return ResponseEntity.ok(typeService.getAllTypeLinks(typeId));
    }

    @PostMapping(Route.Type.CREATE_RELATION)
    public ResponseEntity<TypeRelationResponseDTO> createLink(@RequestBody TypeRelationDTO typeRelationDTO) {
        return ResponseEntity.ok(typeService.createLink(typeRelationDTO));
    }

    @PutMapping
    public ResponseEntity<TypeRelationResponseDTO> updateTypeRelation(@RequestBody TypeRelationDTO typeRelationDTO) {
        return ResponseEntity.ok(typeService.updateTypeRelation(typeRelationDTO));
    }


}
