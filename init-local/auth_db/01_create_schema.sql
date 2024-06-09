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