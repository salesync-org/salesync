import { useState } from 'react';
import { Button, DropDownList, Icon, Item, Panel } from '../ui';

const RelationSection = () => {
  const [isMenuOpen, setMenuOpen] = useState(false);

  return (
    <Panel>
      <header>
        <h2>Opportunities (2)</h2>
        <Button
          rounded='icon'
          className='mx-0 my-0 h-10 w-10 border-0 px-0 py-0'
          intent='link'
          onClick={() => {
            setMenuOpen(!isMenuOpen);
          }}
        >
          <Icon name='expand_more' />
        </Button>
        <DropDownList
          open={isMenuOpen}
          onClose={() => {
            setMenuOpen(false);
          }}
          className='mt-0 w-80'
          divide={false}
        >
          <Item
            className='py-0'
            title='New'
            onClick={() => {
              // navigate('/setting');
            }}
          />
          <div className='h-2' />
        </DropDownList>
      </header>
    </Panel>
  );
};
export default RelationSection;
