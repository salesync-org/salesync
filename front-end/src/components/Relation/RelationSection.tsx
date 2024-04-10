import { Link } from 'react-router-dom';
import { Panel } from '../ui';
import ActionDropDown from '../ui/DropDown/ActionDropDown';

const RelationSection = () => {
  const createNewRelation = () => {
    console.log('Create new relation');
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
        <h2 className='text-lg font-bold'>Opportunities (2)</h2>
        <ActionDropDown actions={actions} />
      </header>
      <section className='border px-4 py-4'>
        <ul className='space-y-4'>
          <li>
            <div className='flex items-center justify-between'>
              <Link className='text-base font-semibold text-primary-color' to={'#'}>
                opportunity 1
              </Link>

              <ActionDropDown
                actions={[
                  { title: 'Edit', action: () => editRecord('1') },
                  { title: 'Delete', action: () => deleteRecord('1') }
                ]}
              />
            </div>
            <ul>
              <li className='grid grid-cols-4'>
                <h3 className='col-span-2 text-base font-semibold lg:col-span-1'>Stage: </h3>
                <span className='text-base'>Qualify</span>
              </li>
              <li className='grid grid-cols-4'>
                <h3 className='col-span-2 text-base font-semibold lg:col-span-1'>Amount: </h3>
                <span className='text-base'></span>
              </li>
              <li className='grid grid-cols-4'>
                <h3 className='col-span-2 text-base font-semibold lg:col-span-1'>Close Date: </h3>
                <span className='text-base'>27/4/2024</span>
              </li>
            </ul>
          </li>
          <li>
            <div className='flex items-center justify-between'>
              <Link className='text-base font-semibold text-primary-color' to={'#'}>
                opportunity 1
              </Link>

              <ActionDropDown
                actions={[
                  { title: 'Edit', action: () => editRecord('1') },
                  { title: 'Delete', action: () => deleteRecord('1') }
                ]}
              />
            </div>
            <ul>
              <li className='grid grid-cols-4'>
                <h3 className='col-span-2 text-base font-semibold lg:col-span-1'>Stage: </h3>
                <span className='text-base'>Qualify</span>
              </li>
              <li className='grid grid-cols-4'>
                <h3 className='col-span-2 text-base font-semibold lg:col-span-1'>Amount: </h3>
                <span className='text-base'></span>
              </li>
              <li className='grid grid-cols-4'>
                <h3 className='col-span-2 text-base font-semibold lg:col-span-1'>Close Date: </h3>
                <span className='text-base'>27/4/2024</span>
              </li>
            </ul>
          </li>
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
