GRANT ALL PRIVILEGES ON DATABASE salesync_authentication TO authentication;
CREATE ROLE postgres WITH LOGIN SUPERUSER PASSWORD 'strong_password';

\c salesync_authentication;

DROP TABLE IF EXISTS public.company CASCADE;
CREATE TABLE IF NOT EXISTS public.company
(
    company_id uuid NOT NULL DEFAULT gen_random_uuid(),
    name text NOT NULL,
    avatar_url text,
    address text,
    description text,
    phone text,
    tax_code text,
    CONSTRAINT pk_template PRIMARY KEY (company_id)
);


CREATE TABLE IF NOT EXISTS public.payment
(
    payment_id uuid NOT NULL DEFAULT gen_random_uuid(),
    company_id uuid NOT NULL,
    by_user uuid,
    created_date date,
    duration integer,
    amount money,
    CONSTRAINT pk_template PRIMARY KEY (payment_id),
    CONSTRAINT fk_relation_relation FOREIGN KEY (company_id)
        REFERENCES public.company (company_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
);