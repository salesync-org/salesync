import { Button, DropDownList, Icon, Item } from 'components/ui';
import { useState } from 'react';

type Action = {
  title: string;
  action: () => void;
};

type ActionDropDownProps = {
  actions: Action[];
};

const ActionDropDown = ({ actions }: ActionDropDownProps) => {
  const [isMenuOpen, setMenuOpen] = useState(false);

  return (
    <Button
      zoom={false}
      intent='normal'
      className='relative grid size-8 place-content-center p-0'
      onClick={(e) => {
        e.preventDefault();
        setMenuOpen(true);
      }}
    >
      <Icon name='arrow_drop_down' className='text-3xl'></Icon>
      <DropDownList
        open={isMenuOpen}
        onClose={() => {
          setMenuOpen(false);
        }}
        align='right'
        className='right-[-50%] top-[32px] z-[9999] mt-0'
        divide={false}
      >
        {actions.map((action) => (
          <Item key={action.title} title={action.title} onClick={action.action} className='text-left' />
        ))}
      </DropDownList>
    </Button>
  );
};
export default ActionDropDown;
