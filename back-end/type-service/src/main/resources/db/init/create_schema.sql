-- DROP DATABASE IF EXISTS mydatabase;
-- CREATE DATABASE mydatabase;
GRANT ALL PRIVILEGES ON DATABASE salesync_type_service TO type_service;
CREATE ROLE postgres WITH LOGIN SUPERUSER PASSWORD 'strong_password';

\c salesync_type_service;

CREATE TABLE IF NOT EXISTS public.type
(
    type_id uuid NOT NULL,
    name character varying(255) COLLATE pg_catalog."default",
    CONSTRAINT type_pkey PRIMARY KEY (type_id)
);

    INSERT INTO public.type (name)
    VALUES
('Lead'),
('Account'),
('Contact'),
('Opportunity'),
('Task'),
('Event'),
('Deal'),
('Invoice'),
('Quote'),
('Product'),
('Service'),
('Campaign'),
('Note'),
('Document'),
('Case'),
('Contract'),
('Milestone'),
('Feedback');

    TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.type
    OWNER to postgres;

CREATE TABLE IF NOT EXISTS public.relation
(
    relation_id uuid NOT NULL,
    name character varying(255) COLLATE pg_catalog."default",
    CONSTRAINT relation_pkey PRIMARY KEY (relation_id)
)

    TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.relation
    OWNER to postgres;

CREATE TABLE IF NOT EXISTS public.type_relation
(
    destination_id uuid,
    relation_id uuid,
    source_id uuid,
    type_relation_id uuid NOT NULL,
    destination_label character varying(255) COLLATE pg_catalog."default",
    source_type_label character varying(255) COLLATE pg_catalog."default",
    CONSTRAINT type_relation_pkey PRIMARY KEY (type_relation_id),
    CONSTRAINT fk73i0p2asql61pveeqq3upa6d4 FOREIGN KEY (relation_id)
        REFERENCES public.relation (relation_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT fkca65vigse897d1vaucg0f29oy FOREIGN KEY (source_id)
        REFERENCES public.type (type_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT fkhhidt9slc0booxtqux5fp0ci7 FOREIGN KEY (destination_id)
        REFERENCES public.type (type_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)

    TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.type_relation
    OWNER to postgres;