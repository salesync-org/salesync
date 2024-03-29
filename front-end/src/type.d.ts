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
  id: string;
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

type User = {
  id: string;
  name: string;
  email: string;
  password: string;
  role: string;
  avatar_url: string;
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
