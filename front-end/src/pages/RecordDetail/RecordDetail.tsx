import { Button, ButtonGroup, DropDownList, Icon, Item, Panel } from '@/components/ui';
import { useState } from 'react';
// import { useParams } from 'react-router-dom';
import GroupProperty from '@/components/RecordDetail/GroupProperty';
import StageSection from '@/components/Stage/StageSection';
import useRecord from '@/hooks/record-service/useRecord';
import { useParams } from 'react-router-dom';
import LoadingSpinner from '@/components/ui/Loading/LoadingSpinner';

const RecordDetail = () => {
  const [isMenuOpen, setMenuOpen] = useState(false);
  // const leadId = useParams().leadId;

  const dataAbout = [
    { name: 'Name', value: 'Nguyễn Quý' },
    { name: 'Company', value: 'SaleSync' },
    { name: 'Title', value: 'Inc' },
    { name: 'Website', value: 'google.com' },
    { name: 'Description', value: 'Inc' },
    { name: 'Lead Status', value: 'Nurturing' },
    { name: 'Lead Owner', value: 'id of user' }
  ];
  const dataTouch = [
    { name: 'Phone', value: '0123456789' },
    { name: 'Email', value: 'quy@gmail.com' },
    { name: 'Address', value: 'HCM' }
  ];
  const dataSegment = [
    { name: 'No. of Employees', value: 'Trần Toàn' },
    { name: 'Annual Revenue', value: 'SaleSync' },
    { name: 'Lead Source', value: 'Inc' },
    { name: 'Industry', value: 'google.com' }
  ];
  const dataHistory = [
    { name: 'Created By', value: '' },
    { name: 'Last Modified By', value: '' }
  ];

  const { recordId = '' } = useParams();
  const { data: record, isLoading } = useRecord(recordId);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (!record) {
    return null;
  }

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

      {/* record contain  */}
      <div className='grid grid-cols-2 md:grid-cols-4'>
        <Panel className='col-span-1 mr-0 h-fit p-4'>
          <GroupProperty name='About' data={dataAbout} className='mb-4' />
          <GroupProperty name='Get in Touch' data={dataTouch} className='mb-4' />
          <GroupProperty name='Segment' data={dataSegment} className='mb-4' />
          <GroupProperty name='History' data={dataHistory} />
        </Panel>
        {Object.keys(record).includes('stage') && (
          <Panel className='order-3 col-span-2 h-fit p-4 md:order-none md:mr-0'>
            <div className='px-4'>
              <StageSection stage={record.stage} />
            </div>
          </Panel>
        )}
        <Panel className='col-span-1 h-fit p-4'>
          <div></div>
        </Panel>
      </div>
    </div>
  );
};

export default RecordDetail;
