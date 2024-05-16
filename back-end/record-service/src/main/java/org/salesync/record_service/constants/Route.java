package org.salesync.record_service.constants;

public final class Route {
    public static final String RECORD_ROUTE = "/records";
    public static final String RECORD_ID = "/{recordId}";
    public static final String TYPE_ID = "/{typeId}";
    public static final String CREATE = "/create";
    public static final String UPDATE = "/update";

    public static final String LIST_RECORD = "/list";

    public static final String PROPERTY = "/property";

    public static final String RECORD_TYPE_RELATION = "/create-record-type-relation";

    public static final String CREATE_LIST= "/create-list";

    public static final String UPDATE_STAGE = "/update-stage";

    public static final String LIST_RECORD_TYPE_RELATION = "/list-record-type-relation/{sourceRecordId}";
}
