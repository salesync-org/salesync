package org.salesync.record_service.controllers;
import lombok.RequiredArgsConstructor;
import org.salesync.record_service.dtos.PropertyDTO;
import org.salesync.record_service.services.input_service.IPropertyService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

//import java.util.ArrayList;
//import java.util.List;
//import java.util.Map;

@RestController
@RequestMapping("/properties")
@RequiredArgsConstructor
public class PropertyController {

    private final IPropertyService propertyService;

    @GetMapping("/{typeId}")
    public ResponseEntity<List> loadAllInputTypes(@PathVariable String typeId) {
        return ResponseEntity.ok(
                propertyService.loadAllInputTypes(UUID.fromString(typeId))
        );
    }

    @GetMapping("/create")
    public ResponseEntity<PropertyDTO> createProperty(@RequestBody PropertyDTO propertyDTO) {
        return ResponseEntity.ok(
                propertyService.createProperty(propertyDTO)
        );
    }
}