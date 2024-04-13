type TypeRelation = {
  id: string;
  source_type: Type;
  source_type_label: string;
  relation: Relation;
  destination_type: Type;
  destination_label: string;
};

type Type = {
  icon_url: string?;
  background_color: string?;
  type_id: string;
  name: string;
  description?: string;
  fields?: Field[];
  links?: Link[];
};

type TypeProperty = {
  id: string;
  label?: string;
  name: string;
  type?: string;
  description?: string;
  properties?: Property[];
};

type Property = {
  id: string;
  label?: string;
  name: string;
  type: string;
  options?: string[];
};

type Relation = {
  id: string;
  name: string;
};

type Field = {
  id: string;
  name: string;
  label?: string;
  defaultValue?: string;
  values?: string[];
};

type NewUser = {
  first_name: string;
  last_name: string;
  job_title: string;
  phone: string;
  email: string;
  role: string;
};

type NewUser = {
  first_name: string;
  last_name: string;
  job_title: string;
  phone: string;
  email: string;
  role: string;
};

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
  types: Type[];
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
  permission_name: string,
  permission_id: string,
  description: string
}

type Role = {
  role_name: string,
  role_id: string,
  description: string,
  permissions: Permission[]
}
