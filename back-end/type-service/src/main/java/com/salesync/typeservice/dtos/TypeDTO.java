package com.salesync.typeservice.dtos;

import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import com.salesync.typeservice.annotations.validation.contain_id.ContainId;
import com.salesync.typeservice.annotations.validation.is_reuqired.IsRequired;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

import java.util.UUID;

@AllArgsConstructor
@RequiredArgsConstructor
@Builder
@Getter
@JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
public class TypeDTO {
    UUID id;
    @IsRequired
    String name;
    @ContainId
    TemplateDto template;
}
