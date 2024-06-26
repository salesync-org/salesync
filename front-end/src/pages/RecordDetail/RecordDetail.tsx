import { Button, ButtonGroup, DropDownList, Icon, Item, Panel } from '@/components/ui';
import { useState } from 'react';
// import { useParams } from 'react-router-dom';
import recordApi from '@/api/record';
import InputProperty from '@/components/RecordDetail/InputProperty';
import RecordActivity from '@/components/RecordDetail/RecordActivity';
import RelationSections from '@/components/Relation/RelationSections';
import StageSection from '@/components/Stage/StageSection';
import LoadingSpinner from '@/components/ui/Loading/LoadingSpinner';
import { MODAL_TYPES, useGlobalModalContext } from '@/context/GlobalModalContext';
import useRecord from '@/hooks/record-service/useRecord';
import useStages from '@/hooks/type-service/useStage';
import useAuth from '@/hooks/useAuth';
// import { LayoutOrder, Stage } from '@/type';
import { cn, formatCurrency, formatRecords } from '@/utils/utils';
import { useNavigate, useParams } from 'react-router-dom';
import { useToast } from '@/components/ui/Toast';
import { useQueryClient } from 'react-query';
import LoadingSpinnerSmall from '@/components/ui/Loading/LoadingSpinnerSmall';
const iconBaseUrl = `${import.meta.env.VITE_STORAGE_SERVICE_HOST}/system/icons`;
const customTypeIcon = `${iconBaseUrl}/salesync_custom_type.png`;

const templateLayoutClassName: Record<string, string> = {
  Activity: 'col-span-3'
};

const RecordDetail = () => {
  const { showModal, isLoading, setIsLoading } = useGlobalModalContext();
  const { user } = useAuth();
  const [isMenuOpen, setMenuOpen] = useState(false);

  const { recordId = '', companyName = '' } = useParams();
  const { data: record, isLoading: isRecordLoading } = useRecord(companyName, recordId);
  const { data: stages, isLoading: isStagesLoading } = useStages(companyName, record?.source_record?.type.id);
  const { toast } = useToast();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  if (isRecordLoading || isStagesLoading) {
    return <LoadingSpinner />;
  }

  if (!record || !stages || !user) {
    return null;
  }

  const mapStages = stages.map((stage: Stage) => {
    return {
      id: stage.id,
      name: stage.name
    };
  });

  const currentStage = record.source_record.current_stage_id;

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

  const handleDeleteClick = async () => {
    if (window.confirm(`Are you sure you want to delete the record: ${record.source_record.name}?`)) {
      try {
        await recordApi.deleteRecord(companyName, [record.source_record.id]);

        queryClient.invalidateQueries(['records']);
        navigate(`/${companyName}/section/sales/${record.source_record.type.id}`);
        toast({
          title: 'Success',
          description: 'Record deleted successfully'
        });
      } catch (error) {
        console.error(error);
        toast({
          title: 'Error',
          description: 'An error occurred while deleting the record',
          variant: 'destructive'
        });
      }
    }
  };

  const templateName = record.source_record.type.template.name ?? '';
  const templateClassName = templateLayoutClassName[templateName] ?? '';
  const shouldShowActivity = templateName !== 'Activity';

  return (
    <div className='flex flex-col'>
      <section className='pt-12'>
        <Panel className='mb-0 flex flex-row items-center justify-between p-2'>
          <div className='flex flex-row items-center'>
            <img
              className='mx-2 h-[32px] w-[32px] rounded-sm'
              src={`${iconBaseUrl}/salesync_${record.source_record.type.name.toLowerCase()}.png`}
              alt='Type Icon'
              onError={(e) => {
                e.currentTarget.src = customTypeIcon;
              }}
            />
            <div className='flex flex-col'>
              <div className=''>{record.source_record.type.name}</div>
              <div className='text-xl font-bold'>{record.source_record.name}</div>
            </div>
          </div>
          <ButtonGroup>
            <Button
              intent='normal'
              zoom={false}
              onClick={() => {
                showModal(MODAL_TYPES.CREATE_RECORD_MODAL, {
                  typeId: record.source_record.type.id,
                  currentData: { ...formattedRecord, stage: currentStage },
                  currentRecord: record.source_record
                });
              }}
            >
              Edit
            </Button>
            <Button intent='normal' zoom={false} onClick={handleDeleteClick}>
              Delete
            </Button>
            {record.source_record.type.name === 'Lead' && (
              <Button
                intent='normal'
                zoom={false}
                onClick={() => {
                  setIsLoading(true);
                  showModal(MODAL_TYPES.CONVERT_MODAL, { recordId: record.source_record.id, companyName });
                }}
              >
                <LoadingSpinnerSmall className={cn('hidden h-[1rem] w-[1rem]', isLoading && 'block')} />
                <p>Convert</p>
              </Button>
            )}
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
          <Panel className={cn('col-span-1 mr-0 h-fit p-4', templateClassName)}>
            {formattedRecord &&
              Object.keys(formattedRecord).map((key) => {
                if (key === 'id') return null;
                let value = formattedRecord[key];

                if (key === 'Amount') {
                  value = formatCurrency(+value) || '0';
                }
                return <InputProperty key={key} name={key} value={value} />;
              })}
          </Panel>
          {shouldShowActivity && (
            <section className='col-span-2'>
              {stages && stages.length > 0 && (
                <Panel className='order-3 col-span-2 h-fit p-4 md:order-none md:mr-0'>
                  <div className='px-4'>
                    <StageSection
                      stages={mapStages}
                      currentStage={currentStage}
                      updateRecord={updateRecord}
                      recordId={record.source_record.id}
                    />
                  </div>
                </Panel>
              )}
              <Panel className='order-3 col-span-2 h-fit p-4 md:order-none md:mr-0'>
                <RecordActivity relations={record.relations} />
              </Panel>
            </section>
          )}
          <section className='col-span-1'>
            <RelationSections relations={record.relations} typeId={record.source_record.type.id} />
          </section>
        </div>
      </section>
    </div>
  );
};

export default RecordDetail;
