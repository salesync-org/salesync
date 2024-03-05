package com.salesync.typeservice.dtos;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

import java.util.UUID;


@AllArgsConstructor
@RequiredArgsConstructor
@Builder
@Getter
public class TypeDTO {
    UUID id;
    String name;
}
