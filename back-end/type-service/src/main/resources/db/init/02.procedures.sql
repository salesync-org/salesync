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

CREATE OR REPLACE FUNCTION get_type_id(
    type_name TEXT,
    company_name TEXT
)
    RETURNS uuid
AS $$
DECLARE
    result_id uuid;
BEGIN
    EXECUTE FORMAT(
            'SELECT t.type_id FROM public.type t WHERE t.name = %L AND t.company_name = %L',
            type_name, company_name
        ) INTO result_id;

    RETURN result_id;
END;
$$ LANGUAGE plpgsql;


CREATE OR REPLACE PROCEDURE init_property(
    target_property_id uuid
)
AS $$
BEGIN
    INSERT INTO public.property_field(property_id, field_id, label,
                                      item_value, default_value,
                                      is_required) VALUES
    (target_property_id, get_id('field_id', 'field', 'Text', 'input_type')
    , 'Name', null, 'Enter Name', true),
    (target_property_id, get_id('field_id', 'field', 'Text', 'input_type')
    , 'Label', null, 'Enter Label', true),
    (target_property_id, get_id('field_id', 'field', 'TextArea', 'input_type')
    , 'Description', null, 'Help people understand the property more.', true),
    (target_property_id, get_id('field_id', 'field', 'Checkbox', 'input_type')
    , 'Required', 'false', null, true);
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE PROCEDURE add_type_property(
    target_type_id uuid,
    target_property_id uuid,
    target_name text,
    target_label text,
    target_description text,
    target_required text,
    target_sequence integer
)
AS $$
BEGIN
    INSERT INTO public.type_property(property_id, type_id, name, label, sequence, default_value)
    VALUES
    (target_property_id, target_type_id, target_name, target_label, target_sequence, '');

    INSERT INTO public.type_property_field(type_property_id, item_value, property_field_id) VALUES
    ((SELECT type_property_id FROM public.type_property tp WHERE tp.type_id = target_type_id AND tp.name = target_name), target_name, (SELECT property_field_id FROM public.property_field WHERE label = 'Name' AND property_id = target_property_id)),
    ((SELECT type_property_id FROM public.type_property tp WHERE tp.type_id = target_type_id AND tp.name = target_name), target_label, (SELECT property_field_id FROM public.property_field WHERE label = 'Label' AND property_id = target_property_id)),
    ((SELECT type_property_id FROM public.type_property tp WHERE tp.type_id = target_type_id AND tp.name = target_name), target_description, (SELECT property_field_id FROM public.property_field WHERE label = 'Description' AND property_id = target_property_id)),
    ((SELECT type_property_id FROM public.type_property tp WHERE tp.type_id = target_type_id AND tp.name = target_name), target_required, (SELECT property_field_id FROM public.property_field WHERE label = 'Required' AND property_id = target_property_id));
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION get_type_property_id(
    target_type_id uuid,
    target_name text
)
    RETURNS uuid
AS $$
DECLARE
    result_id uuid;
BEGIN
    EXECUTE FORMAT(
            'SELECT tp.type_property_id FROM public.type_property tp WHERE tp.type_id = $1::uuid AND tp.name = $2')
            using target_type_id, target_name INTO result_id;
    RETURN result_id;
END
$$ LANGUAGE plpgsql;

CREATE OR REPLACE PROCEDURE add_text_type_property_field(
    target_type_property_id uuid,
    target_max_length text,
    target_unique text,
    target_default_value text
)
AS $$
BEGIN
    INSERT INTO public.type_property_field(type_property_id, item_value, property_field_id) VALUES
    (target_type_property_id, target_max_length, (SELECT property_field_id FROM public.property_field WHERE label = 'Max Length' AND property_id = (SELECT property_id FROM public.type_property WHERE type_property_id = target_type_property_id))),
    (target_type_property_id, target_unique, (SELECT property_field_id FROM public.property_field WHERE label = 'Unique' AND property_id = (SELECT property_id FROM public.type_property WHERE type_property_id = target_type_property_id))),
    (target_type_property_id, target_default_value, (SELECT property_field_id FROM public.property_field WHERE label = 'Default Value' AND property_id = (SELECT property_id FROM public.type_property WHERE type_property_id = target_type_property_id)));
    UPDATE public.type_property SET default_value = target_default_value WHERE type_property_id = target_type_property_id;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE PROCEDURE add_text_area_type_property_field(
    target_type_property_id uuid,
    target_max_length text,
    target_default_value text
)
AS $$
BEGIN
    INSERT INTO public.type_property_field(type_property_id, item_value, property_field_id) VALUES
    (target_type_property_id, target_max_length, (SELECT property_field_id FROM public.property_field WHERE label = 'Max Length' AND property_id = (SELECT property_id FROM public.type_property WHERE type_property_id = target_type_property_id))),
    (target_type_property_id, target_default_value, (SELECT property_field_id FROM public.property_field WHERE label = 'Default Value' AND property_id = (SELECT property_id FROM public.type_property WHERE type_property_id = target_type_property_id)));
    UPDATE public.type_property SET default_value = target_default_value WHERE type_property_id = target_type_property_id;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE PROCEDURE add_number_type_property_field(
    target_type_property_id uuid,
    target_min_value text,
    target_max_value text,
    target_default_value text
)
AS $$
BEGIN
    INSERT INTO public.type_property_field(type_property_id, item_value, property_field_id) VALUES
    (target_type_property_id, target_min_value, (SELECT property_field_id FROM public.property_field WHERE label = 'Min Value' AND property_id = (SELECT property_id FROM public.type_property WHERE type_property_id = target_type_property_id))),
    (target_type_property_id, target_max_value, (SELECT property_field_id FROM public.property_field WHERE label = 'Max Value' AND property_id = (SELECT property_id FROM public.type_property WHERE type_property_id = target_type_property_id))),
    (target_type_property_id, target_default_value, (SELECT property_field_id FROM public.property_field WHERE label = 'Default Value' AND property_id = (SELECT property_id FROM public.type_property WHERE type_property_id = target_type_property_id)));
    UPDATE public.type_property SET default_value = target_default_value WHERE type_property_id = target_type_property_id;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE PROCEDURE add_date_type_property_field(
    target_type_property_id uuid,
    target_default_value text
)
AS $$
BEGIN
    INSERT INTO public.type_property_field(type_property_id, item_value, property_field_id) VALUES
    (target_type_property_id, target_default_value, (SELECT property_field_id FROM public.property_field WHERE label = 'Default Value' AND property_id = (SELECT property_id FROM public.type_property WHERE type_property_id = target_type_property_id)));
    UPDATE public.type_property SET default_value = target_default_value WHERE type_property_id = target_type_property_id;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE PROCEDURE add_datetime_type_property_field(
    target_type_property_id uuid,
    target_default_value text
)
AS $$
BEGIN
    INSERT INTO public.type_property_field(type_property_id, item_value, property_field_id) VALUES
    (target_type_property_id, target_default_value, (SELECT property_field_id FROM public.property_field WHERE label = 'Default Value' AND property_id = (SELECT property_id FROM public.type_property WHERE type_property_id = target_type_property_id)));
    UPDATE public.type_property SET default_value = target_default_value WHERE type_property_id = target_type_property_id;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE PROCEDURE add_checkbox_type_property_field(
    target_type_property_id uuid,
    target_default_value text
)
AS $$
BEGIN
    INSERT INTO public.type_property_field(type_property_id, item_value, property_field_id) VALUES
    (target_type_property_id, target_default_value, (SELECT property_field_id FROM public.property_field WHERE label = 'Default Value' AND property_id = (SELECT property_id FROM public.type_property WHERE type_property_id = target_type_property_id)));
    UPDATE public.type_property SET default_value = target_default_value WHERE type_property_id = target_type_property_id;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE PROCEDURE add_select_type_picklist_field(
    target_type_property_id uuid,
    target_values text,
    target_default_value text
)
AS $$
BEGIN
    INSERT INTO public.type_property_field(type_property_id, item_value, property_field_id) VALUES
    (target_type_property_id, target_values, (SELECT property_field_id FROM public.property_field WHERE label = 'Values (Separated by lines)' AND property_id = (SELECT property_id FROM public.type_property WHERE type_property_id = target_type_property_id))),
    (target_type_property_id, target_default_value, (SELECT property_field_id FROM public.property_field WHERE label = 'Default Value' AND property_id = (SELECT property_id FROM public.type_property WHERE type_property_id = target_type_property_id)));
    UPDATE public.type_property SET default_value = target_default_value WHERE type_property_id = target_type_property_id;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE PROCEDURE assign_template(
    set_template_id uuid,
    target_type_id uuid
)
AS $$
DECLARE
target_type_property_id uuid;
BEGIN
    UPDATE public.type SET template_id = set_template_id WHERE type_id = target_type_id;
    CALL add_type_property(target_type_id, get_id('property_id', 'property', 'Text'), 'Name', 'Name', 'Name of the record', 'true', 1);
    IF (SELECT name from public.template WHERE template_id = set_template_id) = 'Human' THEN
        CALL add_type_property(target_type_id, get_id('property_id', 'property', 'Text'), 'First Name', 'First Name', 'First Name of the person', 'true', 1);
        CALL add_type_property(target_type_id, get_id('property_id', 'property', 'Text'), 'Last Name', 'Last Name', 'Last Name of the person', 'true', 1);
        CALL add_type_property(target_type_id, get_id('property_id', 'property', 'Email'), 'Email', 'Email', 'Email of the person', 'true', 1);
        CALL add_type_property(target_type_id, get_id('property_id', 'property', 'Phone'), 'Phone', 'Phone', 'Phone of the person', 'true', 1);
        CALL add_type_property(target_type_id, get_id('property_id', 'property', 'Text'), 'Address', 'Address', 'Address of the person', 'true', 1);
        CALL add_type_property(target_type_id, get_id('property_id', 'property', 'PickList'), 'Salutation', 'Salutation', 'How should we call this person', 'false', 2);
        target_type_property_id := get_type_property_id(target_type_id, 'Salutation');
        RAISE NOTICE 'UUID FINAL TARGET: %', target_type_property_id;
        CALL add_select_type_picklist_field( target_type_property_id, 'Mr.\nMrs.\nMs.\nDr.\nProf.', 'Mr.');

    END IF;
    IF (SELECT name from public.template WHERE template_id = set_template_id) = 'Group' THEN
        CALL add_type_property(target_type_id, get_id('property_id', 'property', 'Email'), 'Email', 'Email', 'Email Address of the record', 'true', 1);
        CALL add_type_property(target_type_id, get_id('property_id', 'property', 'Phone'), 'Phone', 'Phone', 'Phone of the record or representative', 'true', 1);
        CALL add_type_property(target_type_id, get_id('property_id', 'property', 'Text'), 'Address', 'Address', 'Address of the record', 'false', 1);
        CALL add_type_property(target_type_id, get_id('property_id', 'property', 'TextArea'), 'Description', 'Description', 'Description', 'false', 1);
    END IF;
    IF (SELECT name from public.template WHERE template_id = set_template_id) = 'StageObject' THEN
        CALL add_type_property(target_type_id, get_id('property_id', 'property', 'Text'), 'Description', 'Description', 'Description', 'false', 1);
    END IF;
    IF (SELECT name from public.template WHERE template_id = set_template_id) = 'Object' THEN
        CALL add_type_property(target_type_id, get_id('property_id', 'property', 'Text'), 'Description', 'Description', 'Description', 'false', 1);
    END IF;
    IF (SELECT name from public.template WHERE template_id = set_template_id) = 'Activity' THEN
        CALL add_type_property(target_type_id, get_id('property_id', 'property', 'DateTime'), 'Start Date', 'Start Date', 'Start Date of the activity', 'true', 1);
        CALL add_type_property(target_type_id, get_id('property_id', 'property', 'DateTime'), 'End Date', 'End Date', 'End Date of the activity', 'true', 1);
        CALL add_type_property(target_type_id, get_id('property_id', 'property', 'Text'), 'Description', 'Description', 'Description', 'false', 1);
    END IF;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE PROCEDURE assign_relation(
    from_type text,
    from_type_label text,
    relation_name text,
    to_type_label text,
    to_type text,
    company_name text,
)
AS $$
DECLARE
BEGIN
    INSERT INTO public.type_relation(destination_id,
    destination_label,
    relation_id,
    source_id,
    source_type_label) VALUES
    (get_type_id(from_type, company_name), from_type_label, get_id('relation_id', 'relation', relation_name), get_type_id(to_type, company_name), to_type_label);
    INSERT INTO public.type_relation(destination_id,
    destination_label,
    relation_id,
    source_id,
    source_type_label) VALUES
    (get_type_id(to_type, company_name), to_type_label, get_id('inverse_relation_id', 'relation', relation_name), get_type_id(from_type, company_name), from_type_label);
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE PROCEDURE init_company(
    target_company_name TEXT
)
AS $$
BEGIN
   INSERT INTO public.type(name, company_name) VALUES
    ('Account', target_company_name),
    ('Campaign', target_company_name),
    ('Call', target_company_name),
    ('Case', target_company_name),
    ('Contact', target_company_name),
    ('Contract', target_company_name),
    ('Deal', target_company_name),
    ('Email', target_company_name),
    ('Event', target_company_name),
    ('Invoice', target_company_name),
    ('Lead', target_company_name),
    ('Opportunity', target_company_name),
    ('Order', target_company_name),
    ('Product', target_company_name),
    ('PriceBook', target_company_name),
    ('Quote', target_company_name),
    ('Task', target_company_name),
    ('Report', target_company_name);

   CALL assign_template(get_id('template_id', 'template', 'Group'), get_type_id('Account', target_company_name));
   CALL assign_template(get_id('template_id', 'template', 'Object'), get_type_id('Campaign', target_company_name));
   CALL assign_template(get_id('template_id', 'template', 'Activity'), get_type_id('Call', target_company_name));
   CALL assign_template(get_id('template_id', 'template', 'Object'), get_type_id('Case', target_company_name));
   CALL assign_template(get_id('template_id', 'template', 'Human'), get_type_id('Contact', target_company_name));
   CALL assign_template(get_id('template_id', 'template', 'Object'), get_type_id('Contract', target_company_name));
   CALL assign_template(get_id('template_id', 'template', 'Activity'), get_type_id('Deal', target_company_name));
   CALL assign_template(get_id('template_id', 'template', 'Activity'), get_type_id('Email', target_company_name));
   CALL assign_template(get_id('template_id', 'template', 'Activity'), get_type_id('Event', target_company_name));
   CALL assign_template(get_id('template_id', 'template', 'Object'), get_type_id('Invoice', target_company_name));
   CALL assign_template(get_id('template_id', 'template', 'StageObject'), get_type_id('Lead', target_company_name));
   CALL assign_template(get_id('template_id', 'template', 'StageObject'), get_type_id('Opportunity', target_company_name));
   CALL assign_template(get_id('template_id', 'template', 'Object'), get_type_id('Order', target_company_name));
   CALL assign_template(get_id('template_id', 'template', 'Object'), get_type_id('Product', target_company_name));
   CALL assign_template(get_id('template_id', 'template', 'Object'), get_type_id('PriceBook', target_company_name));
   CALL assign_template(get_id('template_id', 'template', 'Object'), get_type_id('Quote', target_company_name));
   CALL assign_template(get_id('template_id', 'template', 'Activity'), get_type_id('Task', target_company_name));
--    CALL assign_template(get_id('template_id', 'template', 'Object'), get_type_id('Report', target_company_name));

   CALL add_type_property(get_type_id('Lead', target_company_name), get_id('property_id', 'property', 'Text'), 'First Name', 'First Name', 'First Name of the person', 'true', 1);
   CALL add_type_property(get_type_id('Lead', target_company_name), get_id('property_id', 'property', 'Text'), 'Last Name', 'Last Name', 'Last Name of the person', 'true', 1);
   CALL add_type_property(get_type_id('Lead', target_company_name), get_id('property_id', 'property', 'Email'), 'Email', 'Email', 'Email of the person', 'true', 1);
   CALL add_type_property(get_type_id('Lead', target_company_name), get_id('property_id', 'property', 'Phone'), 'Phone', 'Phone', 'Phone of the person', 'true', 1);
   CALL add_type_property(get_type_id('Lead', target_company_name), get_id('property_id', 'property', 'Text'), 'Address', 'Address', 'Address of the person', 'true', 1);
   CALL add_type_property(get_type_id('Report', target_company_name), get_id('property_id', 'property', 'Text'), 'ReportName', 'Report Name', 'Name of the report', 'true', 1);
   CALL add_type_property(get_type_id('Report', target_company_name), get_id('property_id', 'property', 'TextArea'), 'ReportDescription', 'Description', 'More details about this report', 'true', 1);
   CALL add_type_property(get_type_id('Report', target_company_name), get_id('property_id', 'property', 'Text'), 'ReportTypeId', 'ReportTypeIdNotShowing', 'The object type of the report.', 'true', 1);
   CALL add_type_property(get_type_id('Report', target_company_name), get_id('property_id', 'property', 'Text'), 'ReportProperties', 'ReportPropertiesNotShowing', 'The properties of the report.', 'true', 1);


    CALL assign_relation('Account', 'Account', 'One-to-Many', 'Contact', 'Contact', target_company_name);
    CALL assign_relation('Account', 'Account', 'One-to-Many', 'Opportunity', 'Opportunity', target_company_name);
    CALL assign_relation('Account', 'Account', 'One-to-Many', 'Case', 'Case', target_company_name);
    CALL assign_relation('Account', 'Account', 'One-to-Many', 'Contract', 'Contract', target_company_name);
    CALL assign_relation('Account', 'Account', 'One-to-Many', 'Deal', 'Deal', target_company_name);
    CALL assign_relation('Account', 'Account', 'One-to-Many', 'Invoice', 'Invoice', target_company_name);
    CALL assign_relation('Account', 'Account', 'One-to-Many', 'Order', 'Order', target_company_name);
    CALL assign_relation('Account', 'Account', 'One-to-Many', 'Product', 'Product', target_company_name);
    CALL assign_relation('Account', 'Account', 'One-to-Many', 'Quote', 'Quote', target_company_name);
    CALL assign_relation('Account', 'Account', 'One-to-Many', 'Task', 'Task', target_company_name);
    CALL assign_relation('Account', 'Account', 'One-to-Many', 'Call', 'Call', target_company_name);
    CALL assign_relation('Account', 'Account', 'One-to-Many', 'Email', 'Email', target_company_name);
    CALL assign_relation('Account', 'Account', 'One-to-Many', 'Event', 'Event', target_company_name);
    CALL assign_relation('Contact', 'Contact', 'One-to-Many', 'Task', 'Task', target_company_name);
    CALL assign_relation('Contact', 'Contact', 'One-to-Many', 'Call', 'Call', target_company_name);
    CALL assign_relation('Contact', 'Contact', 'One-to-Many', 'Email', 'Email', target_company_name);
    CALL assign_relation('Contact', 'Contact', 'One-to-Many', 'Event', 'Event', target_company_name);
    CALL assign_relation('Lead', 'Lead', 'One-to-Many', 'Task', 'Task', target_company_name);
    CALL assign_relation('Lead', 'Lead', 'One-to-Many', 'Call', 'Call', target_company_name);
    CALL assign_relation('Lead', 'Lead', 'One-to-Many', 'Email', 'Email', target_company_name);
    CALL assign_relation('Lead', 'Lead', 'One-to-Many', 'Event', 'Event', target_company_name);
    CALL assign_relation('Opportunity', 'Opportunity', 'One-to-Many', 'Task', 'Task', target_company_name);
    CALL assign_relation('Opportunity', 'Opportunity', 'One-to-Many', 'Call', 'Call', target_company_name);
    CALL assign_relation('Opportunity', 'Opportunity', 'One-to-Many', 'Email', 'Email', target_company_name);
    CALL assign_relation('Opportunity', 'Opportunity', 'One-to-Many', 'Event', 'Event', target_company_name);
    CALL assign_relation('Contact', 'Contact', 'One-to-Many', 'Opportunity', 'Opportunity', target_company_name);


   INSERT INTO stage (name, type_id, sequence_number) VALUES
    ('Unqualified', get_type_id('Lead', target_company_name), 1),
    ('New', get_type_id('Lead', target_company_name), 2),
    ('Working', get_type_id('Lead', target_company_name), 3),
    ('Nurturing', get_type_id('Lead', target_company_name), 4),
    ('Converted', get_type_id('Lead', target_company_name), 5),
    ('Qualification', get_type_id('Opportunity', target_company_name), 2),
    ('Needs Analysis', get_type_id('Opportunity', target_company_name), 3),
    ('Proposal', get_type_id('Opportunity', target_company_name), 4),
    ('Closed Won', get_type_id('Opportunity', target_company_name), 5),
    ('Closed Lost', get_type_id('Opportunity', target_company_name), -1);
END
$$ LANGUAGE plpgsql;

