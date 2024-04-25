export const properties: PropertyResponse[] = [
  {
    id: '11111111-1111-1111-1111-111111111111',
    name: 'Text',
    propertyFields: [
      {
        id: '11111111-1111-1111-1111-111111111111',
        label: 'Default Value',
        item_value: null,
        is_required: true,
        default_value: '',
        is_key: true,
        field: {
          id: '11111111-1111-1111-1111-111111111111',
          input_type: 'TextArea',
          is_multiple_value: false
        }
      },
      {
        id: '22222222-2222-2222-2222-222222222222',
        label: 'Is Required',
        item_value: null,
        is_required: true,
        default_value: '',
        is_key: false,
        field: {
          id: '22222222-2222-2222-2222-222222222222',
          input_type: 'Checkbox',
          is_multiple_value: false
        }
      },
      {
        id: '33333333-3333-3333-3333-333333333333',
        label: 'Max Character',
        item_value: null,
        is_required: true,
        default_value: '50',
        is_key: true,
        field: {
          id: '33333333-3333-3333-3333-333333333333',
          input_type: 'NumberText',
          is_multiple_value: false
        }
      }
    ]
  },
  {
    id: '22222222-2222-2222-2222-222222222222',
    name: 'Website',
    propertyFields: []
  },
  {
    id: '33333333-3333-3333-3333-333333333333',
    name: 'EmailAddress',
    propertyFields: []
  },
  {
    id: '44444444-4444-4444-4444-444444444444',
    name: 'PhoneNumber',
    propertyFields: []
  },
  {
    id: '55555555-5555-5555-5555-555555555555',
    name: 'Address',
    propertyFields: []
  },
  {
    id: '66666666-6666-6666-6666-666666666666',
    name: 'Image',
    propertyFields: []
  },
  {
    id: '77777777-7777-7777-7777-777777777777',
    name: 'Date',
    propertyFields: [
      {
        id: '44444444-4444-4444-4444-444444444444',
        label: 'Default Value',
        item_value: null,
        is_required: true,
        default_value: '1900/01/01',
        is_key: true,
        field: {
          id: '44444444-4444-4444-4444-444444444444',
          input_type: 'DateInput',
          is_multiple_value: false
        }
      },
      {
        id: '55555555-5555-5555-5555-555555555555',
        label: 'Is Required',
        item_value: null,
        is_required: true,
        default_value: '',
        is_key: false,
        field: {
          id: '22222222-2222-2222-2222-222222222222',
          input_type: 'Checkbox',
          is_multiple_value: false
        }
      },
      {
        id: '66666666-6666-6666-6666-666666666666',
        label: 'From',
        item_value: null,
        is_required: false,
        default_value: '1900/01/01',
        is_key: false,
        field: {
          id: '44444444-4444-4444-4444-444444444444',
          input_type: 'DateInput',
          is_multiple_value: false
        }
      },
      {
        id: '77777777-7777-7777-7777-777777777777',
        label: 'To',
        item_value: null,
        is_required: false,
        default_value: '2100-01-01',
        is_key: false,
        field: {
          id: '44444444-4444-4444-4444-444444444444',
          input_type: 'DateInput',
          is_multiple_value: false
        }
      },
      {
        id: '88888888-8888-8888-8888-888888888888',
        label: 'Date Format',
        item_value: 'DD-MM-YYYY',
        is_required: true,
        default_value: null,
        is_key: false,
        field: {
          id: '55555555-5555-5555-5555-555555555555',
          input_type: 'DropDown',
          is_multiple_value: false
        }
      },
      {
        id: '99999999-9999-9999-9999-999999999999',
        label: 'Date Format',
        item_value: 'YYYY-MM-DD',
        is_required: true,
        default_value: null,
        is_key: false,
        field: {
          id: '55555555-5555-5555-5555-555555555555',
          input_type: 'DropDown',
          is_multiple_value: false
        }
      }
    ]
  },
  {
    id: '88888888-8888-8888-8888-888888888888',
    name: 'DateTime',
    propertyFields: [
      {
        id: '77777777-7777-7777-7777-777777777777',
        label: 'Are You Okay',
        item_value: 'Yes',
        is_required: false,
        default_value: null,
        is_key: false,
        field: {
          id: '44444444-4444-4444-4444-444444444444',
          input_type: 'RadioButton',
          is_multiple_value: true
        }
      },
      {
        id: '88888888-8888-8888-8888-888888888888',
        label: 'Are You Okay',
        item_value: 'No',
        is_required: true,
        default_value: null,
        is_key: false,
        field: {
          id: '55555555-5555-5555-5555-555555555555',
          input_type: 'RadioButton',
          is_multiple_value: true
        }
      }
    ]
  }
];
