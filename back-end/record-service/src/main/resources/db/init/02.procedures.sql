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