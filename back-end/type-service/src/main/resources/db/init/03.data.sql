INSERT INTO public.template (name) VALUES
    ('Object'),
    ('Human'),
    ('StageObject'),
    ('Activity'),
    ('Group');


INSERT INTO public.type (name) VALUES

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

INSERT INTO public.property (property_id,name) VALUES
    ('11111111-1111-1111-1111-111111111111','Text'),
    ('11111111-1111-1111-1111-111111111112','TextArea'),
    ('11111111-1111-1111-1111-111111111113','Number'),

    ('11111111-1111-1111-1111-111111111114','Checkbox'),

    ('22222222-2222-2222-2222-222222222222','URL'),
    ('33333333-3333-3333-3333-333333333333','Email'),
    ('44444444-4444-4444-4444-444444444444','Phone'),
    ('55555555-5555-5555-5555-555555555555','Geolocation'),

    --     ??
    ('66666666-6666-6666-6666-666666666666','Image'),
    ('77777777-7777-7777-7777-777777777777','Date'),
    ('88888888-8888-8888-8888-888888888888','DateTime'),
    ('99999999-9999-9999-9999-999999999999','PickList');

INSERT INTO public.field (field_id,input_type, is_multiple_value) VALUES

    ('11111111-1111-1111-1111-111111111111', 'TextArea', FALSE),
    ('22222222-2222-2222-2222-222222222222', 'Checkbox', FALSE),
    ('33333333-3333-3333-3333-333333333333', 'NumberText', FALSE),
    ('44444444-4444-4444-4444-444444444444', 'DateInput', FALSE),
    ('55555555-5555-5555-5555-555555555555', 'DropDown', FALSE),
    ('66666666-6666-6666-6666-666666666666', 'DateTimeInput', FALSE),
    ('77777777-7777-7777-7777-777777777777', 'Text', TRUE),
    ('88888888-8888-8888-8888-888888888888', 'CheckBox', TRUE);

INSERT INTO public.property_field(property_field_id,property_id, field_id, label,
                                  item_value, default_value,
                                  is_required, is_key) VALUES


    (
     '11111111-1111-1111-1111-111111111112'
     ,get_id('property_id', 'property', 'Text'),
          get_id('field_id', 'field', 'Checkbox', 'input_type'),
        'Required', null, 'false', true, false),
    (
     '11111111-1111-1111-1111-111111111113'
     ,get_id('property_id', 'property', 'Text'),
          get_id('field_id', 'field', 'NumberText', 'input_type'),
        'Length', null, '255', true, true),
    (
        '11111111-1111-1111-1111-111111111114'
        ,get_id('property_id', 'property', 'Text'),
        get_id('field_id', 'field', 'Checkbox', 'input_type'),
        'Unique', null, 'false', true, true),


    (
        '22222222-2222-2222-2222-222222222222'
        ,get_id('property_id', 'property', 'TextArea'),
        get_id('field_id', 'field', 'Checkbox', 'input_type'),
        'Required', null, 'false', true, false),
    (
        '22222222-2222-2222-2222-222222222223'
        ,get_id('property_id', 'property', 'TextArea'),
        get_id('field_id', 'field', 'NumberText', 'input_type'),
        'Length', null, '255', true, true),
    (
        '22222222-2222-2222-2222-222222222224'
        ,get_id('property_id', 'property', 'TextArea'),
        get_id('field_id', 'field', 'Checkbox', 'input_type'),
        'Unique', null, 'false', true, true),


    (
        '33333333-3333-3333-3333-333333333332'
        ,get_id('property_id', 'property', 'Number'),
        get_id('field_id', 'field', 'Checkbox', 'input_type'),
        'Required', null, 'false', true, false),
    (
        '33333333-3333-3333-3333-333333333333'
        ,get_id('property_id', 'property', 'Number'),
        get_id('field_id', 'field', 'NumberText', 'input_type'),
        'Length', null, '18', true, true),
    (
        '33333333-3333-3333-3333-333333333334'
        ,get_id('property_id', 'property', 'Number'),
        get_id('field_id', 'field', 'Checkbox', 'input_type'),
        'Unique', null, 'false', true, true),


    --Checkbox



    (
        '55555555-5555-5555-5555-555555555552'
        ,get_id('property_id', 'property', 'URL'),
        get_id('field_id', 'field', 'Checkbox', 'input_type'),
        'Required', null, 'false', true, false),



    (
        '66666666-6666-6666-6666-666666666662'
        ,get_id('property_id', 'property', 'Email'),
        get_id('field_id', 'field', 'Checkbox', 'input_type'),
        'Required', null, 'false', true, false),
    (
        '66666666-6666-6666-6666-666666666663'
        ,get_id('property_id', 'property', 'Email'),
        get_id('field_id', 'field', 'Checkbox', 'input_type'),
        'Unique', null, 'false', true, false),

   (
        '77777777-7777-7777-7777-777777777772'
        ,get_id('property_id', 'property', 'Phone'),
        get_id('field_id', 'field', 'Checkbox', 'input_type'),
        'Required', null, 'false', true, false),


    (
       '11111111-1111-1111-1111-111111111121'
        ,get_id('property_id', 'property', 'Date'),
        get_id('field_id', 'field', 'Checkbox', 'input_type'),
        'Required', null, 'false', true, false),
    (
        '11111111-1111-1111-1111-111111111122'
        ,get_id('property_id', 'property', 'Date'),
        get_id('field_id', 'field', 'Checkbox', 'input_type'),
        'Default value', null, '', true, false),



    (
        '11111111-1111-1111-1111-111111111131'
        ,get_id('property_id', 'property', 'DateTime'),
        get_id('field_id', 'field', 'Checkbox', 'input_type'),
        'Required', null, 'false', true, false),
    (
        '11111111-1111-1111-1111-111111111132'
        ,get_id('property_id', 'property', 'DateTime'),
        get_id('field_id', 'field', 'Checkbox', 'input_type'),
        'Default value', null, '', true, false),


    (
         '11111111-1111-1111-1111-111111111141',
        get_id('property_id', 'property', 'PickList'),
         get_id('field_id', 'field', 'Text', 'input_type'),
         'Default Value', null, '', true, true),
    (
        '11111111-1111-1111-1111-111111111142'
        ,get_id('property_id', 'property', 'PickList'),
        get_id('field_id', 'field', 'Checkbox', 'input_type'),
        'Required', null, 'false', true, false),
    (
        '11111111-1111-1111-1111-111111111143'
        ,get_id('property_id', 'property', 'PickList'),
        get_id('field_id', 'field', 'Text', 'input_type'),
        'Values', null, '', true, true);

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

INSERT INTO public.type_property(type_property_id, property_id, type_id, name, label, default_value, sequence) VALUES
    ('11111111-1111-1111-1111-111111111111', get_id('property_id', 'property', 'Text'), '11111111-1111-1111-1111-111111111111', 'Name', 'Lead Name','No Name', 1),
    ('22222222-2222-2222-2222-222222222222', get_id('property_id', 'property', 'Text'), '11111111-1111-1111-1111-111111111111', 'Title', 'Title','No Title', 2),
    ('33333333-3333-3333-3333-333333333333',get_id('property_id', 'property', 'Text'), '11111111-1111-1111-1111-111111111111', 'Company', 'Company','No Company', 3),
    ('44444444-4444-4444-4444-444444444444', get_id('property_id', 'property', 'Phone'), '11111111-1111-1111-1111-111111111111', 'Phone', 'Phone','No Phone', 4)
--     ('55555555-5555-5555-5555-555555555555', get_id('property_id', 'property', 'Text'), '22222222-2222-2222-2222-222222222222', 'Email', 'Email','NoEmail', 1),
--     ('66666666-6666-6666-6666-666666666666', get_id('property_id', 'property', 'Text'), '22222222-2222-2222-2222-222222222222', 'Title', 'Title','NoTitle', 2),
--     ('77777777-7777-7777-7777-777777777777',get_id('property_id', 'property', 'Text'), '22222222-2222-2222-2222-222222222222', 'Company', 'Company','NoCompany', 3),
--     ('88888888-8888-8888-8888-888888888888', get_id('property_id', 'property', 'Phone'), '22222222-2222-2222-2222-222222222222', 'Phone', 'Phone','NoPhone', 4)
    ;

INSERT INTO stage (stage_id, name, type_id, sequence_number) VALUES
    ('11111111-1111-1111-1111-111111111111', 'LeadStage1', get_id('type_id', 'type', 'Lead'), 1),
    ('22222222-2222-2222-2222-222222222222', 'LeadStage2', get_id('type_id', 'type', 'Lead'), 2),
    ('33333333-3333-3333-3333-333333333333', 'LeadStage3', get_id('type_id', 'type', 'Lead'), 3),
    ('44444444-4444-4444-4444-444444444444', 'LeadStage4', get_id('type_id', 'type', 'Lead'), 4),
    ('55555555-5555-5555-5555-555555555555', 'OpportunityStage1', get_id('type_id', 'type', 'Opportunity'), 1),
    ('66666666-6666-6666-6666-666666666666', 'OpportunityStage2', get_id('type_id', 'type', 'Opportunity'), 2),
    ('77777777-7777-7777-7777-777777777777', 'OpportunityStage3', get_id('type_id', 'type', 'Opportunity'), 3),
    ('88888888-8888-8888-8888-888888888888', 'OpportunityStage4', get_id('type_id', 'type', 'Opportunity'), 4);


INSERT INTO public.type_property_field
    (type_property_id,property_field_id, item_value)
VALUES
    --text

    ('11111111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111112', 'false'),
    ('11111111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111113', '255'),
    ('11111111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111114', 'false'),


    ('22222222-2222-2222-2222-222222222222', '11111111-1111-1111-1111-111111111112', 'false'),
    ('22222222-2222-2222-2222-222222222222', '11111111-1111-1111-1111-111111111113', '255'),
    ('22222222-2222-2222-2222-222222222222', '11111111-1111-1111-1111-111111111114', 'false'),


    ('33333333-3333-3333-3333-333333333333', '11111111-1111-1111-1111-111111111112', 'false'),
    ('33333333-3333-3333-3333-333333333333', '11111111-1111-1111-1111-111111111113', '255'),
    ('33333333-3333-3333-3333-333333333333', '11111111-1111-1111-1111-111111111114', 'false'),

    ('44444444-4444-4444-4444-444444444444', '77777777-7777-7777-7777-777777777772', 'false')


;