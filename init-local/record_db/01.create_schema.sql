-- GRANT ALL PRIVILEGES ON DATABASE salesync_record_service TO record_service;
-- CREATE ROLE postgres WITH LOGIN SUPERUSER PASSWORD 'strong_password';

\c salesync_record_service;


DROP TABLE IF EXISTS public.record CASCADE;
CREATE TABLE IF NOT EXISTS public.record
(
    record_id uuid NOT NULL DEFAULT gen_random_uuid(),
    user_id   uuid NOT NULL,
    name      text,
    company_name text,
    version   bigint        DEFAULT 0,
    deleted boolean default false,
    CONSTRAINT pk_record PRIMARY KEY (record_id)
);

DROP TABLE IF EXISTS public.record_type_property CASCADE;
CREATE TABLE IF NOT EXISTS public.record_type_property
(
    record_type_property_id    uuid NOT NULL DEFAULT gen_random_uuid(),
    record_id                  uuid NOT NULL,
    name                       text NOT NULL,
    record_type_property_label text,
    item_value                 text,
    version                    bigint        DEFAULT 0,
    deleted 				boolean DEFAULT FALSE,
    CONSTRAINT pk_record_type_property PRIMARY KEY (record_type_property_id),
    CONSTRAINT fk_record_type_property_record FOREIGN KEY (record_id)
        REFERENCES public.record (record_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
);

DROP TABLE IF EXISTS public.record_type_relation CASCADE;
CREATE TABLE IF NOT EXISTS public.record_type_relation
(
    record_type_relation_id uuid NOT NULL DEFAULT gen_random_uuid(),
    source_record_id        uuid NOT NULL,
    destination_record_id   uuid NOT NULL,
    type_relation_id        uuid NOT NULL,
    version                 bigint        DEFAULT 0,
    CONSTRAINT pk_record_type_relation PRIMARY KEY (record_type_relation_id),
    CONSTRAINT fk_record_type_relation_source_record FOREIGN KEY (source_record_id)
        REFERENCES public.record (record_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT fk_record_type_relation_destination_record FOREIGN KEY (destination_record_id)
        REFERENCES public.record (record_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
);

DROP TABLE IF EXISTS public.record_type CASCADE;
CREATE TABLE IF NOT EXISTS public.record_type
(
    record_type_id uuid NOT NULL DEFAULT gen_random_uuid(),
    type_id        uuid NOT NULL,
    record_id      uuid NOT NULL,
    version        bigint        DEFAULT 0,
    CONSTRAINT pk_record_type PRIMARY KEY (record_type_id),
    CONSTRAINT fk_record_type_record FOREIGN KEY (record_id)
        REFERENCES public.record (record_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
);

DROP TABLE IF EXISTS public.record_stage CASCADE;
CREATE TABLE IF NOT EXISTS public.record_stage
(
    record_stage_id uuid NOT NULL DEFAULT gen_random_uuid(),
    record_id       uuid NOT NULL,
    stage_id        uuid NOT NULL,
    version         bigint        DEFAULT 0,
    CONSTRAINT pk_record_stage PRIMARY KEY (record_stage_id),
    CONSTRAINT fk_record_stage_record FOREIGN KEY (record_id)
        REFERENCES public.record (record_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
);
