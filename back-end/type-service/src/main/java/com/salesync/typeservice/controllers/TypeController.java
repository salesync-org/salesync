package com.salesync.typeservice.controllers;


import com.salesync.typeservice.dtos.TypeDTO;
import com.salesync.typeservice.services.type.ITypeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController

@RequestMapping("/type")
public class TypeController {

    private final ITypeService typeService;

    @Autowired
    public TypeController(ITypeService typeService) {
        this.typeService = typeService;
    }

    @PostMapping("/create")
    public TypeDTO createType(){
        return typeService.createType(new TypeDTO("A","Account"));
    }
}
