CREATE OR REPLACE FUNCTION get_id(
    id_field_name TEXT,
    selected_table_name TEXT,
    name_value TEXT,
    property_name TEXT DEFAULT 'name'
)
    RETURNS uuid
AS
$$
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

CREATE OR REPLACE FUNCTION get_filtered_records(
    IN _user_id uuid,
    IN _name text,
    IN type_id_ref uuid,
    IN search_term text,
    IN is_asc boolean DEFAULT true
) RETURNS SETOF public.record AS
$$
BEGIN
    CREATE TEMPORARY TABLE temp_record_order
    (
        record_id  uuid PRIMARY KEY,
        sort_order integer
    ) ON COMMIT DROP;

    INSERT INTO temp_record_order (record_id, sort_order)
    SELECT rtp.record_id,
           row_number() OVER (PARTITION BY _name ORDER BY rtp.item_value)
    FROM public.record_type_property rtp
             JOIN public.record r ON rtp.record_id = r.record_id
             JOIN public.record_type rt ON rt.record_id = r.record_id
    WHERE rt.type_id = type_id_ref
      AND rtp.name = _name
	
      AND rtp.item_value LIKE ('%' || search_term || '%');
    RETURN QUERY
        SELECT r.*
        FROM public.record r
                 JOIN temp_record_order tro ON r.record_id = tro.record_id
	WHERE r.deleted = false
        ORDER BY CASE WHEN is_asc = true THEN tro.sort_order END,
                 CASE WHEN is_asc = false THEN tro.sort_order END DESC;

END;
$$
    LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION get_own_filtered_records(
    IN _user_id uuid,
    IN _name text,
    IN type_id_ref uuid,
    IN search_term text,
    IN is_asc boolean DEFAULT true
) RETURNS SETOF public.record AS
$$
BEGIN
    CREATE TEMPORARY TABLE temp_record_order
    (
        record_id  uuid PRIMARY KEY,
        sort_order integer
    ) ON COMMIT DROP;

    INSERT INTO temp_record_order (record_id, sort_order)
    SELECT rtp.record_id,
           row_number() OVER (PARTITION BY _name ORDER BY rtp.item_value)
    FROM public.record_type_property rtp
             JOIN public.record r ON rtp.record_id = r.record_id
             JOIN public.record_type rt ON rt.record_id = r.record_id
    WHERE rt.type_id = type_id_ref
      AND rtp.name = _name
      AND rtp.item_value LIKE ('%' || search_term || '%');
    RETURN QUERY
        SELECT r.*
        FROM public.record r
                 JOIN temp_record_order tro ON r.record_id = tro.record_id
        WHERE r.user_id = _user_id
	AND r.deleted = false

        ORDER BY CASE WHEN is_asc = true THEN tro.sort_order END,
                 CASE WHEN is_asc = false THEN tro.sort_order END DESC;

END;
$$
    LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION get_own_filtered_records_and_sort_by_name(
    IN _user_id uuid,
    IN type_id_ref uuid,
    IN search_term text,
    IN is_asc boolean DEFAULT true
) RETURNS SETOF public.record AS
$$
BEGIN
    RETURN QUERY
        SELECT r1.*
        FROM public.record r1
                 JOIN (SELECT DISTINCT r.*
                       FROM public.record r
                                JOIN public.record_type rt
                                     ON rt.record_id = r.record_id
                                JOIN public.record_type_property rtp
                                     ON rtp.record_id = r.record_id
                       WHERE rt.type_id = type_id_ref
                         AND rtp.item_value LIKE ('%' || search_term || '%')) r2
                      ON r1.record_id = r2.record_id
        WHERE r1.user_id = _user_id
	AND r1.deleted = false

        ORDER BY CASE WHEN is_asc = true THEN r1.name END,
                 CASE WHEN is_asc = false THEN r1.name END DESC;
END;
$$
    LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION get_filtered_records_and_sort_by_name(
    IN _user_id uuid,
    IN type_id_ref uuid,
    IN search_term text,
    IN is_asc boolean DEFAULT true
) RETURNS SETOF public.record AS
$$
BEGIN
    RETURN QUERY
        SELECT r1.*
        FROM public.record r1
                 JOIN (SELECT DISTINCT r.*
                       FROM public.record r
                                JOIN public.record_type rt
                                     ON rt.record_id = r.record_id
                                JOIN public.record_type_property rtp
                                     ON rtp.record_id = r.record_id
                       WHERE rt.type_id = type_id_ref
                         AND rtp.item_value LIKE ('%' || search_term || '%')) 
		r2 ON r1.record_id = r2.record_id AND r1.deleted = false
        ORDER BY CASE WHEN is_asc = true THEN r1.name END,
                 CASE WHEN is_asc = false THEN r1.name END DESC;
END;
$$
    LANGUAGE plpgsql;