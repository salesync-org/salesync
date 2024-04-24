import { Link, useParams } from 'react-router-dom';
import { Panel } from '../ui';
import ActionDropDown from '../ui/DropDown/ActionDropDown';
import { MODAL_TYPES, useGlobalModalContext } from '@/context/GlobalModalContext';
// import { RelationResponse } from '@/type';

type RelationSectionProps = {
  title: string;
  relations: RelationResponse[];
  destinationType: Type;
  recordId: string;
};

const RelationSection = ({ title, relations = [], destinationType, recordId }: RelationSectionProps) => {
  const { showModal } = useGlobalModalContext();
  const { companyName } = useParams();
  const createNewRelation = () => {
    showModal(MODAL_TYPES.RELATION_MODAL, {
      recordId: recordId,
      companyName: companyName,
      typeId: destinationType.id
    });
  };

  const editRecord = (recordId: string) => {
    console.log('Edit record ', recordId);
  };

  const deleteRecord = (recordId: string) => {
    console.log('Delete record ', recordId);
  };

  const actions = [
    {
      title: 'New',
      action: createNewRelation
    }
  ];
  return (
    <Panel className='p-0'>
      <header className='flex min-h-[65px] items-center justify-between bg-slate-500/10 px-4'>
        <h2 className='text-lg font-bold'>
          {title} ({relations.length})
        </h2>
        <ActionDropDown actions={actions} />
      </header>
      <section className='border px-4 py-4'>
        <ul className='space-y-4'>
          {relations.map((relation) => (
            <li key={relation.id}>
              <div className='flex items-center justify-between'>
                <Link className='text-base font-semibold text-primary-color' to={'#'}>
                  {relation.destination_record.name}
                </Link>

                <ActionDropDown
                  actions={[
                    { title: 'Edit', action: () => editRecord(relation.destination_record.id) },
                    { title: 'Delete', action: () => deleteRecord(relation.destination_record.id) }
                  ]}
                />
              </div>
              <ul>
                {relation.destination_record.properties.map((property) => {
                  return (
                    <li className='grid grid-cols-4'>
                      <h3 className='col-span-2 text-base font-semibold lg:col-span-1'>{property.property_label}: </h3>
                      <span className='text-base'>{property.item_value}</span>
                    </li>
                  );
                })}
              </ul>
            </li>
          ))}
        </ul>
      </section>
      <footer className='grid place-content-center py-4'>
        <Link className='text-sm font-semibold text-primary' to={'#'}>
          View All
        </Link>
      </footer>
    </Panel>
  );
};
export default RelationSection;
