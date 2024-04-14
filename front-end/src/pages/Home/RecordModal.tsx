import { Button, DropDown, DropDownItem, Modal, ModalFooter, Panel, PrimaryButton, TextInput } from '@/components/ui';
import LoadingSpinner from '@/components/ui/Loading/LoadingSpinner';
import { MODAL_TYPES, useGlobalModalContext } from '@/context/GlobalModalContext';
import useProperties from '@/hooks/type-service/useProperties';
import { useLocation } from 'react-router-dom';
import ErrorToaster from '../Error/ErrorToaster';
import { PropertyElement, Stage } from '@/type';
import useStages from '@/hooks/type-service/useStage';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useToast } from '@/components/ui/use-toast';
import recordApi from '@/api/record';

const RecordModal = () => {
  const [stage, setStage] = useState('');
  const { handleSubmit, register } = useForm();
  const { hideModal, store } = useGlobalModalContext();
  const { modalType, modalProps } = store;
  const { typeId } = modalProps;
  const location = useLocation();
  const companyName = location.pathname.split('/')[1] || '';
  const { data: typeProperty, isLoading: isPropertiesLoading } = useProperties(companyName, typeId);
  const { data: stages, isLoading: isStagesLoading } = useStages(companyName, typeId);
  const { toast } = useToast();

  if (!typeId) {
    return null;
  }

  if (!typeProperty) {
    return <ErrorToaster errorTitle='Error' errorMessage='Failed to fetch properties' />;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSubmit = async (data: any) => {
    try {
      if (!data['Name']) {
        throw new Error('Name is required');
      }

      const req = {
        record_name: data['Name'],
        properties: typeProperty.properties.map((property) => {
          return {
            id: property.id,
            property_name: property.name,
            property_label: property.label,
            item_value: data[property.name]
          };
        })
      };

      console.log(req);

      const res = await recordApi.createRecord(companyName, typeId, req);

      if (res) {
        toast({
          title: 'Success',
          description: 'Create record successfully'
        });
        hideModal();
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
          className='-z-1 absolute bottom-2 left-2 right-2 top-20 overflow-x-hidden  pb-32  '
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
              <DropDown header='Status' value={stage} onValueChange={setStage}>
                {stages.map((stage: Stage) => (
                  <DropDownItem title={stage.name} value={stage.id} key={stage.id}>
                    {stage.name}
                  </DropDownItem>
                ))}
              </DropDown>
            )}
          </div>
        </form>
      )}
      <Panel className='absolute bottom-0 left-0 right-0 m-0   -mt-4 flex h-10 items-center justify-center bg-gray-100 bg-opacity-90 px-3  py-10 shadow-inner'>
        <ModalFooter className='m-0 '>
          <Button onClick={hideModal}>Cancel</Button>
          <Button onClick={() => {}}>Save & New</Button>

          <PrimaryButton form='create-record-form' type='submit'>
            Save
          </PrimaryButton>
        </ModalFooter>
      </Panel>
    </Modal>
  );
};

export default RecordModal;
