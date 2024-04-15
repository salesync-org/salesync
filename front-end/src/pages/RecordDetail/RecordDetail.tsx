import { Button, ButtonGroup, DropDownList, Icon, Item, Panel } from '@/components/ui';
import { useState } from 'react';
// import { useParams } from 'react-router-dom';
import InputProperty from '@/components/RecordDetail/InputProperty';
import RelationSections from '@/components/Relation/RelationSections';
import StageSection from '@/components/Stage/StageSection';
import LoadingSpinner from '@/components/ui/Loading/LoadingSpinner';
import useRecord from '@/hooks/record-service/useRecord';
import useStages from '@/hooks/type-service/useStage';
import { Stage } from '@/type';
import { formatRecords } from '@/utils/utils';
import { useParams } from 'react-router-dom';
import recordApi from '@/api/record';

const RecordDetail = () => {
  const [isMenuOpen, setMenuOpen] = useState(false);
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
      <Panel className='flex flex-row items-center justify-between p-2'>
        <div className='flex flex-row items-center'>
          <img
            className='mx-2 h-[32px] w-[32px] rounded-sm bg-blue-500'
            src='https://momentum-enterprise-925.my.salesforce.com/img/icon/t4v35/standard/lead_120.png'
            alt=''
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
