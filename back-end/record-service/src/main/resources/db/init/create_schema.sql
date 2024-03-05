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
    CONSTRAINT type_pkey PRIMARY KEY (property_id)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.property
    OWNER to postgres;

INSERT INTO public.property (property_id, type_id, name, label) VALUES
                                                                    ('0af69dfa-f6a5-4c23-9779-e93b56448a7a', '27d0c628-94c2-4650-828f-3c26e61bb692','name','Name'),
                                                                    ('acd8ffb0-5e89-45e5-9b72-b1b31374df7b', '27d0c628-94c2-4650-828f-3c26e61bb692','website','Website'),
                                                                    ('066e251f-c359-45b7-b6d0-332b28168d42', '27d0c628-94c2-4650-828f-3c26e61bb692','emailAddress','Email'),
                                                                    ('e3193bb5-4f70-40db-9f2f-10ad5aab9288', '27d0c628-94c2-4650-828f-3c26e61bb692','phoneNumber','Phone'),
                                                                    ('382b0e44-12af-4a7c-b358-d675ac0e6fef', '27d0c628-94c2-4650-828f-3c26e61bb692','address','Address'),
                                                                    ('a53c269c-1b51-4ac9-b5f8-24ff2d04cba3', '27d0c628-94c2-4650-828f-3c26e61bb692','createdAt','Created At'),
                                                                    ('1c75800b-f46d-4aab-9d8c-463e5520b859', '27d0c628-94c2-4650-828f-3c26e61bb692','createdBy','createdBy'),
                                                                    ('39fa04ce-1bbb-4659-bdcb-b11ec0711951', '27d0c628-94c2-4650-828f-3c26e61bb692','description','Description'),
                                                                    ('4b264dc2-4d30-4471-99d6-57a532343858', 'f4828793-28c2-465b-b783-0c697e41dafb','firstName','First Name'),
                                                                    ('4f5f9cf7-4cda-4fbf-a3e7-8ad4ee710297', 'f4828793-28c2-465b-b783-0c697e41dafb','lastName','Last Name'),
                                                                    ('f8f09d19-c22a-420a-8065-63b4f2acc4a1', 'f4828793-28c2-465b-b783-0c697e41dafb','middleName','Middle Name'),
                                                                    ('f3632f6d-7f08-48c9-a009-06fa2b15d1b9', 'f4828793-28c2-465b-b783-0c697e41dafb','photo','Photo'),
                                                                    ('1707e9c6-af10-419d-98a0-8c33d699b398', 'f4828793-28c2-465b-b783-0c697e41dafb','title','Title'),
                                                                    ('f514efbb-5e45-4d1a-a2a8-1c81e86395d8', 'f4828793-28c2-465b-b783-0c697e41dafb','website','Website'),
                                                                    ('5f9bf7ef-05f4-4e60-90de-83d45612d420', 'f4828793-28c2-465b-b783-0c697e41dafb','phoneNumber','Phone'),
                                                                    ('eb553526-c166-4aee-a7b5-12a1d5de18c3', 'f4828793-28c2-465b-b783-0c697e41dafb','address','Address'),
                                                                    ('b8947fa9-56b8-4db5-bb81-bdda5bfca978', 'f4828793-28c2-465b-b783-0c697e41dafb','createdAt','Created At'),
                                                                    ('5b12b655-2605-451e-85ad-638eac7fd611', 'f4828793-28c2-465b-b783-0c697e41dafb','createdBy','Created By');