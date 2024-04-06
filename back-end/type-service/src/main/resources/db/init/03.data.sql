INSERT INTO public.template (name) VALUES
    ('Object'),
    ('Human'),
    ('StageObject'),
    ('Activity'),
    ('Group');


INSERT INTO public.type (name) VALUES
--     ('Lead'),
--     ('Opportunity'),
--     ('Contact'),
--     ('Account'),
    ('Task'),
    ('Event'),
    ('Deal'),
    ('Campaign'),
    ('Invoice'),
    ('Quote'),
    ('Product'),
    ('Case'),
    ('Contract');

INSERT INTO public.type (type_id, name) VALUES
('11111111-1111-1111-1111-111111111111', 'Lead'),
('22222222-2222-2222-2222-222222222222', 'Contact'),
('33333333-3333-3333-3333-333333333333', 'Opportunity'),
('44444444-4444-4444-4444-444444444444', 'Account');

INSERT INTO public.relation (name) VALUES
    ('One-to-Many'),
    ('Many-to-One'),
    ('Many-to-Many'),
    ('Children-to-Parent');

UPDATE public.relation SET inverse_relation_id = (SELECT relation_id FROM public.relation rl WHERE rl.name = 'One-to-Many') WHERE name = 'Many-to-One';
UPDATE public.relation SET inverse_relation_id = (SELECT relation_id FROM public.relation rl WHERE rl.name = 'Many-to-One') WHERE name = 'One-to-Many';
UPDATE public.relation SET inverse_relation_id = (SELECT relation_id FROM public.relation rl WHERE rl.name = 'Many-to-Many') WHERE name = 'Many-to-Many';

INSERT INTO public.type_relation (type_relation_id, relation_id,
                                  source_id, source_type_label,
                                  destination_id, destination_label) VALUES
    ('11111111-1111-1111-1111-111111111111',
    get_id('relation_id', 'relation', 'One-to-Many'),
    get_id('template_id', 'type', 'Account'), 'Account',
    get_id('template_id', 'type', 'Case'), 'Case'),

    ('22222222-2222-2222-2222-222222222222',
     get_id('relation_id', 'relation', 'One-to-Many'),
     get_id('template_id', 'type', 'Account'), 'Account',
     get_id('template_id', 'type', 'Contact'), 'Contact'),

    ('33333333-3333-3333-3333-333333333333',
    get_id('relation_id', 'relation', 'One-to-Many'),
    get_id('template_id', 'type', 'Account'), 'Account',
    get_id('template_id', 'type', 'Opportunity'), 'Opportunity'),

    ('44444444-4444-4444-4444-444444444444',
    get_id('relation_id', 'relation', 'One-to-Many'),
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
    ('DateTimeInput', FALSE),
    ('Label', FALSE);

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
--     text-label for type
    (get_id('property_id', 'property', 'Text'),
     get_id('field_id', 'field', 'Label', 'input_type'),
     'Text Label', null, '', true, true),


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
        'Date Format', 'YYYY-MM-DD', null, true, false),
-- type label for date
    (get_id('property_id', 'property', 'Date'),
        get_id('field_id', 'field', 'Label', 'input_type'),
        'Date Label', null, '', true, true);


INSERT INTO public.type_property_field(type_id, property_field_id,name,item_value) VALUES
   (get_id('type_id', 'type', 'Lead'),
    get_property_field_id('Text', 'TextArea'),'my_address','Nguyen Van Cu'),

   (get_id('type_id', 'type', 'Lead'),
    get_property_field_id('Text', 'Checkbox'),'my_address','true'),

   (get_id('type_id', 'type', 'Lead'),
    get_property_field_id('Text', 'NumberText'),'my_address','50'),


    (get_id('type_id', 'type', 'Lead'),
    get_property_field_id('Text', 'Label'),
     'my_address', 'My Address')
   ;





-- -- CALL assign_template(get_id('template_id', 'template', 'StageObject'), get_id('type_id', 'type', 'Lead'));
-- CALL assign_template(get_id('template_id', 'template', 'StageObject'), get_id('type_id', 'type', 'Opportunity'));
-- -- CALL assign_template(get_id('template_id', 'template', 'Human'), get_id('type_id', 'type', 'Contact'));
-- CALL assign_template(get_id('template_id', 'template', 'Group'), get_id('type_id', 'type', 'Account'));
-- CALL assign_template(get_id('template_id', 'template', 'Activity'), get_id('type_id', 'type', 'Task'));
-- CALL assign_template(get_id('template_id', 'template', 'Activity'), get_id('type_id', 'type', 'Event'));
-- CALL assign_template(get_id('template_id', 'template', 'Activity'), get_id('type_id', 'type', 'Deal'));
-- CALL assign_template(get_id('template_id', 'template', 'Object'), get_id('type_id', 'type', 'Campaign'));
-- CALL assign_template(get_id('template_id', 'template', 'Object'), get_id('type_id', 'type', 'Invoice'));
-- CALL assign_template(get_id('template_id', 'template', 'Object'), get_id('type_id', 'type', 'Quote'));
-- CALL assign_template(get_id('template_id', 'template', 'Object'), get_id('type_id', 'type', 'Product'));
-- CALL assign_template(get_id('template_id', 'template', 'Object'), get_id('type_id', 'type', 'Case'));
-- CALL assign_template(get_id('template_id', 'template', 'Object'), get_id('type_id', 'type', 'Contract'));
--


INSERT INTO stage (stage_id, name, type_id) VALUES
    ('11111111-1111-1111-1111-111111111111', 'LeadStage1', get_id('type_id', 'type', 'Lead')),
    ('22222222-2222-2222-2222-222222222222', 'LeadStage2', get_id('type_id', 'type', 'Lead')),
    ('33333333-3333-3333-3333-333333333333', 'LeadStage3', get_id('type_id', 'type', 'Lead')),
    ('44444444-4444-4444-4444-444444444444', 'LeadStage4', get_id('type_id', 'type', 'Lead')),
    ('55555555-5555-5555-5555-555555555555', 'OpportunityStage1', get_id('type_id', 'type', 'Opportunity')),
    ('66666666-6666-6666-6666-666666666666', 'OpportunityStage2', get_id('type_id', 'type', 'Opportunity')),
    ('77777777-7777-7777-7777-777777777777', 'OpportunityStage3', get_id('type_id', 'type', 'Opportunity')),
    ('88888888-8888-8888-8888-888888888888', 'OpportunityStage4', get_id('type_id', 'type', 'Opportunity'));

