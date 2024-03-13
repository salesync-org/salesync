package com.salesync.typeservice.constants;

public final class Route {
    public static final class Type {
        public static final String TYPE_ROUTE = "/types";
        public static final String TYPE_ID = "/{typeId}";
        public static final String GET_RELATION = "/relations" + TYPE_ID;
        public static final String CREATE_RELATION = "/create-relation";
    }
    public static final class Relation {
        public static final String RELATION_ROUTE = "/relations";
        public static final String RELATION_ID = "/{relationId}";
    }
    public static final class Field {
        public static final String FIELD_ROUTE = "/fields";
        public static final String FIELD_ID = "/{fieldId}";
    }

}
