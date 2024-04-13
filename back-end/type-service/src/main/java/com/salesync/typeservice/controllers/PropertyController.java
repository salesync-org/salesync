package com.salesync.typeservice.controllers;


import com.salesync.typeservice.constants.Route;
import com.salesync.typeservice.entities.Property;
import com.salesync.typeservice.services.property.IPropertyService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.UUID;

@RestController
@RequestMapping("/{realm}" + Route.Type.TYPE_ROUTE)
@RequiredArgsConstructor
public class PropertyController {
    private final IPropertyService propertyService;



    @GetMapping(Route.Property.GET_PROPERTY)
    public ResponseEntity<Property> getProperty(@PathVariable UUID propertyId) {
        return ResponseEntity.ok(propertyService.getProperty(propertyId));
    }
}
