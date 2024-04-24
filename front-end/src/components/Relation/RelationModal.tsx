/* eslint-disable @typescript-eslint/no-explicit-any */
import recordApi from '@/api/record';
import { MODAL_TYPES, useGlobalModalContext } from '@/context/GlobalModalContext';
import useProperties from '@/hooks/type-service/useProperties';
import useType from '@/hooks/type-service/useType';
import { convertTypePropertyToCurrentData } from '@/utils/utils';
import { useEffect, useState } from 'react';
import { useQueryClient } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { Button, Modal, ModalFooter, PrimaryButton } from '../ui';
import LoadingSpinner from '../ui/Loading/LoadingSpinner';
import LoadingSpinnerSmall from '../ui/Loading/LoadingSpinnerSmall';
import { useToast } from '../ui/Toast';
import RelationForm from './RelationForm';

const TYPE_FORM_ID = 'create-relation-form';
export type CheckStateStatus = 'create' | 'chooseExisting';

const RelationModal = () => {
  const [checkStatus, setCheckStatus] = useState<CheckStateStatus>('create');
  const [record, setRecord] = useState<RecordPropertyResponse | null>(null);
  const [convertClicked, setConvertClicked] = useState(false);
  const [loading, setLoading] = useState(false);
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const {
    hideModal,
    store: { modalType, modalProps }
  } = useGlobalModalContext();
  const { recordId, companyName, typeId } = modalProps;
  const navigate = useNavigate();

  console.log({ typeId });

  useEffect(() => {
    const handleConvert = async () => {
      const recordRelation = localStorage.getItem('record-relation')
        ? JSON.parse(localStorage.getItem('record-relation')!)
        : null;

      if (convertClicked && recordRelation) {
        try {
          setLoading(true);
          const res = await recordApi.createRelation(companyName, recordId, recordRelation.id);
          if (res) {
            toast({
              title: 'Success',
              description: 'Convert successfully'
            });
            queryClient.invalidateQueries(['record']);
            queryClient.invalidateQueries(['records']);

            hideModal();
          }
        } catch (error: any) {
          console.error(error);
          toast({
            title: 'Error',
            description: error?.message ?? 'Failed to convert',
            variant: 'destructive'
          });
        } finally {
          setConvertClicked(false);
          setLoading(false);
          localStorage.removeItem('record-relation');
        }
      }
    };

    handleConvert();
  }, [companyName, record, convertClicked, hideModal, navigate, queryClient, recordId, toast]);

  const { types = [], isLoading: isTypesLoading } = useType(companyName);
  const { data: recordProperties, isLoading: isRecordLoading } = useProperties(companyName, typeId);

  if (isTypesLoading || isRecordLoading) {
    return <LoadingSpinner />;
  }

  if (!recordProperties || !types) {
    return null;
  }

  const handleCheckStatus = (status: CheckStateStatus) => () => {
    setCheckStatus(status);
  };

  const handleConvert = async () => {
    try {
      setLoading(true);
      setConvertClicked(true);
      const submitForm = async (formId: string) => {
        const form = document.getElementById(formId) as HTMLFormElement;
        form?.requestSubmit();
      };

      if (checkStatus === 'create') {
        await submitForm(TYPE_FORM_ID);
      }
    } catch (error: any) {
      console.error(error);
      toast({
        title: 'Error',
        description: error?.message ?? 'Failed to convert',
        variant: 'destructive'
      });
      setConvertClicked(false);
      setLoading(false);
    }
  };

  return (
    <Modal
      isOpen={modalType === MODAL_TYPES.RELATION_MODAL}
      onClose={hideModal}
      className='mx-auto h-[600px] w-[1024px] max-w-[calc(100vw-12px)] overflow-y-hidden'
      title='Convert Lead'
    >
      <div className='flex h-[482px] w-full flex-col gap-2 overflow-y-auto pb-[72px]'>
        <RelationForm
          typeProperties={recordProperties}
          formId={TYPE_FORM_ID}
          check={checkStatus}
          onCheckStatus={handleCheckStatus}
          setRecord={setRecord}
          record={record}
          currentData={convertTypePropertyToCurrentData(recordProperties.properties)}
          companyName={companyName}
        />
      </div>
      <ModalFooter className='absolute bottom-0 left-0 right-0 m-0 flex h-10 w-full items-center justify-center bg-gray-100 bg-opacity-90 px-3 py-10 shadow-inner'>
        <Button disabled={loading} onClick={hideModal}>
          Cancel
        </Button>
        <PrimaryButton disabled={loading} type='submit' onClick={handleConvert}>
          {loading ? (
            <div className='flex items-center justify-center space-x-2'>
              <div>
                <LoadingSpinnerSmall className='h-5 w-5 fill-on-primary' />
              </div>
              <p className='font-semibold'>Saving...</p>
            </div>
          ) : (
            <p className='font-semibold'>Save</p>
          )}
        </PrimaryButton>
      </ModalFooter>
    </Modal>
  );
};

export default RelationModal;
