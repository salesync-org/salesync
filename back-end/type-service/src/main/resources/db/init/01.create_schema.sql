GRANT ALL PRIVILEGES ON DATABASE type_service TO type_service;
-- CREATE ROLE postgres WITH LOGIN SUPERUSER PASSWORD 'strong_password';

\c type_service;

DROP TABLE IF EXISTS public.template CASCADE;
CREATE TABLE IF NOT EXISTS public.template
(
    template_id uuid NOT NULL DEFAULT gen_random_uuid(),
    name text,
	version bigint DEFAULT 0,
    CONSTRAINT pk_template PRIMARY KEY (template_id)
);

DROP TABLE IF EXISTS public.type CASCADE;
CREATE TABLE IF NOT EXISTS public.type
(
    type_id uuid NOT NULL DEFAULT gen_random_uuid(),
    template_id uuid,
    name text,
    company_name text,
	version bigint DEFAULT 0,
    CONSTRAINT pk_type PRIMARY KEY (type_id),
    CONSTRAINT fk_type_template FOREIGN KEY (template_id)
        REFERENCES public.template (template_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
);

DROP TABLE IF EXISTS public.relation CASCADE;
CREATE TABLE IF NOT EXISTS public.relation
(
    relation_id uuid NOT NULL DEFAULT gen_random_uuid(),
    inverse_relation_id uuid,
    name text,
	version bigint DEFAULT 0,
    CONSTRAINT pk_relation PRIMARY KEY (relation_id),
    CONSTRAINT uc_inverse_relation UNIQUE (inverse_relation_id),
    CONSTRAINT fk_relation_relation FOREIGN KEY (inverse_relation_id)
        REFERENCES public.relation (relation_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
);

DROP TABLE IF EXISTS public.type_relation CASCADE;
CREATE TABLE IF NOT EXISTS public.type_relation
(
    type_relation_id uuid NOT NULL DEFAULT gen_random_uuid(),
    destination_id uuid,
    destination_label text,
    relation_id uuid,
    source_id uuid,
    source_type_label text,
	version bigint DEFAULT 0,
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

DROP TABLE IF EXISTS public.property CASCADE;
CREATE TABLE IF NOT EXISTS public.property
(
    property_id uuid NOT NULL DEFAULT gen_random_uuid(),
    name text,
	version bigint DEFAULT 0,
    CONSTRAINT pk_property PRIMARY KEY (property_id)
);

DROP TABLE IF EXISTS public.type_property CASCADE;
CREATE TABLE IF NOT EXISTS public.type_property
(
    type_property_id uuid NOT NULL DEFAULT gen_random_uuid(),
    property_id uuid NOT NULL,
    type_id uuid NOT NULL,
    name text,
    label text,
    sequence integer,
    default_value text,
    version bigint DEFAULT 0,
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

DROP TABLE IF EXISTS public.field CASCADE;
CREATE TABLE IF NOT EXISTS public.field
(
    field_id uuid NOT NULL DEFAULT gen_random_uuid(),
    input_type text,
    is_multiple_value boolean,
	version bigint DEFAULT 0,
    CONSTRAINT pk_field PRIMARY KEY (field_id)
);

DROP TABLE IF EXISTS public.property_field CASCADE;
CREATE TABLE IF NOT EXISTS public.property_field
(
    property_field_id uuid NOT NULL DEFAULT gen_random_uuid(),
    property_id uuid NOT NULL,
    field_id uuid NOT NULL,
    label text,
    item_value text,
    default_value text,
    is_required boolean,
    is_key boolean,
	version bigint DEFAULT 0,
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

DROP TABLE IF EXISTS public.stage CASCADE;
CREATE TABLE IF NOT EXISTS public.stage
(
    stage_id uuid NOT NULL DEFAULT gen_random_uuid(),
    type_id uuid NOT NULL,
    name text,
	version bigint DEFAULT 0,
    sequence_number integer NOT NULL DEFAULT 0,
    CONSTRAINT pk_stage PRIMARY KEY (stage_id),
    CONSTRAINT fk_stage_type FOREIGN KEY (type_id)
        REFERENCES public.type (type_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
    );

DROP TABLE IF EXISTS public.type_property_field CASCADE;
CREATE TABLE IF NOT EXISTS public.type_property_field
(
    type_property_field_id uuid NOT NULL DEFAULT gen_random_uuid(),
    type_property_id uuid NOT NULL,
    item_value text,
	version bigint DEFAULT 0,
    property_field_id uuid NOT NULL,
    CONSTRAINT pk_type_property_field PRIMARY KEY (type_property_field_id),
    CONSTRAINT fk_type_property FOREIGN KEY (type_property_id)
        REFERENCES public.type_property (type_property_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT fk_property_field FOREIGN KEY (property_field_id)
        REFERENCES public.property_field (property_field_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
    );