package org.salesync.record_service.dtos;

import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import lombok.*;

import java.io.Serializable;
import java.util.UUID;

@AllArgsConstructor
@RequiredArgsConstructor
@Data
@Builder
@JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
public class TypeDto {
    private UUID id;
    private String name;
    private TemplateDto template;
}
