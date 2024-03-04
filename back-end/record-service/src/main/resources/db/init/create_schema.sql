-- DROP DATABASE IF EXISTS mydatabase;
-- CREATE DATABASE mydatabase;
GRANT ALL PRIVILEGES ON DATABASE salesync_record_service TO record_service;
CREATE ROLE postgres WITH LOGIN SUPERUSER PASSWORD 'strong_password';

\c salesync_record_service;

CREATE TABLE IF NOT EXISTS public.property
(
    property_id uuid NOT NULL,
    type_id uuid NOT NULL,
    name character varying(255) COLLATE pg_catalog."default",
    label character varying(255) COLLATE pg_catalog."default",
    CONSTRAINT type_pkey PRIMARY KEY (type_id)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.property
    OWNER to postgres;