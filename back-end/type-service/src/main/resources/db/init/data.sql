INSERT INTO public.template (name) VALUES
    ('Object'),
    ('Human'),
    ('StageObject'),
    ('Activity'),
    ('Group');


INSERT INTO public.type (name) VALUES
    ('Lead'),
    ('Opportunity'),
    ('Contact'),
    ('Account'),
    ('Task'),
    ('Event'),
    ('Deal'),
    ('Campaign'),
    ('Invoice'),
    ('Quote'),
    ('Product'),
    ('Case'),
    ('Contract');

INSERT INTO public.relation (name) VALUES
    ('One-to-Many'),
    ('Many-to-One'),
    ('Many-to-Many'),
    ('Children-to-Parent');

UPDATE public.relation SET inverse_relation_id = (SELECT relation_id FROM public.relation rl WHERE rl.name = 'One-to-Many') WHERE name = 'Many-to-One';
UPDATE public.relation SET inverse_relation_id = (SELECT relation_id FROM public.relation rl WHERE rl.name = 'Many-to-One') WHERE name = 'One-to-Many';
UPDATE public.relation SET inverse_relation_id = (SELECT relation_id FROM public.relation rl WHERE rl.name = 'Many-to-Many') WHERE name = 'Many-to-Many';

INSERT INTO public.type_relation (relation_id,
                                  source_id, source_type_label,
                                  destination_id, destination_label)
VALUES
    (get_id('relation_id', 'relation', 'One-to-Many'),
           get_id('template_id', 'type', 'Account'), 'Account',
           get_id('template_id', 'type', 'Case'), 'Case'),

    (get_id('relation_id', 'relation', 'One-to-Many'),
          get_id('template_id', 'type', 'Account'), 'Account',
          get_id('template_id', 'type', 'Contact'), 'Contact'),

    (get_id('relation_id', 'relation', 'One-to-Many'),
          get_id('template_id', 'type', 'Account'), 'Account',
          get_id('template_id', 'type', 'Opportunity'), 'Opportunity'),

    (get_id('relation_id', 'relation', 'One-to-Many'),
          get_id('template_id', 'type', 'Contact'), 'Contact',
          get_id('template_id', 'type', 'Task'), 'Task');

INSERT INTO public.property (name) VALUES
    ('Text'),
    ('Website'),
    ('EmailAddress'),
    ('PhoneNumber'),
    ('Address'),
    ('Image'),
    ('Date'),
    ('DateTime');

INSERT INTO public.field (input_type, is_multiple_value) VALUES
    ('TextArea', FALSE),
    ('Checkbox', FALSE),
    ('RadioButton', TRUE),
    ('NumberText', FALSE),
    ('DateInput', FALSE),
    ('DropDown', FALSE),
    ('DateTimeInput', FALSE);

INSERT INTO public.property_field(property_id, field_id, label,
                                  item_value, default_value,
                                  is_required, is_key) VALUES
    (get_id('property_id', 'property', 'Text'),
          get_id('field_id', 'field', 'TextArea', 'input_type'),
        'Default Value', null, '', true, true),
    (get_id('property_id', 'property', 'Text'),
          get_id('field_id', 'field', 'Checkbox', 'input_type'),
        'Is Required', null, '', true, false),
    (get_id('property_id', 'property', 'Text'),
          get_id('field_id', 'field', 'NumberText', 'input_type'),
        'Max Character', '50', '', true, true),

    (get_id('property_id', 'property', 'Date'),
        get_id('field_id', 'field', 'DateInput', 'input_type'),
        'Default Value', null, '1900-01-01', true, true),
    (get_id('property_id', 'property', 'Date'),
        get_id('field_id', 'field', 'Checkbox', 'input_type'),
        'Is Required', null, '', true, false),
    (get_id('property_id', 'property', 'Date'),
        get_id('field_id', 'field', 'DateInput', 'input_type'),
        'From', null, '1900-01-01', false, false),
    (get_id('property_id', 'property', 'Date'),
        get_id('field_id', 'field', 'DateInput', 'input_type'),
        'To', null, '2100-01-01', false, false),
    (get_id('property_id', 'property', 'Date'),
        get_id('field_id', 'field', 'DropDown', 'input_type'),
        'Date Format', 'DD-MM-YYYY', null, true, false),
    (get_id('property_id', 'property', 'Date'),
        get_id('field_id', 'field', 'DropDown', 'input_type'),
        'Date Format', 'YYYY-MM-DD', null, true, false);


CALL assign_template(get_id('template_id', 'template', 'StageObject'), get_id('type_id', 'type', 'Lead'));
CALL assign_template(get_id('template_id', 'template', 'StageObject'), get_id('type_id', 'type', 'Opportunity'));
CALL assign_template(get_id('template_id', 'template', 'Human'), get_id('type_id', 'type', 'Contact'));
CALL assign_template(get_id('template_id', 'template', 'Group'), get_id('type_id', 'type', 'Account'));
CALL assign_template(get_id('template_id', 'template', 'Activity'), get_id('type_id', 'type', 'Task'));
CALL assign_template(get_id('template_id', 'template', 'Activity'), get_id('type_id', 'type', 'Event'));
CALL assign_template(get_id('template_id', 'template', 'Activity'), get_id('type_id', 'type', 'Deal'));
CALL assign_template(get_id('template_id', 'template', 'Object'), get_id('type_id', 'type', 'Campaign'));
CALL assign_template(get_id('template_id', 'template', 'Object'), get_id('type_id', 'type', 'Invoice'));
CALL assign_template(get_id('template_id', 'template', 'Object'), get_id('type_id', 'type', 'Quote'));
CALL assign_template(get_id('template_id', 'template', 'Object'), get_id('type_id', 'type', 'Product'));
CALL assign_template(get_id('template_id', 'template', 'Object'), get_id('type_id', 'type', 'Case'));
CALL assign_template(get_id('template_id', 'template', 'Object'), get_id('type_id', 'type', 'Contract'));


