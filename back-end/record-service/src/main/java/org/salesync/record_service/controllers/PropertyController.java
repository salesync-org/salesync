package org.salesync.record_service.controllers;
import lombok.RequiredArgsConstructor;
import org.salesync.record_service.dtos.PropertyDTO;
import org.salesync.record_service.services.input_service.IPropertyService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

//import java.util.ArrayList;
//import java.util.List;
//import java.util.Map;

@RestController
@RequestMapping("/properties")
@RequiredArgsConstructor
public class PropertyController {

    private final IPropertyService propertyService;

    @GetMapping("/all")
    public ResponseEntity<List> loadAllInputTypes() {
        return ResponseEntity.ok(
                propertyService.loadAllInputTypes()
        );
    }

    @GetMapping("/create")
    public ResponseEntity<PropertyDTO> createProperty(@RequestBody PropertyDTO propertyDTO) {
        return ResponseEntity.ok(
                propertyService.createProperty(propertyDTO)
        );
    }
}