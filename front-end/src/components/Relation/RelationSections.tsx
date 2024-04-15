import { RelationResponse } from '@/type';
import RelationSection from './RelationSection';

type RelationSectionsProp = {
  relations: RelationResponse[];
};

export type RelationGroup = {
  [key: string]: RelationResponse;
};

const RelationSections = ({ relations }: RelationSectionsProp) => {
  const relationObjects: { [key: string]: RelationResponse[] } = {};

  relations.forEach((relation) => {
    const typeName = relation.destination_record.type.name;
    if (!relationObjects[typeName]) {
      relationObjects[typeName] = [];
    }
    relationObjects[typeName].push(relation);
  });

  const typeGroups = Object.keys(relationObjects);

  return (
    <ul>
      {typeGroups.map((type) => {
        return (
          <li key={type}>
            <RelationSection title={type} relations={relationObjects[type]} />
          </li>
        );
      })}
    </ul>
  );
};
export default RelationSections;
