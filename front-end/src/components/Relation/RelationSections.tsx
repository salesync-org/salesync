// import { RelationResponse } from '@/type';
import useTypeRelation from '@/hooks/type-service/useTypeRelation';
import RelationSection from './RelationSection';
import { useParams } from 'react-router-dom';
import LoadingSpinner from '../ui/Loading/LoadingSpinner';
import { Panel } from '../ui';

type RelationSectionsProp = {
  relations: RelationResponse[];
  typeId: string;
};

export type RelationGroup = {
  [key: string]: RelationResponse;
};

const RelationSections = ({ relations, typeId }: RelationSectionsProp) => {
  const relationObjects: { [key: string]: RelationResponse[] } = {};
  const { data: typeRelations = [], isLoading } = useTypeRelation(typeId);

  relations.forEach((relation) => {
    const typeName = relation.destination_record.type.name;
    if (!relationObjects[typeName]) {
      relationObjects[typeName] = [];
    }
    relationObjects[typeName].push(relation);
  });

  const typeGroups = Object.keys(relationObjects);

  if (isLoading) {
    return (
      <Panel>
        <LoadingSpinner />;
      </Panel>
    );
  }

  if (!typeRelations) {
    return null;
  }

  return (
    <ul>
      {typeRelations.map((typeRelation) => {
        console.log({ typeRelation });
        return (
          <li key={typeRelation.id}>
            <RelationSection
              title={typeRelation.destination_type_label}
              relations={relationObjects[typeRelation.destination_type.name]}
            />
          </li>
        );
      })}
    </ul>
  );
};
export default RelationSections;
