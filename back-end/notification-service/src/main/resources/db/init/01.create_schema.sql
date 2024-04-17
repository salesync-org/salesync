
GRANT ALL PRIVILEGES ON DATABASE salesync_notification_service TO notification_service;
CREATE ROLE postgres WITH LOGIN SUPERUSER PASSWORD 'strong_password';

\c salesync_notification_service;



-- Table: public.message

-- DROP TABLE IF EXISTS public.message;

CREATE TABLE IF NOT EXISTS public.message
(
    is_read boolean,
    created_at timestamp(6) without time zone,
    message_id uuid NOT NULL,
    receiver_id uuid,
    sender_id uuid,
    action character varying(255) COLLATE pg_catalog."default",
    content character varying(255) COLLATE pg_catalog."default",
    title character varying(255) COLLATE pg_catalog."default",
    url character varying(255) COLLATE pg_catalog."default",
    CONSTRAINT message_pkey PRIMARY KEY (message_id)
)

    TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.message
    OWNER to notification_service;