package com.salesync.typeservice.dtos;

import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
public class ResponseErrorDto {
    private Integer status;
    private String message;
}
