GRANT ALL PRIVILEGES ON DATABASE salesync_type_service TO type_service;
CREATE ROLE postgres WITH LOGIN SUPERUSER PASSWORD 'strong_password';

\c salesync_type_service;

CREATE TABLE IF NOT EXISTS public.type
(
    template_id uuid NOT NULL DEFAULT gen_random_uuid(),
    name character varying(50),
    CONSTRAINT pk_type PRIMARY KEY (template_id)
);
ALTER TABLE IF EXISTS public.type OWNER to postgres;

CREATE TABLE IF NOT EXISTS PUBLIC.type
(
    type_id uuid NOT NULL DEFAULT gen_random_uuid(),
    template_id uuid,
    name character varying(50),
    CONSTRAINT pk_type PRIMARY KEY (type_id),
    CONSTRAINT fk_type_template FOREIGN KEY (template_id)
        REFERENCES public.type (template_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
);
ALTER TABLE IF EXISTS public.type OWNER to postgres;

CREATE TABLE IF NOT EXISTS public.relation
(
    relation_id uuid NOT NULL DEFAULT gen_random_uuid(),
    inverse_relation_id uuid,
    name character varying(50),
    CONSTRAINT pk_relation PRIMARY KEY (relation_id),
    CONSTRAINT uc_inverse_relation UNIQUE (inverse_relation_id),
    CONSTRAINT fk_relation_relation FOREIGN KEY (inverse_relation_id)
        REFERENCES public.relation (relation_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
);
ALTER TABLE IF EXISTS public.relation OWNER to postgres;

CREATE TABLE IF NOT EXISTS public.type_relation
(
    type_relation_id uuid NOT NULL DEFAULT gen_random_uuid(),
    destination_id uuid,
    destination_label character varying(50),
    relation_id uuid,
    source_id uuid,
    source_type_label character varying(50),
    CONSTRAINT pk_type_relation PRIMARY KEY (type_relation_id),
    CONSTRAINT fk_type_relation_relation FOREIGN KEY (relation_id)
        REFERENCES public.relation (relation_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT fk_type_relation_source FOREIGN KEY (source_id)
        REFERENCES public.type (type_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT fk_type_relation_destination FOREIGN KEY (destination_id)
        REFERENCES public.type (type_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
);
ALTER TABLE IF EXISTS public.type_relation OWNER to postgres;

CREATE TABLE IF NOT EXISTS public.property
(
    property_id uuid NOT NULL DEFAULT gen_random_uuid(),
    name character varying(50),
    CONSTRAINT pk_property PRIMARY KEY (property_id)
);
ALTER TABLE IF EXISTS public.property OWNER to postgres;

CREATE TABLE IF NOT EXISTS public.type_property
(
    type_property_id uuid NOT NULL DEFAULT gen_random_uuid(),
    property_id uuid NOT NULL,
    type_id uuid NOT NULL,
    name character varying(50),
    label character varying(50),
    sequence integer,
    default_value character varying(50),
    CONSTRAINT pk_type_property PRIMARY KEY (type_property_id),
    CONSTRAINT fk_property_type FOREIGN KEY (type_id)
    REFERENCES public.type (type_id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION,
    CONSTRAINT fk_type_property FOREIGN KEY (property_id)
    REFERENCES public.property (property_id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
);
ALTER TABLE IF EXISTS public.type_property OWNER to postgres;

CREATE TABLE IF NOT EXISTS public.field
(
    field_id uuid NOT NULL DEFAULT gen_random_uuid(),
    input_type character varying(50),
    is_multiple_value BIT,
    CONSTRAINT pk_field PRIMARY KEY (field_id)
)

    TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.field
    OWNER to postgres;

CREATE TABLE IF NOT EXISTS public.property_field
(
    property_field_id uuid NOT NULL DEFAULT gen_random_uuid(),
    property_id uuid NOT NULL,
    field_id uuid NOT NULL,
    label character varying(50),
    value character varying(50),
    default_value character varying(50),
    is_required BIT,
    is_key BIT,
    CONSTRAINT pk_property_field PRIMARY KEY (property_field_id),
    CONSTRAINT fk_property_field FOREIGN KEY (field_id)
    REFERENCES public.field (field_id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION,
    CONSTRAINT fk_field_property FOREIGN KEY (property_id)
    REFERENCES public.property (property_id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    );
ALTER TABLE IF EXISTS public.property_field OWNER to postgres;

CREATE TABLE IF NOT EXISTS public.stage
(
    stage_id uuid NOT NULL DEFAULT gen_random_uuid(),
    type_id uuid NOT NULL,
    name character varying(255),
    weight integer NOT NULL DEFAULT 1,
    CONSTRAINT pk_stage PRIMARY KEY (stage_id),
    CONSTRAINT fk_stage_type FOREIGN KEY (type_id)
        REFERENCES public.type (type_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
    );
ALTER TABLE IF EXISTS public.stage OWNER to postgres;

CREATE TABLE IF NOT EXISTS public.property_field_type
(
    property_field_type_id uuid NOT NULL DEFAULT gen_random_uuid(),
    property_field_id uuid NOT NULL,
    type_property_id uuid NOT NULL,
    value character varying(255),
    CONSTRAINT pk_property_field_type PRIMARY KEY (property_field_type_id),
    CONSTRAINT fk_property_field_type FOREIGN KEY (property_field_id)
        REFERENCES public.property_field (property_field_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT fk_property_field_type_type FOREIGN KEY (type_id)
        REFERENCES public.type (type_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
    );
ALTER TABLE IF EXISTS public.property_field_type OWNER to postgres;