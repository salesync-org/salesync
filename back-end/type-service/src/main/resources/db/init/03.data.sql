INSERT INTO public.template (name) VALUES
    ('Human'),
    ('StageObject'),
    ('Object'),
    ('Activity'),
    ('Group');

INSERT INTO public.relation (name) VALUES
    ('One-to-Many'),
    ('Many-to-One'),
    ('Many-to-Many'),
    ('One-to-One');

UPDATE public.relation SET inverse_relation_id = (SELECT relation_id FROM public.relation rl WHERE rl.name = 'One-to-Many') WHERE name = 'Many-to-One';
UPDATE public.relation SET inverse_relation_id = (SELECT relation_id FROM public.relation rl WHERE rl.name = 'Many-to-One') WHERE name = 'One-to-Many';
UPDATE public.relation SET inverse_relation_id = (SELECT relation_id FROM public.relation rl WHERE rl.name = 'Many-to-Many') WHERE name = 'Many-to-Many';
UPDATE public.relation SET inverse_relation_id = (SELECT relation_id FROM public.relation rl WHERE rl.name = 'One-to-One') WHERE name = 'One-to-One';

INSERT INTO public.field (input_type, is_multiple_value) VALUES
    ('TextArea', FALSE),
    ('Radio', TRUE),
    ('Number', FALSE),
    ('Date', FALSE),
    ('DropDown', TRUE),
    ('DateTime', FALSE),
    ('Text', FALSE),
    ('Currency', FALSE),
    ('Email', FALSE),
    ('Phone', FALSE),
    ('Checkbox', TRUE);

INSERT INTO public.property (name) VALUES
    ('Checkbox'),
    ('Currency'),
    ('Date'),
    ('DateTime'),
    ('Email'),
    ('Number'),
    ('Phone'),
    ('PickList'),
    ('Text'),
    ('TextArea'),
    ('Image'),
    ('File'),
    ('URL');

CALL init_property(get_id('property_id', 'property', 'Checkbox'));
CALL init_property(get_id('property_id', 'property', 'Currency'));
CALL init_property(get_id('property_id', 'property', 'Date'));
CALL init_property(get_id('property_id', 'property', 'DateTime'));
CALL init_property(get_id('property_id', 'property', 'Email'));
CALL init_property(get_id('property_id', 'property', 'Number'));
CALL init_property(get_id('property_id', 'property', 'Phone'));
CALL init_property(get_id('property_id', 'property', 'PickList'));
CALL init_property(get_id('property_id', 'property', 'Text'));
CALL init_property(get_id('property_id', 'property', 'TextArea'));
CALL init_property(get_id('property_id', 'property', 'Image'));
CALL init_property(get_id('property_id', 'property', 'File'));
CALL init_property(get_id('property_id', 'property', 'URL'));

INSERT INTO public.property_field(property_id, field_id, label,
                                  item_value, default_value,
                                  is_required) VALUES
    (get_id('property_id', 'property', 'Checkbox'),
    get_id('field_id', 'field', 'Radio', 'input_type'),
    'Default Value', 'Checked', 'false', true),
    (get_id('property_id', 'property', 'Checkbox'),
    get_id('field_id', 'field', 'Radio', 'input_type'),
    'Default Value', 'Unchecked', 'false', true),

    (get_id('property_id', 'property', 'Currency'),
    get_id('field_id', 'field', 'Currency', 'input_type'),
    'Default Value', null, '0.00', true),

    (get_id('property_id', 'property', 'Date'),
    get_id('field_id', 'field', 'Date', 'input_type'),
    'From', null, '1900-01-01', true),
    (get_id('property_id', 'property', 'Date'),
    get_id('field_id', 'field', 'Date', 'input_type'),
    'To', null, '2100-12-12', true),
    (get_id('property_id', 'property', 'Date'),
    get_id('field_id', 'field', 'Date', 'input_type'),
    'Default', null, '', true),

    (get_id('property_id', 'property', 'DateTime'),
    get_id('field_id', 'field', 'DateTime', 'input_type'),
    'From', null, '1900-01-01', true),
    (get_id('property_id', 'property', 'DateTime'),
    get_id('field_id', 'field', 'DateTime', 'input_type'),
    'To', null, '2100-12-12', true),
    (get_id('property_id', 'property', 'DateTime'),
    get_id('field_id', 'field', 'DateTime', 'input_type'),
    'Default', null, '', true),

    (get_id('property_id', 'property', 'Email'),
    get_id('field_id', 'field', 'Email', 'input_type'),
    'Default Value', null, '', true),

    (get_id('property_id', 'property', 'Number'),
    get_id('field_id', 'field', 'Number', 'input_type'),
    'Minimum Value', null, '0', true),
    (get_id('property_id', 'property', 'Number'),
    get_id('field_id', 'field', 'Number', 'input_type'),
    'Maximum Value', null, '10000', true),
    (get_id('property_id', 'property', 'Number'),
    get_id('field_id', 'field', 'Number', 'input_type'),
    'Default Value', null, '0', true),

    (get_id('property_id', 'property', 'Phone'),
    get_id('field_id', 'field', 'Phone', 'input_type'),
    'Default Value', null, '', true),

    (get_id('property_id', 'property', 'Text'),
    get_id('field_id', 'field', 'Checkbox', 'input_type'),
    'Is Unique', null, null, true),
    (get_id('property_id', 'property', 'Text'),
    get_id('field_id', 'field', 'Number', 'input_type'),
    'Max Length', null, null, true),
    (get_id('property_id', 'property', 'Text'),
    get_id('field_id', 'field', 'Text', 'input_type'),
    'Default Value', null, null, true),

    (get_id('property_id', 'property', 'TextArea'),
    get_id('field_id', 'field', 'Number', 'input_type'),
    'Max Length', null, null, true),
    (get_id('property_id', 'property', 'TextArea'),
    get_id('field_id', 'field', 'TextArea', 'input_type'),
    'Default Value', null, null, true),

    (get_id('property_id', 'property', 'PickList'),
    get_id('field_id', 'field', 'TextArea', 'input_type'),
    'Values (Separated by lines)', null, '', true),
    (get_id('property_id', 'property', 'PickList'),
     get_id('field_id', 'field', 'Text', 'input_type'),
     'Default Value', null, 'None', true);

-- test initialize a company
-- CALL init_company('testing15_2');