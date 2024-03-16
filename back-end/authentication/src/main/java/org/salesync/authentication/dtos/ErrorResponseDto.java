package org.salesync.authentication.dtos;

import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
public class ErrorResponseDto {
    private String message;
    private int status;
}
