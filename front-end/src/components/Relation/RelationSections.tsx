// import { RelationResponse } from '@/type';
import useTypeRelation from '@/hooks/type-service/useTypeRelation';
import { Icon, Panel } from '../ui';
import LoadingSpinner from '../ui/Loading/LoadingSpinner';
import RelationSection from './RelationSection';
import { useParams } from 'react-router-dom';

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
  const { recordId = '' } = useParams();

  relations.forEach((relation) => {
    const typeName = relation.destination_record.type.name;
    if (!relationObjects[typeName]) {
      relationObjects[typeName] = [];
    }
    relationObjects[typeName].push(relation);
  });

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

  if (typeRelations.length === 0) {
    return (
      <Panel className='col-span-1 h-fit p-4'>
        <div className='flex items-center'>
          <div className='mr-2'>
            <Icon name='merge' className='mr-1 rounded bg-orange-400 p-0.5 text-white'></Icon>
          </div>
          <div>
            <span className='font-bold'>We found no potential duplicates of this type.</span>
          </div>
        </div>
      </Panel>
    );
  }

  return (
    <ul>
      {typeRelations.map((typeRelation) => {
        return (
          <li key={typeRelation.id}>
            <RelationSection
              title={typeRelation.destination_type_label}
              relations={relationObjects[typeRelation.destination_type.name]}
              destinationType={typeRelation.destination_type}
              recordId={recordId}
            />
          </li>
        );
      })}
    </ul>
  );
};
export default RelationSections;
