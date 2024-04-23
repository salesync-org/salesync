package org.salesync.record_service.exceptions;

import lombok.Getter;
import lombok.Setter;
import org.salesync.record_service.constants.Message;

@Setter
@Getter
public class ObjectNotFoundException extends RecordServiceException {
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
        super(String.format("%s with %s %s", key, value, Message.NOT_FOUND));
        this.key = key;
        this.value = value;
    }
}
