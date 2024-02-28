package com.salesync.typeservice.controllers;


import com.salesync.typeservice.dtos.TypeDTO;
import com.salesync.typeservice.services.type.ITypeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController

@RequestMapping("/type")
public class TypeController {

    private final ITypeService typeService;

    @Autowired
    public TypeController(ITypeService typeService) {
        this.typeService = typeService;
    }

    @PostMapping("/create")
    public TypeDTO createType(@RequestBody TypeDTO typeDTO){
        return typeService.createType(typeDTO);
    }

    @GetMapping("/get-all")
    public List<TypeDTO> getAllType(){

        return typeService.getAllType();
    }




}
