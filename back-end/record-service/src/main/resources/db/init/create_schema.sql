-- DROP DATABASE IF EXISTS mydatabase;
-- CREATE DATABASE mydatabase;
GRANT ALL PRIVILEGES ON DATABASE salesync_record_service TO record_service;
CREATE ROLE postgres WITH LOGIN SUPERUSER PASSWORD 'strong_password';

\c salesync_record_service;

CREATE TABLE IF NOT EXISTS public.record
(
    record_id uuid NOT NULL,
    type_id uuid NOT NULL,
    user_id uuid NOT NULL,
    stage character varying(50) COLLATE pg_catalog."default",
    record_name character varying(255) COLLATE pg_catalog."default",
    CONSTRAINT pk_record PRIMARY KEY (record_id)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.record
    OWNER to postgres;

CREATE TABLE IF NOT EXISTS public.record_property
(
    record_property_id uuid NOT NULL,
    record_id uuid NOT NULL,
    property_id uuid NOT NULL,
    represent_value character varying(255) COLLATE pg_catalog."default",
    CONSTRAINT pk_record_property PRIMARY KEY (record_property_id)
    )

    TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.record_property
    OWNER to postgres;

CREATE TABLE IF NOT EXISTS public.relationship_of_records
(
    record_relation_id uuid NOT NULL,
    source_record_id uuid NOT NULL,
    destination_record_id uuid NOT NULL,
    relation_id uuid NOT NULL,
    CONSTRAINT pk_relationships_of_record PRIMARY KEY (record_relation_id)
    )

    TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.relationship_of_records
    OWNER to postgres;