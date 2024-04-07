CREATE OR REPLACE FUNCTION get_id(
    id_field_name TEXT,
    selected_table_name TEXT,
    name_value TEXT,
    property_name TEXT DEFAULT 'name'
)
    RETURNS uuid
AS $$
DECLARE
    result_id uuid;
BEGIN
    EXECUTE FORMAT(
            'SELECT %I FROM public.%I tab WHERE tab.%I = %L',
            id_field_name, selected_table_name, property_name, name_value
        ) INTO result_id;

    RETURN result_id;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION get_property_field_id(
    property_name TEXT,
    field_name TEXT
)
    RETURNS uuid
AS $$
DECLARE
    result_id uuid;
BEGIN
    EXECUTE FORMAT(
            'SELECT property_field_id FROM public.property_field WHERE property_id = (SELECT property_id FROM public.property WHERE name = %L) AND field_id = (SELECT field_id FROM public.field WHERE input_type = %L)',
            property_name, field_name
        ) INTO result_id;


    RETURN result_id;
END;


$$ LANGUAGE plpgsql;



-- CREATE OR REPLACE PROCEDURE assign_template(
--     set_template_id uuid,
--     target_type_id uuid
-- )
-- AS $$
-- BEGIN
--     UPDATE public.type SET template_id = set_template_id WHERE type_id = target_type_id;
--     IF (SELECT name from public.template WHERE template_id = set_template_id) = 'Human' THEN
--         INSERT INTO public.type_property(property_id, type_id, default_value) VALUES
--         (get_id('property_id', 'property', 'Text'), target_type_id, 'Name'),
--         (get_id('property_id', 'property', 'Text'), target_type_id, 'Title'),
--         (get_id('property_id', 'property', 'Text'), target_type_id, 'Company'),
--         (get_id('property_id', 'property', 'PhoneNumber'), target_type_id, 'Phone'),
--         (get_id('property_id', 'property', 'EmailAddress'), target_type_id, 'Email');
--     END IF;
--     IF (SELECT name from public.template WHERE template_id = set_template_id) = 'Group' THEN
--         INSERT INTO public.type_property(property_id, type_id, default_value) VALUES
--             (get_id('property_id', 'property', 'Text'), target_type_id, 'Name'),
--             (get_id('property_id', 'property', 'Text'), target_type_id, 'Description'),
--             (get_id('property_id', 'property', 'PhoneNumber'), target_type_id, 'Phone'),
--             (get_id('property_id', 'property', 'EmailAddress'), target_type_id, 'Email');
--     END IF;
-- END;
-- $$ LANGUAGE plpgsql;