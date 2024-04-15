import { Button, ButtonGroup, DropDown, Icon, Item, Panel } from '@/components/ui';
// import { useState } from 'react';
// import { useParams } from 'react-router-dom';
import InputProperty from '@/components/RecordDetail/InputProperty';
import RelationSections from '@/components/Relation/RelationSections';
import StageSection from '@/components/Stage/StageSection';
import LoadingSpinner from '@/components/ui/Loading/LoadingSpinner';
import useRecord from '@/hooks/record-service/useRecord';
import useStages from '@/hooks/type-service/useStage';
import RecordActivity from '@/components/RecordDetail/RecordActivity';
import { Stage } from '@/type';
import { formatRecords } from '@/utils/utils';
import { useParams } from 'react-router-dom';
import recordApi from '@/api/record';

const RecordDetail = () => {
  // const [isMenuOpen, setMenuOpen] = useState(false);
  // const leadId = useParams().leadId;

  const { recordId = '', companyName = '' } = useParams();
  const { data: record, isLoading: isRecordLoading } = useRecord(companyName, recordId);
  const { data: stages, isLoading: isStagesLoading } = useStages(companyName, record?.source_record?.type.id);

  if (isRecordLoading || isStagesLoading) {
    return <LoadingSpinner />;
  }

  if (!record || !stages) {
    return null;
  }
  else {
    console.log('record', record.relations.length)
    console.log(stages)
  }

  const mapStages = stages.map((stage: Stage) => {
    return {
      id: stage.id,
      name: stage.name
    };
  });

  const currentStage = record.source_record.current_stage_id;

  const newStages = {
    stages: mapStages,
    currentStage
  };

  const [formattedRecord] = formatRecords([record.source_record]);

  // eslint-disable-next-line @typescript-eslint/ban-types
  const updateRecord = async (handleUpdate: Function) => {
    const mapRecord = {
      id: record.source_record.id,
      name: record.source_record.name,
      user_id: record.source_record.user_id,
      type: record.source_record.type,
      current_stage_id: currentStage,
      properties: record.source_record.properties
    };

    const updatedRecord = handleUpdate(mapRecord);
    const res = await recordApi.updateRecord(companyName, record.source_record.id, updatedRecord);

    return res;
  };
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
            <div className=''>{record.source_record.type.name}</div>
            <div className='text-xl font-bold'>{record.source_record.name}</div>
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
        <Panel className='col-span-1 mr-0 h-fit p-4'>
          {formattedRecord &&
            Object.keys(formattedRecord).map((key) => {
              if (key === 'id') return null;
              return <InputProperty name={key} value={formattedRecord[key]} />;
            })}
        </Panel>

        <section className='col-span-2'>
          {stages ? (
            <Panel className='order-3 col-span-2 h-fit p-4 md:order-none md:mr-0'>
              <div className='px-4'>
                <StageSection stage={newStages} updateRecord={updateRecord} />
              </div>
            </Panel>
          ) : (
            <Panel className='order-3 col-span-2 h-fit p-4 md:order-none md:mr-0'>
              <div></div>
            </Panel>
          )}
          <Panel className='order-3 col-span-2 h-fit p-4 md:order-none md:mr-0'>
            <RecordActivity />
          </Panel>
        </section>

        <section className='col-span-1'>
          {record.relations.length !== 0 && <RelationSections relations={record.relations} />}
          {record.relations.length === 0 && (
            <Panel className='col-span-1 h-fit p-4'>
            <div className='flex items-center'>
              <div className='mr-2'>
                <Icon name='merge' className='mr-1 rounded bg-orange-400 p-0.5 text-white'></Icon>
              </div>
              <div>
                <span className='font-bold'>We found no potential duplicates of this {record.source_record.type.name}.</span>
              </div>
            </div>
          </Panel>
          )}
        </section>
      </div>
    </div>
  );
};

export default RecordDetail;
