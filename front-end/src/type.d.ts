type TypeRelation = {
  id: string;
  type1Id: string;
  type1Name: string;
  type1Label: string;
  relationId: string;
  relationName: string;
  type2Id: string;
  type2Name: string;
  type2Label: string;
};
type Type = {
  id: string;
  name: string;
  description: string;
  fields: Field[]?;
  links: Link[]?;
};

type Field = {
  id: string;
  name: string;
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