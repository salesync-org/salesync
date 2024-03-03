package org.salesync.record_service.controllers;
import lombok.RequiredArgsConstructor;
import org.salesync.record_service.services.input_service.IPropertyService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

//import java.util.ArrayList;
//import java.util.List;
//import java.util.Map;

@RestController
@RequestMapping("/input-types")
@RequiredArgsConstructor
public class PropertyController {

    private final IPropertyService propertyService;

    @GetMapping("/all")
    public ResponseEntity<List> loadAllInputTypes() {
        return ResponseEntity.ok(
                propertyService.loadAllInputTypes()
        );
    }
}