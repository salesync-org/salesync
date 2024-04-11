import { Button, ButtonGroup, DropDownList, Icon, Item, Panel } from '@/components/ui';
import { useState } from 'react';
// import { useParams } from 'react-router-dom';
import GroupProperty from '@/components/RecordDetail/GroupProperty';
import StageSection from '@/components/Stage/StageSection';
import useRecord from '@/hooks/record-service/useRecord';
import { useParams } from 'react-router-dom';
import LoadingSpinner from '@/components/ui/Loading/LoadingSpinner';
import RelationSection from '@/components/Relation/RelationSection';
import RelationSections from '@/components/Relation/RelationSections';

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

  // const { recordId = '', companyName = '' } = useParams();
  // const { data: record, isLoading } = useRecord(companyName, recordId);
  const record = {
    source_record: {
      id: '126070e4-f627-4893-874f-a3f73ec2df91',
      name: 'George Washington',
      user_id: '11111111-1111-1111-1111-111111111111',
      type: {
        id: '11111111-1111-1111-1111-111111111111',
        name: 'Lead'
      },
      properties: [
        {
          id: '97a20d54-1991-450f-9a55-8986fe236064',
          property_name: 'email',
          property_label: 'Email',
          item_value: 'washington@gmail.com'
        },
        {
          id: 'a7b01e52-af16-453a-a9df-3e01881f7e9e',
          property_name: 'title',
          property_label: 'Title',
          item_value: 'Tổng thống'
        },
        {
          id: 'a2be5544-d6d5-49fa-a29a-84b1b305a8a2',
          property_name: 'company',
          property_label: 'Company',
          item_value: 'New Company'
        },
        {
          id: 'e7cab162-00d3-4fa2-b134-f331da1a16a6',
          property_name: 'phone',
          property_label: 'Phone',
          item_value: '0838366772'
        }
      ]
    },
    relations: [
      {
        id: 'ee12b3ac-97c5-49c8-9d7c-99ba3a2dfedb',
        destination_record: {
          id: '1f038256-8646-429c-b905-1fb517dabd1c',
          name: 'Andrew Jackson',
          user_id: '11111111-1111-1111-1111-111111111111',
          type: {
            id: '33333333-3333-3333-3333-333333333333',
            name: 'Opportunity'
          },
          properties: [
            {
              id: '97a20d54-1991-450f-9a55-8986fe236064',
              property_name: 'email',
              property_label: 'Email',
              item_value: 'washington@gmail.com'
            },
            {
              id: 'a7b01e52-af16-453a-a9df-3e01881f7e9e',
              property_name: 'title',
              property_label: 'Title',
              item_value: 'Tổng thống'
            },
            {
              id: 'a2be5544-d6d5-49fa-a29a-84b1b305a8a2',
              property_name: 'company',
              property_label: 'Company',
              item_value: 'New Company'
            },
            {
              id: 'e7cab162-00d3-4fa2-b134-f331da1a16a6',
              property_name: 'phone',
              property_label: 'Phone',
              item_value: '0838366772'
            }
          ]
        },
        type_relation_id: '1f038256-8646-429c-b905-1fb517dabd1c'
      },
      {
        id: 'ee12b3ac-97c5-49c8-9d7c-99ba3a2dfede',
        destination_record: {
          id: '1f038256-8646-429c-b905-1fb517dabd1c',
          name: 'Andrew Jackson',
          user_id: '11111111-1111-1111-1111-111111111111',
          type: {
            id: '33333333-3333-3333-3333-333333333333',
            name: 'Opportunity'
          },
          properties: [
            {
              id: '97a20d54-1991-450f-9a55-8986fe236064',
              property_name: 'email',
              property_label: 'Email',
              item_value: 'washington@gmail.com'
            },
            {
              id: 'a7b01e52-af16-453a-a9df-3e01881f7e9e',
              property_name: 'title',
              property_label: 'Title',
              item_value: 'Tổng thống'
            },
            {
              id: 'a2be5544-d6d5-49fa-a29a-84b1b305a8a2',
              property_name: 'company',
              property_label: 'Company',
              item_value: 'New Company'
            }
          ]
        },
        type_relation_id: '1f038256-8646-429c-b905-1fb517dabd1c'
      },
      {
        id: '2789e1e6-aa09-41c1-96bf-f7953157890a',
        destination_record: {
          id: '2aa45334-0528-45c1-9815-ac26e2b32d81',
          name: 'Thomas Jefferson',
          user_id: '11111111-1111-1111-1111-111111111111',
          type: {
            id: '11111111-1111-1111-1111-111111111111',
            name: 'Lead'
          },
          properties: [
            {
              id: '97a20d54-1991-450f-9a55-8986fe236064',
              property_name: 'email',
              property_label: 'Email',
              item_value: 'washington@gmail.com'
            },
            {
              id: 'a7b01e52-af16-453a-a9df-3e01881f7e9e',
              property_name: 'title',
              property_label: 'Title',
              item_value: 'Tổng thống'
            }
          ]
        },
        type_relation_id: '1f038256-8646-429c-b905-1fb517dabd1c'
      },
      {
        id: '0c40c6de-b89a-4ab4-98fe-f088ff9fcaa9',
        destination_record: {
          id: '585522b5-2204-47fd-a1c5-7ae7bd108ced',
          name: 'John Adams',
          user_id: '11111111-1111-1111-1111-111111111111',
          type: {
            id: '22222222-2222-2222-2222-222222222222',
            name: 'Contact'
          },
          properties: [
            {
              id: '791945d2-54bf-4379-bc85-1f4c75db0e77',
              property_name: 'email',
              property_label: 'Email',
              item_value: 'adam@gmail.com'
            }
          ]
        },
        type_relation_id: '1f038256-8646-429c-b905-1fb517dabd1c'
      },
      {
        id: 'a777efa4-7a56-4aa8-98ec-28f5061708e7',
        destination_record: {
          id: '1f038256-8646-429c-b905-1fb517dabd1c',
          name: 'Andrew Jackson',
          user_id: '11111111-1111-1111-1111-111111111111',
          type: {
            id: '33333333-3333-3333-3333-333333333333',
            name: 'Opportunity'
          },
          properties: []
        },
        type_relation_id: '1f038256-8646-429c-b905-1fb517dabd1c'
      }
    ]
  };

  // if (isLoading) {
  //   return <LoadingSpinner />;
  // }

  if (!record) {
    return null;
  }

  // console.log(record);

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
      <div className='grid grid-cols-4 md:grid-cols-4'>
        <Panel className='col-span-1 mr-0 h-fit p-4'>
          <GroupProperty name='About' data={dataAbout} className='mb-4' />
          <GroupProperty name='Get in Touch' data={dataTouch} className='mb-4' />
          <GroupProperty name='Segment' data={dataSegment} className='mb-4' />
          <GroupProperty name='History' data={dataHistory} />
        </Panel>

        <section className='col-span-2'>
          {/* {Object.keys(record).includes('stage') ? (
            <Panel className='order-3 col-span-2 h-fit p-4 md:order-none md:mr-0'>
              <div className='px-4'>
                <StageSection stage={record.stage} />
              </div>
            </Panel>
          ) : (
            <Panel className='order-3 col-span-2 h-fit p-4 md:order-none md:mr-0'>
              <div></div>
            </Panel>
          )} */}
          <Panel className='order-3 col-span-2 h-fit p-4 md:order-none md:mr-0'>
            <div></div>
          </Panel>
        </section>

        <section className='col-span-1'>
          <RelationSections relations={record.relations} />
        </section>
      </div>
    </div>
  );
};

export default RecordDetail;
