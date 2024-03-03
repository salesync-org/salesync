package org.salesync.record_service.dtos;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

import java.util.UUID;

@AllArgsConstructor
@RequiredArgsConstructor
@Builder
@Getter
public class PropertyDTO {
    UUID id;
    String name;
    String label;
    String defaultValue;
}