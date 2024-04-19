// type TypeRelation = {
//   id: string;
//   source_type: Type;
//   source_type_label: string;
//   relation: Relation;
//   destination_type: Type;
//   destination_label: string;
// };

type Type = {
  // icon_url: string?;
  // background_color: string?;
  id: string;
  name: string;
  template: string | null;
  // description?: string;
  // fields?: Field[];
};

type LayoutType = {
  name: string;
  type_id: string;
};

// type TypeProperty = {
//   id: string;
//   label?: string;
//   name: string;
//   type?: string;
//   description?: string;
//   properties?: Property[];
// };

// type Property = {
//   id: string;
//   label?: string;
//   name: string;
//   type: string;
//   options?: string[];
// };

type PropertyResponse = {
  id: string;
  name: string;
  propertyFields: PropertyField[] | null;
};

type TypeDetail = {
  id: string;
  name: string;
  template: string;
  properties: TypePropertyDetail[];
};

type TypePropertyDetail = {
  id: string;
  name: string;
  label: string;
  sequence: 1;
  property: {
    id: string;
    name: string;
    propertyFields: [];
  };
  default_value: string;
  fields: [];
};

type PropertyField = {
  id: string;
  label: string;
  item_value: string | null;
  is_required: boolean;
  default_value: string | null;
  is_key: boolean;
  field: Field | null;
};

type TypePropertyField = {
  id: string;
  name: string;
  label: string;
  type: string;
  options?: string[];
};

// type Relation = {
//   id: string;
//   name: string;
// };

type Field = {
  id: string;
  input_type: string;
  is_multiple_value: boolean;
};

type NewUser = {
  first_name: string;
  last_name: string;
  job_title: string;
  phone: string;
  email: string;
  role: string;
};

// type NewUser = {
//   first_name: string;
//   last_name: string;
//   job_title: string;
//   phone: string;
//   email: string;
//   role: string;
// };

type AdminInfo = {
  first_name: string;
  last_name: string;
  job_title: string;
  phone: string;
  email: string;
  role: string;
};

type SignUpInfo = {
  admin_info: AdminInfo;
  noEmployees: number;
  company_name: string;
  country_region: string;
};

type TokenResponse = {
  user: User;
  access_token: string;
  expires_in: number;
  refresh_expires_in: number;
  refresh_token: string;
  token_type: string;
  id_token?: string;
  'not-before-policy': number;
  session_state: string;
  scope: string;
  error?: string;
  error_description?: string;
  error_uri?: string;
};

type Stage = {
  id: string;
  name: string;
};

type User = {
  first_name: string;
  last_name: string;
  job_title: string;
  phone: string;
  email: string;
  user_id: string;
  user_name: string;
  avatar_url: string;
  settings: Settings;
  roles?: string;
};

type Settings = {
  layout_order: LayoutOrder[];
};

type LayoutOrder = {
  name: string;
  icon: string;
  types: LayoutType[];
};
// type RecordsResponse = {
//   records: RecordResponse[];
//   total_size: number;
//   page_size: number;
//   current_page: number;
// };
// type RecordResponse = {
//   id: string;
//   name: string;
//   user_id: string;
//   properties: PropertyResponse[];
// };
// type PropertyResponse = {
//   id: string;
//   type_property_id: string;
//   property_label: string;
//   item_value: string;
// };
type RecordsResponse = {
  records: RecordResponse[];
  total_size: number;
  page_size: number;
  current_page: number;
};
type RecordResponse = {
  id: string;
  name: string;
  user_id: string;
  properties: {
    id: string;
    type_property_id: string;
    property_label: string;
    item_value: string;
  }[];
};

type RelationResponse = {
  id: string;
  destination_record: DestinationRecord;
  type_relation_id: string;
};

type DestinationRecord = {
  id: string;
  name: string;
  user_id: string;
  type: RecordType;
  properties: RecordProperty[];
};

type RecordProperty = {
  id: string;
  property_name: string;
  item_value: string;
  property_label: string;
};

type RecordType = {
  id: string;
  name: string;
};
type NewPasswordChange = {
  old_password: string;
  new_password: string;
  confirm_password: string;
};

type Permission = {
  permission_name: string;
  permission_id: string;
  description: string;
};

type Role = {
  role_name: string;
  role_id: string;
  description: string;
  permissions: Permission[];
};

type TypeProperty = {
  id: string;
  name: string;
  current_stage_id?: string;
  template?: string;
  properties: PropertyElement[];
};

type PropertyElement = {
  id: string;
  property_name: string;
  property_label: string;
  sequence: number;
  property: PropertyProperty;
  default_value: string;
  fields: FieldElement[];
};

type FieldElement = {
  id: string;
  item_value: string;
  property_field: {
    id: string;
    label: Label;
    item_value: null;
    is_required: boolean;
    default_value: string;
    is_key: boolean;
    field: PropertyFieldField;
  };
};

type PropertyFieldField = {
  id: string;
  input_type: InputType;
  is_multiple_value: boolean;
};

declare enum InputType {
  Checkbox = 'Checkbox',
  NumberText = 'NumberText'
}

declare enum Label {
  Length = 'Length',
  Required = 'Required',
  Unique = 'Unique'
}

declare interface PropertyProperty {
  id: string;
  name: string;
  propertyFields: PropertyField[];
}

declare enum Template {
  Human = 'Human',
  Activity = 'Activity',
  Group = 'Group',
  StageObject = 'StageObject',
  Object = 'Object'
}

type RecordProperty = {
  id: string;
  name: string;
  user_id: string;
  type?: Type;
  current_stage_id?: string;
  properties: Property[];
};

type Property = {
  id: string;
  property_name: string;
  property_label: string;
  item_value: string;
};
