type Type = {
  id: string;
  name: string;
  description: string;
  fields: Field[];
  links: Link[];
};

type Field = {
  id: string;
  name: string;
};

type Link = {
  id: string;
  name: string;
};
