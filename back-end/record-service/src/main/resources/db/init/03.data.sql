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

INSERT INTO public.record_type_property(record_id, name, record_type_property_label, item_value) VALUES
(get_id('record_id', 'record', 'George Washington'), 'email', 'Email', 'washington@gmail.com'),
(get_id('record_id', 'record', 'George Washington'), 'title', 'Title', 'Tổng thống'),
(get_id('record_id', 'record', 'George Washington'), 'company', 'Company', 'New Company'),
(get_id('record_id', 'record', 'George Washington'), 'phone', 'Phone', '0838366772'),
(get_id('record_id', 'record', 'John Adams'), 'email', 'Email', 'adam@gmail.com'),
(get_id('record_id', 'record', 'John Adams'), 'title', 'Title', 'Tổng thống'),
(get_id('record_id', 'record', 'John Adams'), 'company', 'Company', 'New Company'),
(get_id('record_id', 'record', 'John Adams'), 'phone', 'Phone', '123456789'),
(get_id('record_id', 'record', 'John Quincy Adams'), 'email', 'Email', 'quincy@gmail.com'),
(get_id('record_id', 'record', 'John Quincy Adams'), 'title', 'Title', 'Tổng thống Luôn'),
(get_id('record_id', 'record', 'John Quincy Adams'), 'company', 'Company', 'Hoa Kỳ'),
(get_id('record_id', 'record', 'John Quincy Adams'), 'phone', 'Phone', '911');


