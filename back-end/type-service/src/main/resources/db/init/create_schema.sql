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
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.type
    OWNER to postgres;

CREATE TABLE IF NOT EXISTS public.relation
(
    inverse_relation_id uuid,
    relation_id uuid NOT NULL,
    name character varying(255) COLLATE pg_catalog."default",
    CONSTRAINT relation_pkey PRIMARY KEY (relation_id),
    CONSTRAINT relation_inverse_relation_id_key UNIQUE (inverse_relation_id),
    CONSTRAINT fk6utedqchh5xi1bnw58sac34jx FOREIGN KEY (inverse_relation_id)
        REFERENCES public.relation (relation_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
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
    CONSTRAINT uc_type_relation UNIQUE (source_id, destination_id, relation_id),
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

INSERT INTO public.type (type_id, name) VALUES
                                            ('f4828793-28c2-465b-b783-0c697e41dafb', 'Lead'),
                                            ('27d0c628-94c2-4650-828f-3c26e61bb692', 'Account'),
                                            ('32a9bf21-19fb-451f-9fcf-3de9b2d6eb88', 'Contact'),
                                            ('9515a156-82c1-49aa-bc6c-824c02f20da5', 'Opportunity'),
                                            ('05332fd7-4119-4fc9-b1bf-35e60a294df2', 'Task'),
                                            ('56e11f43-a31a-43ab-b86c-2ac73b0990d8', 'Event'),
                                            ('e7571c42-dc94-4fd2-b94b-6618500b170f', 'Deal'),
                                            ('d6df98e8-866c-49ea-93db-f469e0665fc7', 'Invoice'),
                                            ('0dd6aa7c-732d-4897-832f-ab26c9a7509e', 'Quote'),
                                            ('9f484d26-ee10-454f-a1a8-3632bee8958b', 'Product'),
                                            ('1a3af3bd-3c95-471e-bf6d-efcb3f6da1e6', 'Service'),
                                            ('251c8995-6e4a-47e2-a84e-04e4cb42514a', 'Campaign'),
                                            ('a49425ba-c570-427e-8279-f15cf26e3bc3', 'Note'),
                                            ('a82c9e8a-2359-41a4-b8bd-13d652999c23', 'Document'),
                                            ('201ff179-f718-431c-924b-a5e0b7665046', 'Case'),
                                            ('64461f95-2f8b-4f3c-b2a1-182d6143d588', 'Contract'),
                                            ('c90c1e39-2688-40ff-9394-f78307b8de79', 'Milestone'),
                                            ('f457698a-6f25-4920-91e2-9bd4d3e4fe4e', 'Feedback');
INSERT INTO public.relation (relation_id, name,inverse_relation_id) VALUES
                                              ('7114228c-1694-4d7e-80c7-6a7f199dfa4c', 'One-to-Many','391ac754-57e0-472e-9835-aa91e1314fe1'),
                                              ('391ac754-57e0-472e-9835-aa91e1314fe1', 'Many-to-One','7114228c-1694-4d7e-80c7-6a7f199dfa4c'),
                                              ('31f840eb-d6d4-4ee6-a3f5-16f0d42cb9ec', 'Many-to-Many','31f840eb-d6d4-4ee6-a3f5-16f0d42cb9ec'),
                                              ('2bc59082-2523-46e5-a7f8-68cb8205f0df', 'One-to-One Right','091d5af4-7a3e-4101-af47-64a89bf59583'),
                                              ('091d5af4-7a3e-4101-af47-64a89bf59583', 'One-to-One Left','2bc59082-2523-46e5-a7f8-68cb8205f0df'),
                                              ('4b5d85c2-1bde-44ae-9311-efa4966e04d8', 'Children-to-Parent',null);