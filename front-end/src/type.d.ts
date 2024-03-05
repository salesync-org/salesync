type TypeRelation = {
  id: string;
  source_type: Type;
  source_type_label: string;
  relation: Relation;
  destination_type: Type;
  destination_label: string;
};
type Type = {
  id: string;
  name: string;
  description?: string;
  fields?: Field[];
  links?: Link[];
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
};

type User = {
  id: string;
  name: string;
  email: string;
  password: string;
  role: string;
  avatar_url: string;
};

type Theme = 'light' | 'dark';
