package org.salesync.apigateway.constants;

public final class Service {
    public static final String CONTEXT_PATH = "/api/v1";
    public static final String LOADBALANCER = "lb://";
    public static final class Type {
        public static final String NAME = "type-service";
        public static final String ENDPOINT = "/types";
    }
    public static final class Record {
        public static final String NAME = "record-service";
        public static final String ENDPOINT = "/records";
    }
}
