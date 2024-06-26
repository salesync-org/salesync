/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, ButtonGroup, Icon, PrimaryButton } from '@/components/ui';
import React, { useState } from 'react';
import { cn } from 'utils/utils';
// import InputRecordRelative from './InputRecordRelative';
import recordApi from '@/api/record';
import useProperties from '@/hooks/type-service/useProperties';
import useType from '@/hooks/type-service/useType';
import { useLocation, useParams } from 'react-router-dom';
import LoadingSpinner from '../ui/Loading/LoadingSpinner';
import { useToast } from '../ui/Toast';
// import ErrorToaster from '@/pages/Error/ErrorToaster';
import RecordForm from '../Records/RecordForm';
import { useQueryClient } from 'react-query';

interface ButtonActivityProps {
  name: 'Email' | 'New Event' | 'Log a Call' | 'New Task';
  icon: string;
  color?: string;
  className?: string;
  disabled?: boolean;
  setDisabled?: (disabled: boolean) => void;
}

const ButtonActivity: React.FC<ButtonActivityProps> = ({
  icon,
  name,
  className,
  color = 'bg-neutral-400',
  disabled = false,
  setDisabled
}) => {
  const [isOpen, setIsOpen] = useState(false);
  // const [dateStart, setDateStart] = useState('');
  // const [dateEnd, setDateEnd] = useState('');

  const setType = () => {
    if (name === 'Email') return 'Email';
    if (name === 'New Event') return 'Event';
    if (name === 'Log a Call') return 'Call';
    if (name === 'New Task') return 'Task';
  };
  const queryClient = useQueryClient();
  const [typeActivity, setTypeActivity] = useState(setType()); // Email, Event, Call, Task
  const { recordId = '' } = useParams();

  // let isDisabledTriangleButton = false;
  // if (name === 'New Task') isDisabledTriangleButton = true;

  const { toast } = useToast();
  const location = useLocation();
  const companyName = location.pathname.split('/')[1] || '';
  const { types: types } = useType(companyName);

  const typeId = types?.find((type) => type.name === setType())?.id;
  const { data: typeProperty, isLoading: isPropertiesLoading } = useProperties(companyName, typeId!);

  if (!typeId) {
    return null;
  }

  const setDateTimeNow = () => {
    const now = new Date();
    const timezoneOffset = now.getTimezoneOffset();
    now.setTime(now.getTime() - timezoneOffset * 60 * 1000);
    // const formattedDateTime = now.toISOString().slice(0, 16);
    // setDateStart(formattedDateTime);
    // setDateEnd(formattedDateTime);
  };

  const handleCreateRecord = async (data: any) => {
    const req = {
      record_name: data['Name'],
      stage_id: null,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      properties: typeProperty?.properties.map((property: any) => {
        return {
          id: property.id,
          property_name: property.name,
          property_label: property.label,
          item_value: data[property.name]
        };
      })
    };

    const res = await recordApi.createRecord(companyName, typeId!, req);
    const newActivityId = res.id;
    await recordApi.createRelation(companyName, recordId, newActivityId);
    queryClient.invalidateQueries(['record', recordId]);

    toast({
      title: 'Success',
      description: 'Create activity successfully'
    });
  };

  const onSubmit = async (data: any) => {
    try {
      setIsOpen(false);

      handleCreateRecord(data);
    } catch (error) {
      console.error(error);
      toast({
        title: 'Error',
        description: 'Failed to create activity',
        variant: 'destructive'
      });
    } finally {
      setDisabled && setDisabled(false);
    }
  };

  const FORM_ID = `activity-form-${name}`;

  return (
    <div>
      <ButtonGroup className='mb-1 mr-1'>
        <Button
          onClick={() => {
            setIsOpen(true);
            setDateTimeNow();
            setDisabled && setDisabled(true);
          }}
          title={name}
          disabled={disabled} // disable button
          className={cn('first:rounded-l-md')}
        >
          <div className='flex items-center space-x-2'>
            {/* <img className={cn('aspect-square w-[1.8rem] rounded p-0.5 ', className)} src={icon} alt='Type Icon' /> */}
            <Icon
              size='1rem'
              name={icon}
              className={cn('aspect-square rounded p-[0.3rem] text-white', color, className)}
            ></Icon>
            <span className=''>{name}</span>
          </div>
        </Button>
      </ButtonGroup>

      {isPropertiesLoading && <LoadingSpinner className='mt-10' />}

      <nav
        className={cn(
          'fixed bottom-0 right-4 flex h-[500px] w-[470px] flex-col rounded',
          'bg-white shadow-2xl shadow-button-background-dark/10 transition-all duration-200 dark:bg-panel-dark',
          'border-[2px] border-button-stroke dark:border-button-stroke-dark',
          isOpen ? 'translate-y-0' : 'translate-y-[100%]',
          'z-[100]'
        )}
      >
        <div className='flex h-[40px] items-center justify-between border-b-2 border-primary-stroke px-4 dark:border-primary-stroke-dark'>
          <div className='flex items-center'>
            <Icon
              name={cn(typeActivity === 'Task' ? 'checklist' : icon)}
              className={cn('mr-1 rounded p-0.5 text-white', typeActivity === 'Task' ? 'bg-green-400' : color)}
            ></Icon>
            <h2 className='text-base font-normal leading-5'>{typeActivity === 'Task' ? 'New Task' : name}</h2>
          </div>
          <div className='flex gap-2'>
            <span title='Minimize'>
              <Icon name='minimize' size='1rem' className='m-auto block cursor-pointer hover:text-primary-color' />
            </span>
            <span title='Maximize'>
              <Icon name='pan_zoom' size='1rem' className='m-auto block cursor-pointer hover:text-primary-color' />
            </span>
            <span
              title='Close'
              onClick={() => {
                setIsOpen(false);
                setTypeActivity(setType());
                setDisabled && setDisabled(false);
              }}
            >
              <Icon name='close' size='1rem' className='m-auto block cursor-pointer hover:text-primary-color' />
            </span>
          </div>
        </div>

        <div className='flex h-[400px] overflow-y-auto'>
          <div className='grid w-full gap-1 p-4'>
            {typeProperty ? (
              <RecordForm formId={FORM_ID} typeProperty={typeProperty} onSubmit={onSubmit} className='pb-4' />
            ) : (
              <div>loading</div>
            )}
          </div>
        </div>

        <div className='absolute bottom-0 flex h-[50px] w-full items-center justify-end border border-button-stroke bg-panel pr-2 dark:border-button-stroke-dark dark:bg-panel-dark'>
          <PrimaryButton type='submit' form={FORM_ID}>
            Save
          </PrimaryButton>
        </div>
      </nav>
    </div>
  );
};

export default ButtonActivity;
