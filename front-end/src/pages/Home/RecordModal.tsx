import {
  Button,
  DropDown,
  DropDownItem,
  Item,
  Modal,
  ModalFooter,
  Panel,
  PrimaryButton,
  TextInput
} from '@/components/ui';
import LoadingSpinner from '@/components/ui/Loading/LoadingSpinner';
import { useToast } from '@/components/ui/use-toast';
import { MODAL_TYPES, useGlobalModalContext } from '@/context/GlobalModalContext';
import useProperties from '@/hooks/type-service/useProperties';
import useStages from '@/hooks/type-service/useStage';
import { PropertyElement, Stage } from '@/type';
import { Controller, useForm } from 'react-hook-form';
import { useLocation } from 'react-router-dom';
import ErrorToaster from '../Error/ErrorToaster';
import recordApi from '@/api/record';
import { useQueryClient } from 'react-query';
import { cn } from '@/utils/utils';
import { useState } from 'react';

const RecordModal = () => {
  const {
    handleSubmit,
    register,
    control,
    reset,
    formState: { isSubmitting }
  } = useForm();
  const [isResetForm, setIsResetForm] = useState(false);
  const { hideModal, store } = useGlobalModalContext();
  const { modalType, modalProps } = store;
  const {
    typeId,
    recordFilter = {
      searchTerm: '',
      isAsc: false,
      propertyName: null,
      currentPage: 1,
      pageSize: 5
    }
  } = modalProps;
  const location = useLocation();
  const companyName = location.pathname.split('/')[1] || '';
  const { data: typeProperty, isLoading: isPropertiesLoading } = useProperties(companyName, typeId);
  const { data: stages, isLoading: isStagesLoading } = useStages(companyName, typeId);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  if (!typeId) {
    return null;
  }

  if (!typeProperty) {
    return <ErrorToaster errorTitle='Error' errorMessage='Failed to fetch properties' />;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSubmit = async (data: any) => {
    try {
      console.log(data);
      if (!data['Name'] || data['stage'] === '') {
        throw new Error('Name is required');
      }

      const req = {
        record_name: data['Name'],
        stage_id: data.stage,
        properties: typeProperty.properties.map((property) => {
          return {
            id: property.id,
            property_name: property.name,
            property_label: property.label,
            item_value: data[property.name]
          };
        })
      };

      const res = await recordApi.createRecord(companyName, typeId, req);

      if (res) {
        toast({
          title: 'Success',
          description: 'Create record successfully'
        });
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        queryClient.setQueryData(['records', typeId, recordFilter], (oldData: any) => {
          console.log(oldData);
          return {
            ...oldData,
            records: [res, ...oldData.records]
          };
        });
        isResetForm ? reset() : hideModal();
      }
    } catch (error) {
      console.error(error);
      toast({
        title: 'Error',
        description: 'Failed to create record',
        variant: 'destructive'
      });
    }
  };

  return (
    <Modal
      isOpen={modalType === MODAL_TYPES.CREATE_RECORD_MODAL}
      onClose={hideModal}
      className='h-[600px]'
      title={typeProperty ? `New ${typeProperty.name}` : 'New'}
    >
      {isPropertiesLoading || isStagesLoading ? (
        <LoadingSpinner className='mt-10' />
      ) : (
        <form
          id='create-record-form'
          onSubmit={handleSubmit(onSubmit)}
          className={cn(
            '-z-1 absolute bottom-2 left-2 right-2 top-20 overflow-x-hidden pb-32',
            isSubmitting && 'pointer-events-none'
          )}
        >
          <div className='flex w-full flex-col place-content-center gap-2   p-6'>
            {typeProperty ? (
              typeProperty.properties?.map((property: PropertyElement) => {
                if (property.property.name === 'Text' || property.property.name === 'Phone')
                  return (
                    <TextInput
                      className='w-full'
                      header={property.label}
                      key={property.id}
                      placeholder={property.label}
                      register={register}
                      name={property.name}
                    ></TextInput>
                  );
                else return <div></div>;
              })
            ) : (
              <div>loading</div>
            )}
            {stages && stages?.length > 0 && (
              <Controller
                control={control}
                name='stage'
                render={({ field: { onChange, value } }) => (
                  <DropDown header='Status' value={value} onValueChange={onChange}>
                    {stages.map((stage: Stage) => (
                      <DropDownItem title={stage.name} value={stage.id} key={stage.id}>
                        <Item title={stage.name}></Item>
                      </DropDownItem>
                    ))}
                  </DropDown>
                )}
              />
            )}
          </div>
        </form>
      )}
      <Panel className='absolute bottom-0 left-0 right-0 m-0 -mt-4 flex h-10 items-center justify-center bg-gray-100 bg-opacity-90 px-3  py-10 shadow-inner'>
        <ModalFooter className='m-0 '>
          <Button onClick={hideModal} disabled={isStagesLoading}>
            Cancel
          </Button>
          <Button
            form='create-record-form'
            type='submit'
            onClick={() => {
              setIsResetForm(true);
            }}
            disabled={isStagesLoading}
          >
            Save & New
          </Button>

          <PrimaryButton form='create-record-form' type='submit' disabled={isStagesLoading}>
            Save
          </PrimaryButton>
        </ModalFooter>
      </Panel>
    </Modal>
  );
};

export default RecordModal;
