package com.salesync.typeservice.dtos;

import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import com.salesync.typeservice.annotations.validation.contain_id.ContainId;
import com.salesync.typeservice.annotations.validation.is_reuqired.IsRequired;
import lombok.*;

import java.util.UUID;

@Builder
@Getter
@AllArgsConstructor
@NoArgsConstructor
@JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
public class TypeDTO {
    private UUID id;
    @IsRequired
    private String name;
    @ContainId
    private TemplateDto template;
}
