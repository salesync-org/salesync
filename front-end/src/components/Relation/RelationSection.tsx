import { Panel } from '../ui';
import ActionDropDown from '../ui/DropDown/ActionDropDown';

const RelationSection = () => {
  const createNewRelation = () => {
    console.log('Create new relation');
  };

  const actions = [
    {
      title: 'New',
      action: createNewRelation
    }
  ];
  return (
    <Panel>
      <header className='flex items-center justify-between'>
        <h2>Opportunities (2)</h2>

        <ActionDropDown actions={actions} />
      </header>
    </Panel>
  );
};
export default RelationSection;
