package com.salesync.typeservice.controllers;


import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/relation")
public class RelationController {
    @GetMapping("/get-all")
    public String getAllRelation(){
        return "All Relation";
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
