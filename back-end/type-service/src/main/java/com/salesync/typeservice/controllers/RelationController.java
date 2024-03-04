package com.salesync.typeservice.controllers;


import com.salesync.typeservice.dtos.RelationDTO;
import com.salesync.typeservice.services.relation.IRelationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/relation")
public class RelationController {
    private final IRelationService relationService;

    @Autowired
    public RelationController(IRelationService relationService) {
        this.relationService = relationService;
    }

    @GetMapping("/get-all")
    public ResponseEntity<List<RelationDTO>> getAllRelation(){
        return ResponseEntity.ok(relationService.getAllRelation());
    }

    @GetMapping("/get-one")
    public String getOneRelation(){
        return "One Relation";
    }

    @PostMapping("/create")
    public String createRelation(){
        return "Create Relation";
    }
}
