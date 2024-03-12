import { Button, ButtonGroup, DropDownList, Icon, Item, Panel } from '@/components/ui';
import { useState } from 'react';
import { useParams } from 'react-router-dom';

const LeadDetail = () => {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const leadId = useParams().leadId;
  return (
    <div className='flex flex-col'>
      <Panel className='flex flex-row items-center justify-between p-2'>
        <div className='flex flex-row items-center'>
          <img
            className='mx-2 h-[32px] w-[32px] rounded-sm bg-blue-500'
            src='https://momentum-enterprise-925.my.salesforce.com/img/icon/t4v35/standard/lead_120.png'
            alt=''
          />
          <div className='flex flex-col'>
            <div className=''>Lead</div>
            <div className='text-xl font-bold'>Van Quy Quang</div>
          </div>
        </div>
        <ButtonGroup>
          <Button intent='normal' zoom={false}>
            Convert
          </Button>
          <Button intent='normal' zoom={false}>
            Change owner
          </Button>

          {/* <div>
          <DropDownList align={'left'}>
            <Item title='Delete' value={''} />
          </DropDownList>
        </div> */}

          <Button intent='normal' zoom={false}>
            Edit
          </Button>

          <DropDownList
            open={isMenuOpen}
            onClose={() => {
              setMenuOpen(false);
            }}
            align='right'
            className='right-[.25rem] top-[3rem] mt-0 w-80'
            divide={false}
          >
            <Item title='New Event' />
            <Item title='Log a Call' />
            <Item title='New Task' />
            <Item title='Delete' />
          </DropDownList>
          <Button zoom={false} intent='normal' className='p-0' onClick={() => setMenuOpen(true)}>
            <Icon name='arrow_drop_down' className='text-3xl'></Icon>
          </Button>
        </ButtonGroup>
      </Panel>
    </div>
  );
};

export default LeadDetail;
