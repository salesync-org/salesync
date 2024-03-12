package com.salesync.typeservice.dtos;

import com.salesync.typeservice.annotations.validation.IsRequired;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@AllArgsConstructor
@RequiredArgsConstructor
@Builder
@Getter
public class TypeDTO {
    String id;
    @IsRequired
    String name;
}
