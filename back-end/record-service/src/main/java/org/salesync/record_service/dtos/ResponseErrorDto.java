package org.salesync.record_service.dtos;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class ResponseErrorDto {
    private Integer status;
    private String message;
}
