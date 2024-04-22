package com.salesync.notificationservice.dtos;

import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.util.ObjectUtils;

import java.io.Serializable;
import java.util.UUID;

@AllArgsConstructor
@RequiredArgsConstructor
@Data
@JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
public class TemplateDto implements Serializable {
    private static final long serialVersionUID = -494540913740321836L;


    private UUID id;
    private String name;

}
