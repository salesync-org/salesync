INSERT INTO public.record (user_id, name) VALUES
('11111111-1111-1111-1111-111111111111', 'George Washington'),
('11111111-1111-1111-1111-111111111111', 'John Adams'),
('11111111-1111-1111-1111-111111111111', 'Thomas Jefferson'),
('11111111-1111-1111-1111-111111111111', 'James Madison'),
('11111111-1111-1111-1111-111111111111', 'John Quincy Adams'),
('11111111-1111-1111-1111-111111111111', 'Andrew Jackson'),
('11111111-1111-1111-1111-111111111111', 'Martin Van Buren');

INSERT INTO public.record_type(type_id, record_id) VALUES
('11111111-1111-1111-1111-111111111111', get_id('record_id', 'record', 'George Washington')),
('22222222-2222-2222-2222-222222222222', get_id('record_id', 'record', 'John Adams')),
('11111111-1111-1111-1111-111111111111', get_id('record_id', 'record', 'Thomas Jefferson')),
('11111111-1111-1111-1111-111111111111', get_id('record_id', 'record', 'James Madison')),
('22222222-2222-2222-2222-222222222222', get_id('record_id', 'record', 'John Quincy Adams')),
('33333333-3333-3333-3333-333333333333', get_id('record_id', 'record', 'Andrew Jackson')),
('33333333-3333-3333-3333-333333333333', get_id('record_id', 'record', 'Martin Van Buren'));

INSERT INTO public.record_stage(stage_id, record_id) VALUES
('11111111-1111-1111-1111-111111111111', get_id('record_id', 'record', 'George Washington')),
('22222222-2222-2222-2222-222222222222', get_id('record_id', 'record', 'Thomas Jefferson')),
('33333333-3333-3333-3333-333333333333', get_id('record_id', 'record', 'James Madison')),
('66666666-6666-6666-6666-666666666666', get_id('record_id', 'record', 'Andrew Jackson')),
('77777777-7777-7777-7777-777777777777', get_id('record_id', 'record', 'Martin Van Buren'));

INSERT INTO public.record_type_property(record_id, type_property_id, record_type_property_label, item_value) VALUES
(get_id('record_id', 'record', 'George Washington'), '11111111-1111-1111-1111-111111111111', 'Email', 'washington@gmail.com'),
(get_id('record_id', 'record', 'George Washington'), '22222222-2222-2222-2222-222222222222', 'Title', 'Tổng thống'),
(get_id('record_id', 'record', 'George Washington'), '33333333-3333-3333-3333-333333333333', 'Company', 'New Company'),
(get_id('record_id', 'record', 'George Washington'), '44444444-4444-4444-4444-444444444444', 'Phone', '0838366772'),
(get_id('record_id', 'record', 'John Adams'), '55555555-5555-5555-5555-555555555555', 'Email', 'adam@gmail.com'),
(get_id('record_id', 'record', 'John Adams'), '66666666-6666-6666-6666-666666666666', 'Title', 'Tổng thống'),
(get_id('record_id', 'record', 'John Adams'), '77777777-7777-7777-7777-777777777777', 'Company', 'New Company'),
(get_id('record_id', 'record', 'John Adams'), '88888888-8888-8888-8888-888888888888', 'Phone', '123456789'),
(get_id('record_id', 'record', 'John Quincy Adams'), '55555555-5555-5555-5555-555555555555', 'Email', 'quincy@gmail.com'),
(get_id('record_id', 'record', 'John Quincy Adams'), '66666666-6666-6666-6666-666666666666', 'Title', 'Tổng thống Luôn'),
(get_id('record_id', 'record', 'John Quincy Adams'), '77777777-7777-7777-7777-777777777777', 'Company', 'Hoa Kỳ'),
(get_id('record_id', 'record', 'John Quincy Adams'), '88888888-8888-8888-8888-888888888888', 'Phone', '911');


