import { Button, ButtonGroup, DropDown, Icon, Item, Panel } from '@/components/ui';
// import { useState } from 'react';
// import { useParams } from 'react-router-dom';
import GroupProperty from '@/components/RecordDetail/GroupProperty';
import StageSection from '@/components/Stage/StageSection';
import useRecord from '@/hooks/record-service/useRecord';
import { useParams } from 'react-router-dom';
import LoadingSpinner from '@/components/ui/Loading/LoadingSpinner';
import RecordActivity from '@/components/RecordDetail/RecordActivity';

const RecordDetail = () => {
  // const [isMenuOpen, setMenuOpen] = useState(false);
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
      <Panel className='mb-0 flex flex-row items-center justify-between p-2'>
        <div className='flex flex-row items-center'>
          <img
            className='mx-2 h-[32px] w-[32px] rounded-sm bg-blue-500'
            src='/src/assets/type-icon/lead_icon.png' // type = lead
            alt='icon'
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
          <Button intent='normal' zoom={false}>
            Edit
          </Button>

          <DropDown
            value=''
            defaultValue=''
            prefixIcon={<Icon name='arrow_drop_down' size='1' className='ml-1'></Icon>}
            className='m-0 p-0'
            align='right'
          >
            <Item title='New Event'></Item>
            <Item title='Log a Call'></Item>
            <Item title='New Task'></Item>
            <Item title='Delete'></Item>
          </DropDown>
        </ButtonGroup>
      </Panel>

      {/* record contain  */}
      <div className='grid grid-cols-2 md:grid-cols-4'>
        <Panel className='col-span-1 mr-0 h-fit bg-white p-4'>
          <GroupProperty name='About' data={dataAbout} className='mb-4' />
          <GroupProperty name='Get in Touch' data={dataTouch} className='mb-4' />
          <GroupProperty name='Segment' data={dataSegment} className='mb-4' />
          <GroupProperty name='History' data={dataHistory} />
        </Panel>

        <div className='col-span-2'>
          {Object.keys(record).includes('stage') && (
            <Panel className='order-3 col-span-2 h-fit bg-white p-4 md:order-none md:mr-0'>
              <div className='px-4'>
                <StageSection stage={record.stage} />
              </div>
            </Panel>
          )}
          <Panel className='h-fit bg-white p-4 md:order-none md:mr-0'>
            <RecordActivity />
          </Panel>
        </div>

        <Panel className='col-span-1 h-fit bg-white p-4'>
          <div className='flex items-center'>
            <div className='mr-2'>
              <Icon name='merge' className='mr-1 rounded bg-orange-400 p-0.5 text-white'></Icon>
            </div>
            <div>
              <span className='font-bold'>We found no potential duplicates of this Lead.</span>
            </div>
          </div>
        </Panel>
      </div>
    </div>
  );
};

export default RecordDetail;
