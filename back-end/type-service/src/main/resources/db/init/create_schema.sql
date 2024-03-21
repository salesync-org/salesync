DROP DATABASE IF EXISTS salesync_type_service;
CREATE DATABASE salesync_type_service;
-- GRANT ALL PRIVILEGES ON DATABASE salesync_type_service TO type_service;
-- CREATE ROLE postgres WITH LOGIN SUPERUSER PASSWORD 'strong_password';

\c salesync_type_service;

CREATE TABLE IF NOT EXISTS public.type
(
    type_id uuid NOT NULL DEFAULT gen_random_uuid(),
    name character varying(255) COLLATE pg_catalog."default",
    CONSTRAINT pk_type PRIMARY KEY (type_id)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.type
    OWNER to postgres;

CREATE TABLE IF NOT EXISTS public.relation
(
    relation_id uuid NOT NULL DEFAULT gen_random_uuid(),
    inverse_relation_id uuid,
    name character varying(255) COLLATE pg_catalog."default",
    CONSTRAINT pk_relation PRIMARY KEY (relation_id),
    CONSTRAINT uc_inverse_relation UNIQUE (inverse_relation_id),
    CONSTRAINT fk_relation_relation FOREIGN KEY (inverse_relation_id)
        REFERENCES public.relation (relation_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)

    TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.relation
    OWNER to postgres;

CREATE TABLE IF NOT EXISTS public.type_relation
(
    type_relation_id uuid NOT NULL DEFAULT gen_random_uuid(),
    destination_id uuid,
    relation_id uuid,
    source_id uuid,
    destination_label character varying(255) COLLATE pg_catalog."default",
    source_type_label character varying(255) COLLATE pg_catalog."default",
    CONSTRAINT uc_type_relation UNIQUE (source_id, destination_id, relation_id),
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
)

    TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.type_relation
    OWNER to postgres;

CREATE TABLE IF NOT EXISTS public.property
(
    property_id uuid NOT NULL DEFAULT gen_random_uuid(),
    name character varying(255) COLLATE pg_catalog."default",
    label character varying(255) COLLATE pg_catalog."default",
    CONSTRAINT pk_property PRIMARY KEY (property_id)
)

    TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.property
    OWNER to postgres;

CREATE TABLE IF NOT EXISTS public.type_property
(
    type_property_id uuid NOT NULL DEFAULT gen_random_uuid(),
    property_id uuid NOT NULL,
    type_id uuid NOT NULL,
    name character varying(255) COLLATE pg_catalog."default",
    label character varying(255) COLLATE pg_catalog."default",
    default_value character varying(255) COLLATE pg_catalog."default",
    CONSTRAINT pk_type_property PRIMARY KEY (type_property_id),
    CONSTRAINT fk_property_type FOREIGN KEY (type_id)
    REFERENCES public.type (type_id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION,
    CONSTRAINT fk_type_property FOREIGN KEY (property_id)
    REFERENCES public.property (property_id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
)

    TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.type_property
    OWNER to postgres;

CREATE TABLE IF NOT EXISTS public.field
(
    field_id uuid NOT NULL DEFAULT gen_random_uuid(),
    input_type character varying(50) COLLATE pg_catalog."default",
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
    label character varying(255) COLLATE pg_catalog."default",
    value character varying(255) COLLATE pg_catalog."default",
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
    )

    TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.property_field
    OWNER to postgres;

CREATE TABLE IF NOT EXISTS public.stage
(
    stage_id uuid NOT NULL DEFAULT gen_random_uuid(),
    type_id uuid NOT NULL,
    name character varying(255) COLLATE pg_catalog."default",
    weight integer NOT NULL DEFAULT 1,
    CONSTRAINT pk_stage PRIMARY KEY (stage_id),
    CONSTRAINT fk_stage_type FOREIGN KEY (type_id)
        REFERENCES public.type (type_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
    )

    TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.stage
    OWNER to postgres;

CREATE TABLE IF NOT EXISTS public.property_field_type
(
    property_field_type_id uuid NOT NULL DEFAULT gen_random_uuid(),
    property_field_id uuid NOT NULL,
    type_id uuid NOT NULL,
    value character varying(255) COLLATE pg_catalog."default",
    CONSTRAINT pk_property_field_type PRIMARY KEY (property_field_type_id),
    CONSTRAINT fk_property_field_type FOREIGN KEY (property_field_id)
        REFERENCES public.property_field (property_field_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT fk_property_field_type_type FOREIGN KEY (type_id)
        REFERENCES public.type (type_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
    )

    TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.property_field_type
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

INSERT INTO public.relation (relation_id, name, inverse_relation_id) VALUES
                                            ('7114228c-1694-4d7e-80c7-6a7f199dfa4c', 'One-to-Many','391ac754-57e0-472e-9835-aa91e1314fe1'),
                                            ('391ac754-57e0-472e-9835-aa91e1314fe1', 'Many-to-One','7114228c-1694-4d7e-80c7-6a7f199dfa4c'),
                                            ('31f840eb-d6d4-4ee6-a3f5-16f0d42cb9ec', 'Many-to-Many','31f840eb-d6d4-4ee6-a3f5-16f0d42cb9ec'),
                                            ('2bc59082-2523-46e5-a7f8-68cb8205f0df', 'One-to-One Right','091d5af4-7a3e-4101-af47-64a89bf59583'),
                                            ('091d5af4-7a3e-4101-af47-64a89bf59583', 'One-to-One Left','2bc59082-2523-46e5-a7f8-68cb8205f0df'),
                                            ('4b5d85c2-1bde-44ae-9311-efa4966e04d8', 'Children-to-Parent',null);

INSERT INTO public.type_relation (type_relation_id, relation_id, source_id, source_type_label, destination_id, destination_label) VALUES
                                            ('22db28cf-a50e-414e-a5b2-651046d80ee8', '391ac754-57e0-472e-9835-aa91e1314fe1', '27d0c628-94c2-4650-828f-3c26e61bb692', 'Account', '251c8995-6e4a-47e2-a84e-04e4cb42514a', 'Campaign'),
                                            ('045cba16-e572-4b6f-9b53-b7f2fc162b46', '7114228c-1694-4d7e-80c7-6a7f199dfa4c', '27d0c628-94c2-4650-828f-3c26e61bb692', 'Account', '201ff179-f718-431c-924b-a5e0b7665046', 'Case'),
                                            ('95c5d407-6f02-4b2b-bd81-56862344022e', '31f840eb-d6d4-4ee6-a3f5-16f0d42cb9ec', '27d0c628-94c2-4650-828f-3c26e61bb692', 'Account', '32a9bf21-19fb-451f-9fcf-3de9b2d6eb88', 'Contact'),
                                            ('f4faa087-90f6-4750-afe5-d648ea72f739', '7114228c-1694-4d7e-80c7-6a7f199dfa4c', '27d0c628-94c2-4650-828f-3c26e61bb692', 'Account', 'd6df98e8-866c-49ea-93db-f469e0665fc7', 'Invoice'),
                                            ('79306289-a993-42bc-a11f-a34259faf662', '31f840eb-d6d4-4ee6-a3f5-16f0d42cb9ec', '27d0c628-94c2-4650-828f-3c26e61bb692', 'Account', 'a82c9e8a-2359-41a4-b8bd-13d652999c23', 'Document'),
                                            ('a46b139f-ced5-47bf-878b-65fc2d5083a3', '7114228c-1694-4d7e-80c7-6a7f199dfa4c', '27d0c628-94c2-4650-828f-3c26e61bb692', 'Account', '9515a156-82c1-49aa-bc6c-824c02f20da5', 'Opportunity'),
                                            ('57108111-33cc-4626-b21e-cd09d76a17e2', '091d5af4-7a3e-4101-af47-64a89bf59583', '27d0c628-94c2-4650-828f-3c26e61bb692', 'Account', 'f4828793-28c2-465b-b783-0c697e41dafb', 'Lead'),
                                            ('bf3aeb8c-1a74-478f-b898-82b4ffe9ab85', '7114228c-1694-4d7e-80c7-6a7f199dfa4c', '27d0c628-94c2-4650-828f-3c26e61bb692', 'Account', '0dd6aa7c-732d-4897-832f-ab26c9a7509e', 'Quote'),
                                            ('1e111d0f-5d12-4e03-b904-29077bf26502', '4b5d85c2-1bde-44ae-9311-efa4966e04d8', '05332fd7-4119-4fc9-b1bf-35e60a294df2', 'Task', '27d0c628-94c2-4650-828f-3c26e61bb692', 'Account'),
                                            ('f151def6-b989-436b-a392-0aabd0206aa0', '7114228c-1694-4d7e-80c7-6a7f199dfa4c', '27d0c628-94c2-4650-828f-3c26e61bb692', 'Account', '05332fd7-4119-4fc9-b1bf-35e60a294df2', 'Task'),
                                            ('aa58589d-de20-43ad-b0b0-b9f8c6be9e14', '2bc59082-2523-46e5-a7f8-68cb8205f0df', 'f4828793-28c2-465b-b783-0c697e41dafb', 'Lead', '27d0c628-94c2-4650-828f-3c26e61bb692', 'Account'),
                                            ('31b727da-b5e0-4c5c-8b0f-a0221ff91ea4', '391ac754-57e0-472e-9835-aa91e1314fe1', 'f4828793-28c2-465b-b783-0c697e41dafb', 'Lead', '251c8995-6e4a-47e2-a84e-04e4cb42514a', 'Campaign'),
                                            ('7caa0e07-ddb2-491a-a983-c9b7534ed2f3', '7114228c-1694-4d7e-80c7-6a7f199dfa4c', 'f4828793-28c2-465b-b783-0c697e41dafb', 'Lead', '201ff179-f718-431c-924b-a5e0b7665046', 'Case'),
                                            ('ac0e4457-44cc-489c-839c-0bf0befea839', '2bc59082-2523-46e5-a7f8-68cb8205f0df', 'f4828793-28c2-465b-b783-0c697e41dafb', 'Lead', '32a9bf21-19fb-451f-9fcf-3de9b2d6eb88', 'Contact'),
                                            ('7b117691-25e9-4b91-a9d9-529fb875ebb3', '2bc59082-2523-46e5-a7f8-68cb8205f0df', 'f4828793-28c2-465b-b783-0c697e41dafb', 'Lead', '9515a156-82c1-49aa-bc6c-824c02f20da5', 'Opportunity'),
                                            ('f7b4cc6f-1d16-4495-b628-06b496933c88', '31f840eb-d6d4-4ee6-a3f5-16f0d42cb9ec', 'f4828793-28c2-465b-b783-0c697e41dafb', 'Lead', 'a82c9e8a-2359-41a4-b8bd-13d652999c23', 'Document'),
                                            ('198306d2-cef5-4f7f-9ed9-ac01c94069c7', '4b5d85c2-1bde-44ae-9311-efa4966e04d8', '05332fd7-4119-4fc9-b1bf-35e60a294df2', 'Task', 'f4828793-28c2-465b-b783-0c697e41dafb', 'Lead'),
                                            ('2ae95f63-201c-49c8-a542-aa31859dd0b3', '31f840eb-d6d4-4ee6-a3f5-16f0d42cb9ec', '32a9bf21-19fb-451f-9fcf-3de9b2d6eb88', 'Contact', '27d0c628-94c2-4650-828f-3c26e61bb692', 'Account'),
                                            ('a6bd70e3-5bee-4f07-a98c-09e7fe2fea5e', '091d5af4-7a3e-4101-af47-64a89bf59583', '32a9bf21-19fb-451f-9fcf-3de9b2d6eb88', 'Contact', 'f4828793-28c2-465b-b783-0c697e41dafb', 'Lead'),
                                            ('756c9ba7-5d83-4a0c-b671-0e13d446abe5', '391ac754-57e0-472e-9835-aa91e1314fe1', '32a9bf21-19fb-451f-9fcf-3de9b2d6eb88', 'Contact', '251c8995-6e4a-47e2-a84e-04e4cb42514a', 'Campaign'),
                                            ('59da40c0-35df-4240-8fdd-f9c092dfae60', '31f840eb-d6d4-4ee6-a3f5-16f0d42cb9ec', '32a9bf21-19fb-451f-9fcf-3de9b2d6eb88', 'Contact', '201ff179-f718-431c-924b-a5e0b7665046', 'Case'),
                                            ('0dbd46c1-8a6d-4f96-b4fc-939dd1e2b6ef', '31f840eb-d6d4-4ee6-a3f5-16f0d42cb9ec', '32a9bf21-19fb-451f-9fcf-3de9b2d6eb88', 'Contact', 'a82c9e8a-2359-41a4-b8bd-13d652999c23', 'Document'),
                                            ('faa2859f-5f95-4fd3-90d5-4836c1fbc075', '7114228c-1694-4d7e-80c7-6a7f199dfa4c', '32a9bf21-19fb-451f-9fcf-3de9b2d6eb88', 'Contact', 'd6df98e8-866c-49ea-93db-f469e0665fc7', 'Invoice'),
                                            ('cb0eb6b9-4cc1-40c0-b795-699d33c7e4b9', '31f840eb-d6d4-4ee6-a3f5-16f0d42cb9ec', '32a9bf21-19fb-451f-9fcf-3de9b2d6eb88', 'Contact', '9515a156-82c1-49aa-bc6c-824c02f20da5', 'Opportunity'),
                                            ('1cbb9423-a477-4a37-97a1-a9c077d8a894', '7114228c-1694-4d7e-80c7-6a7f199dfa4c', '32a9bf21-19fb-451f-9fcf-3de9b2d6eb88', 'Contact', '0dd6aa7c-732d-4897-832f-ab26c9a7509e', 'Quote'),
                                            ('1d9be5c9-8fee-495a-8460-c987bc029a7e', '7114228c-1694-4d7e-80c7-6a7f199dfa4c', '32a9bf21-19fb-451f-9fcf-3de9b2d6eb88', 'Contact', '05332fd7-4119-4fc9-b1bf-35e60a294df2', 'Task'),
                                            ('b26da340-d734-4b7f-9737-21ceaeb56521', '4b5d85c2-1bde-44ae-9311-efa4966e04d8', '05332fd7-4119-4fc9-b1bf-35e60a294df2', 'Task', '32a9bf21-19fb-451f-9fcf-3de9b2d6eb88', 'Contact'),
                                            ('c893840c-f919-48c4-84e5-c2389eab4063', '391ac754-57e0-472e-9835-aa91e1314fe1', '9515a156-82c1-49aa-bc6c-824c02f20da5', 'Opportunity', '27d0c628-94c2-4650-828f-3c26e61bb692', 'Account'),
                                            ('5d705933-99c6-4fcd-beb7-2bd41ebc20e1', '391ac754-57e0-472e-9835-aa91e1314fe1', '9515a156-82c1-49aa-bc6c-824c02f20da5', 'Opportunity', '251c8995-6e4a-47e2-a84e-04e4cb42514a', 'Campaign'),
                                            ('e0d3fff4-25b9-4005-973d-90dc42ed27b9', '31f840eb-d6d4-4ee6-a3f5-16f0d42cb9ec', '9515a156-82c1-49aa-bc6c-824c02f20da5', 'Opportunity', '32a9bf21-19fb-451f-9fcf-3de9b2d6eb88', 'Contact'),
                                            ('85838630-574d-4c70-a3e7-7a3dbbf872f5', '31f840eb-d6d4-4ee6-a3f5-16f0d42cb9ec', '9515a156-82c1-49aa-bc6c-824c02f20da5', 'Opportunity', 'a82c9e8a-2359-41a4-b8bd-13d652999c23', 'Document'),
                                            ('0160d7f2-6554-4b69-99c4-ce128cc10cdf', '7114228c-1694-4d7e-80c7-6a7f199dfa4c', '9515a156-82c1-49aa-bc6c-824c02f20da5', 'Opportunity', 'd6df98e8-866c-49ea-93db-f469e0665fc7', 'Invoice'),
                                            ('b4a671ed-cea4-4072-a62c-327f1a146e39', '091d5af4-7a3e-4101-af47-64a89bf59583', '9515a156-82c1-49aa-bc6c-824c02f20da5', 'Opportunity', 'f4828793-28c2-465b-b783-0c697e41dafb', 'Lead'),
                                            ('d39f5ac9-054a-4a0a-8d10-8cd5606cdcb0', '7114228c-1694-4d7e-80c7-6a7f199dfa4c', '9515a156-82c1-49aa-bc6c-824c02f20da5', 'Opportunity', '0dd6aa7c-732d-4897-832f-ab26c9a7509e', 'Quote'),
                                            ('0843e746-ed3b-4a1e-83f5-31e45874b433', '4b5d85c2-1bde-44ae-9311-efa4966e04d8', '05332fd7-4119-4fc9-b1bf-35e60a294df2', 'Task', '9515a156-82c1-49aa-bc6c-824c02f20da5', 'Opportunity'),
                                            ('fb3bb1d1-e9d7-4a80-bd28-0cc6604ee417', '391ac754-57e0-472e-9835-aa91e1314fe1', 'd6df98e8-866c-49ea-93db-f469e0665fc7', 'Invoice', '27d0c628-94c2-4650-828f-3c26e61bb692', 'Account'),
                                            ('75b96bab-3a93-4796-b9ab-6cde5bf62cbb', '391ac754-57e0-472e-9835-aa91e1314fe1', 'd6df98e8-866c-49ea-93db-f469e0665fc7', 'Invoice', '32a9bf21-19fb-451f-9fcf-3de9b2d6eb88', 'Contact'),
                                            ('21f2db10-a7e9-47b9-87cb-0266ed10e4b5', '391ac754-57e0-472e-9835-aa91e1314fe1', 'd6df98e8-866c-49ea-93db-f469e0665fc7', 'Invoice', '9515a156-82c1-49aa-bc6c-824c02f20da5', 'Opportunity'),
                                            ('3ef21d19-a8bb-49c0-8c59-8b5ffa70ca34', '391ac754-57e0-472e-9835-aa91e1314fe1', 'd6df98e8-866c-49ea-93db-f469e0665fc7', 'Invoice', '0dd6aa7c-732d-4897-832f-ab26c9a7509e', 'Quote'),
                                            ('015e9b5b-5f46-46de-a058-66a0a2ebf04f', '391ac754-57e0-472e-9835-aa91e1314fe1', '0dd6aa7c-732d-4897-832f-ab26c9a7509e', 'Quote', '27d0c628-94c2-4650-828f-3c26e61bb692', 'Account'),
                                            ('767940f9-e389-44e7-8341-c3140fd2cf57', '391ac754-57e0-472e-9835-aa91e1314fe1', '0dd6aa7c-732d-4897-832f-ab26c9a7509e', 'Quote', '32a9bf21-19fb-451f-9fcf-3de9b2d6eb88', 'Contact'),
                                            ('6462d042-1500-4db5-a32b-dd5e31b1ad68', '391ac754-57e0-472e-9835-aa91e1314fe1', '0dd6aa7c-732d-4897-832f-ab26c9a7509e', 'Quote', '9515a156-82c1-49aa-bc6c-824c02f20da5', 'Opportunity'),
                                            ('9a5922da-5fb1-426f-a02b-939cf3786760', '7114228c-1694-4d7e-80c7-6a7f199dfa4c', '0dd6aa7c-732d-4897-832f-ab26c9a7509e', 'Quote', 'd6df98e8-866c-49ea-93db-f469e0665fc7', 'Invoice'),
                                            ('ebcc4845-6ef5-4fde-84d6-42ed922748d3', '7114228c-1694-4d7e-80c7-6a7f199dfa4c', '251c8995-6e4a-47e2-a84e-04e4cb42514a', 'Campaign', '27d0c628-94c2-4650-828f-3c26e61bb692', 'Account'),
                                            ('1089c5fc-59d0-49df-8bab-a850b98fb33b', '7114228c-1694-4d7e-80c7-6a7f199dfa4c', '251c8995-6e4a-47e2-a84e-04e4cb42514a', 'Campaign', '32a9bf21-19fb-451f-9fcf-3de9b2d6eb88', 'Contact'),
                                            ('2e873477-4a29-4fcc-bf65-58a620f44b6e', '7114228c-1694-4d7e-80c7-6a7f199dfa4c', '251c8995-6e4a-47e2-a84e-04e4cb42514a', 'Campaign', 'f4828793-28c2-465b-b783-0c697e41dafb', 'Lead'),
                                            ('c7d31c8b-0c9b-45f5-94f9-becb53c01e94', '7114228c-1694-4d7e-80c7-6a7f199dfa4c', '251c8995-6e4a-47e2-a84e-04e4cb42514a', 'Campaign', '9515a156-82c1-49aa-bc6c-824c02f20da5', 'Opportunity'),
                                            ('20029e78-c32c-46d5-897f-25f6888b7598', '31f840eb-d6d4-4ee6-a3f5-16f0d42cb9ec', 'a82c9e8a-2359-41a4-b8bd-13d652999c23', 'Document', '27d0c628-94c2-4650-828f-3c26e61bb692', 'Account'),
                                            ('e705af67-49a5-423c-905a-e6f579d44e01', '31f840eb-d6d4-4ee6-a3f5-16f0d42cb9ec', 'a82c9e8a-2359-41a4-b8bd-13d652999c23', 'Document', '32a9bf21-19fb-451f-9fcf-3de9b2d6eb88', 'Contact'),
                                            ('a5d1fc47-9659-4b50-bffd-cc89f8ded942', '31f840eb-d6d4-4ee6-a3f5-16f0d42cb9ec', 'a82c9e8a-2359-41a4-b8bd-13d652999c23', 'Document', 'f4828793-28c2-465b-b783-0c697e41dafb', 'Lead'),
                                            ('489db35e-ffb1-4abf-8dfe-fdf051946b1c', '31f840eb-d6d4-4ee6-a3f5-16f0d42cb9ec', 'a82c9e8a-2359-41a4-b8bd-13d652999c23', 'Document', '9515a156-82c1-49aa-bc6c-824c02f20da5', 'Opportunity'),
                                            ('dc0c5ea4-1da9-48d3-b0fa-c84b938b223b', '391ac754-57e0-472e-9835-aa91e1314fe1', '201ff179-f718-431c-924b-a5e0b7665046', 'Case', '27d0c628-94c2-4650-828f-3c26e61bb692', 'Account'),
                                            ('e5538790-ae8e-4749-8ff5-f39c396b164a', '391ac754-57e0-472e-9835-aa91e1314fe1', '201ff179-f718-431c-924b-a5e0b7665046', 'Case', '32a9bf21-19fb-451f-9fcf-3de9b2d6eb88', 'Contact'),
                                            ('510e8d56-b4c5-444e-9749-a6635cdaac10', '391ac754-57e0-472e-9835-aa91e1314fe1', '201ff179-f718-431c-924b-a5e0b7665046', 'Case', 'f4828793-28c2-465b-b783-0c697e41dafb', 'Lead'),
                                            ('8ca66af1-b9b1-452d-ac7d-1f6661f07069', '4b5d85c2-1bde-44ae-9311-efa4966e04d8', '05332fd7-4119-4fc9-b1bf-35e60a294df2', 'Task', '201ff179-f718-431c-924b-a5e0b7665046', 'Case');

INSERT INTO public.property (property_id, name, label) VALUES
                                                                    ('0af69dfa-f6a5-4c23-9779-e93b56448a7a','name','Name'),
                                                                    ('acd8ffb0-5e89-45e5-9b72-b1b31374df7b','website','Website'),
                                                                    ('066e251f-c359-45b7-b6d0-332b28168d42','emailAddress','Email'),
                                                                    ('e3193bb5-4f70-40db-9f2f-10ad5aab9288','phoneNumber','Phone'),
                                                                    ('382b0e44-12af-4a7c-b358-d675ac0e6fef','address','Address'),
                                                                    ('a53c269c-1b51-4ac9-b5f8-24ff2d04cba3','createdAt','Created At'),
                                                                    ('1c75800b-f46d-4aab-9d8c-463e5520b859','createdBy','createdBy'),
                                                                    ('39fa04ce-1bbb-4659-bdcb-b11ec0711951','description','Description'),
                                                                    ('4b264dc2-4d30-4471-99d6-57a532343858','firstName','First Name'),
                                                                    ('4f5f9cf7-4cda-4fbf-a3e7-8ad4ee710297','lastName','Last Name'),
                                                                    ('f8f09d19-c22a-420a-8065-63b4f2acc4a1','middleName','Middle Name'),
                                                                    ('f3632f6d-7f08-48c9-a009-06fa2b15d1b9','photo','Photo'),
                                                                    ('1707e9c6-af10-419d-98a0-8c33d699b398','title','Title'),
                                                                    ('f514efbb-5e45-4d1a-a2a8-1c81e86395d8','website','Website'),
                                                                    ('5f9bf7ef-05f4-4e60-90de-83d45612d420','phoneNumber','Phone'),
                                                                    ('eb553526-c166-4aee-a7b5-12a1d5de18c3','address','Address'),
                                                                    ('b8947fa9-56b8-4db5-bb81-bdda5bfca978','createdAt','Created At'),
                                                                    ('5b12b655-2605-451e-85ad-638eac7fd611','createdBy','Created By');