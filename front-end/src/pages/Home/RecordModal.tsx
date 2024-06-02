import recordApi from '@/api/record';
import RecordForm from '@/components/Records/RecordForm';
import { Button, Modal, ModalFooter, Panel, PrimaryButton } from '@/components/ui';
import LoadingSpinner from '@/components/ui/Loading/LoadingSpinner';
import { useToast } from '@/components/ui/Toast';
import { MODAL_TYPES, useGlobalModalContext } from '@/context/GlobalModalContext';
import useProperties from '@/hooks/type-service/useProperties';
import useStages from '@/hooks/type-service/useStage';
import { useQueryClient } from 'react-query';
import { useLocation } from 'react-router-dom';
import ErrorToaster from '../Error/ErrorToaster';

const RecordModal = () => {
  const {
    hideModal,
    store: { modalProps, modalType }
  } = useGlobalModalContext();
  const {
    typeId,
    recordFilter = {
      searchTerm: '',
      isAsc: false,
      propertyName: null,
      currentPage: 1,
      pageSize: 5
    },
    currentData = {},
    currentRecord = {}
  } = modalProps;

  const location = useLocation();
  const companyName = location.pathname.split('/')[1] || '';
  const { data: typeProperty, isLoading: isPropertiesLoading } = useProperties(companyName, typeId);
  const { data: stages, isLoading: isStagesLoading } = useStages(companyName, typeId);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const isUpdateForm = Object.keys(currentData).length > 0;
  if (!typeId) {
    return null;
  }

  if (!typeProperty) {
    return <ErrorToaster errorTitle='Error' errorMessage='Failed to fetch properties' />;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleCreateRecord = async (data: any) => {
    const req = {
      record_name: data['Name'],
      stage_id: data.stage,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      properties: typeProperty.properties!.map((property: any) => {
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
        return {
          ...oldData,
          records: [res, ...oldData.records]
        };
      });
      hideModal();
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleUpdateRecord = async (data: any) => {
    const newRecord = JSON.parse(JSON.stringify(currentRecord));
    const updatedRecord = {
      ...newRecord,
      current_stage_id: data.stage,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      properties: currentRecord.properties.map((property: any) => {
        return {
          id: property.id,
          property_name: property.property_name,
          property_label: property.property_label,
          item_value: data[property.property_name]
        };
      })
    };

    const res = await recordApi.updateRecord(companyName, updatedRecord.id, updatedRecord);

    if (res) {
      toast({
        title: 'Success',
        description: 'Update record successfully'
      });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      queryClient.setQueryData(['record', updatedRecord.id], (oldData: any) => {
        return {
          ...oldData,
          source_record: {
            ...oldData.source_record,
            ...updatedRecord
          }
        };
      });

      hideModal();
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSubmit = async (data: any) => {
    try {
      if (!data['Name'] || data['stage'] === '') {
        throw new Error('Name is required');
      }

      if (!isUpdateForm) {
        handleCreateRecord(data);
      } else {
        handleUpdateRecord(data);
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

  const formId = 'create-record-form';
  return (
    <Modal
      isOpen={modalType === MODAL_TYPES.CREATE_RECORD_MODAL}
      onClose={hideModal}
      className=''
      title={`${isUpdateForm ? 'Update' : 'Create'} ${typeProperty.name}`}
    >
      <div className='overflow-y-auto'>
        {isPropertiesLoading || isStagesLoading ? (
          <LoadingSpinner className='mt-10' />
        ) : (
          <RecordForm
            typeProperty={typeProperty}
            stages={stages}
            currentData={currentData}
            formId={formId}
            onSubmit={onSubmit}
          />
        )}
      </div>
      <Panel className=' m-0 flex h-10 items-center justify-center bg-gray-100 bg-opacity-90 px-3  py-10 shadow-inner'>
        <ModalFooter className='m-0 '>
          <Button onClick={hideModal}>Cancel</Button>
          <PrimaryButton form={formId} type='submit'>
            Save
          </PrimaryButton>
        </ModalFooter>
      </Panel>
    </Modal>
  );
};

export default RecordModal;
