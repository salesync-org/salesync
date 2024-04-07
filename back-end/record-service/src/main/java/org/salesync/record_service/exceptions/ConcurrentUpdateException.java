package org.salesync.record_service.exceptions;

public class ConcurrentUpdateException extends RecordServiceException {
    public ConcurrentUpdateException(String message) {
        super(message);
    }
}
