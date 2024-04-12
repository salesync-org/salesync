package com.salesync.typeservice.exceptions;

import com.salesync.typeservice.constants.Message;
import lombok.Getter;
import lombok.Setter;


@Getter
@Setter
public class BadRequestException extends TypeServiceException {

    String value;

    public BadRequestException( String value) {
        super(value + " " + Message.BAD_REQUEST);
        this.value = value;
    }
}
