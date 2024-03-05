package com.salesync.typeservice.controllers;


import com.salesync.typeservice.dtos.TypeDTO;
import com.salesync.typeservice.dtos.TypeRelationDTO;
import com.salesync.typeservice.dtos.TypeRelationResponseDTO;
import com.salesync.typeservice.services.type.ITypeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/type")
public class TypeController {

    private final ITypeService typeService;

    @Autowired
    public TypeController(ITypeService typeService) {
        this.typeService = typeService;
    }

    @PostMapping("/create")
    public ResponseEntity<TypeDTO> createType(@RequestBody TypeDTO typeDTO) {
        return ResponseEntity.ok(typeService.createType(typeDTO));
    }

    @GetMapping("/get-all")
    public ResponseEntity<List<TypeDTO>> getAllType() {

        return ResponseEntity.ok(typeService.getAllType());
    }

    @GetMapping("/{id}/link")
    public ResponseEntity<List<TypeRelationDTO>> getAllTypeLink(@PathVariable String id) {
        return ResponseEntity.ok(typeService.getAllTypeLinks(UUID.fromString(id)));
    }


    @PostMapping("/link")
    public ResponseEntity<TypeRelationResponseDTO> createLink(@RequestBody TypeRelationDTO typeRelationDTO) {
        return ResponseEntity.ok(typeService.createLink(typeRelationDTO));
    }

    @PutMapping("/update")
    public ResponseEntity<TypeRelationResponseDTO> updateTypeRelation(@RequestBody TypeRelationDTO typeRelationDTO) {
        return ResponseEntity.ok(typeService.updateTypeRelation(typeRelationDTO));
    }


}
