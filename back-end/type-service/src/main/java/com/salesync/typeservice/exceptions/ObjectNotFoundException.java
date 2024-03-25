package com.salesync.typeservice.exceptions;

import com.salesync.typeservice.constants.Message;
import lombok.Getter;
import lombok.Setter;

import java.text.MessageFormat;

@Getter
@Setter
public class ObjectNotFoundException extends TypeServiceException {
    private String key;
    private String value;

    public ObjectNotFoundException(String message) {
        super(message);
    }

    public ObjectNotFoundException(String key, String value, String message) {
        super(message);
        this.key = key;
        this.value = value;
    }

    public ObjectNotFoundException(String key, String value) {
        super(MessageFormat.format("{0} with {1} {2}", key, value, Message.NOT_FOUND));
        this.key = key;
        this.value = value;
    }
}
