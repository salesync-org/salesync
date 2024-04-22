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
import { ConvertSection } from './ConvertSection';

const TYPE_FORM_ID = {
  CONTACT: 'contactForm',
  OPPORTUNITY: 'opportunityForm',
  ACCOUNT: 'accountForm'
};
export type Status = 'create' | 'chooseExisting';

type CheckStateStatus = {
  contactCheckStatus: Status;
  opportunityCheckStatus: Status;
  accountCheckStatus: Status;
};

const ConvertModal = () => {
  const [checkStatus, setCheckStatus] = useState<CheckStateStatus>({
    contactCheckStatus: 'create',
    opportunityCheckStatus: 'create',
    accountCheckStatus: 'create'
  });
  const [contact, setContact] = useState<RecordPropertyResponse | null>(null);
  const [opportunity, setOpportunity] = useState<RecordPropertyResponse | null>(null);
  const [account, setAccount] = useState<RecordPropertyResponse | null>(null);
  const [convertClicked, setConvertClicked] = useState(false);
  const [loading, setLoading] = useState(false);
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const {
    hideModal,
    store: { modalType, modalProps }
  } = useGlobalModalContext();
  const { recordId, companyName } = modalProps;
  const navigate = useNavigate();

  useEffect(() => {
    const handleConvert = async () => {
      const contact = localStorage.getItem('Contact') ? JSON.parse(localStorage.getItem('Contact')!) : null;
      const opportunity = localStorage.getItem('Opportunity') ? JSON.parse(localStorage.getItem('Opportunity')!) : null;
      const account = localStorage.getItem('Account') ? JSON.parse(localStorage.getItem('Account')!) : null;

      if (convertClicked && contact && opportunity && account) {
        try {
          setLoading(true);
          const relation1 = recordApi.createRelation(companyName, contact.id, opportunity.id);
          const relation2 = recordApi.createRelation(companyName, contact.id, account.id);
          const relation3 = recordApi.createRelation(companyName, opportunity.id, account.id);
          const res = await Promise.all([relation1, relation2, relation3]);
          if (res) {
            toast({
              title: 'Success',
              description: 'Convert successfully'
            });
            queryClient.invalidateQueries(['record']);
            await recordApi.deleteRecord(companyName, [recordId]);
            queryClient.invalidateQueries(['records']);

            navigate(`/${companyName}/record/${contact.id}`);
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
          localStorage.removeItem('Contact');
          localStorage.removeItem('Opportunity');
          localStorage.removeItem('Account');
        }
      }
    };

    handleConvert();
  }, [account, companyName, contact, convertClicked, hideModal, navigate, opportunity, queryClient, recordId, toast]);

  const { types = [], isLoading: isTypesLoading } = useType(companyName);

  const { data: contactProperties, isLoading: isContactLoading } = useProperties(
    companyName,
    types.find((type) => type.name === 'Contact')?.id
  );
  const { data: opportunityProperties, isLoading: isOpportunityLoading } = useProperties(
    companyName,
    types.find((type) => type.name === 'Opportunity')?.id
  );
  const { data: accountProperties, isLoading: isAccountLoading } = useProperties(
    companyName,
    types.find((type) => type.name === 'Account')?.id
  );
  
  if (isTypesLoading || isContactLoading || isOpportunityLoading || isAccountLoading) {
    return <LoadingSpinner />;
  }

  if (!contactProperties || !types || !opportunityProperties || !accountProperties) {
    return null;
  }

  const handleCheckStatus = (type: string) => (status: Status) => () => {
    setCheckStatus((prev) => ({ ...prev, [type]: status }));
  };

  const handleConvert = async () => {
    try {
      setLoading(true);
      setConvertClicked(true);
      const submitForm = async (formId: string) => {
        const form = document.getElementById(formId) as HTMLFormElement;
        form?.requestSubmit();
      };

      if (checkStatus.contactCheckStatus === 'create') {
        await submitForm(TYPE_FORM_ID.CONTACT);
      }

      if (checkStatus.opportunityCheckStatus === 'create') {
        await submitForm(TYPE_FORM_ID.OPPORTUNITY);
      }

      if (checkStatus.accountCheckStatus === 'create') {
        await submitForm(TYPE_FORM_ID.ACCOUNT);
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
      isOpen={modalType === MODAL_TYPES.CONVERT_MODAL}
      onClose={hideModal}
      className='mx-auto h-[600px] w-[1024px] max-w-[calc(100vw-12px)] overflow-y-hidden'
      title='Convert Lead'
    >
      <div className='flex h-[482px] w-full flex-col gap-2 overflow-y-auto pb-[72px]'>
        <ConvertSection
          typeProperties={contactProperties}
          formId={TYPE_FORM_ID.CONTACT}
          check={checkStatus.contactCheckStatus}
          onCheckStatus={handleCheckStatus('contactCheckStatus')}
          setRecord={setContact}
          record={contact}
          currentData={convertTypePropertyToCurrentData(contactProperties.properties)}
          companyName={companyName}
        />
        <ConvertSection
          typeProperties={opportunityProperties}
          formId={TYPE_FORM_ID.OPPORTUNITY}
          check={checkStatus.opportunityCheckStatus}
          onCheckStatus={handleCheckStatus('opportunityCheckStatus')}
          setRecord={setOpportunity}
          record={opportunity}
          currentData={convertTypePropertyToCurrentData(opportunityProperties.properties)}
          companyName={companyName}
        />
        <ConvertSection
          typeProperties={accountProperties}
          formId={TYPE_FORM_ID.ACCOUNT}
          check={checkStatus.accountCheckStatus}
          onCheckStatus={handleCheckStatus('accountCheckStatus')}
          setRecord={setAccount}
          record={account}
          currentData={convertTypePropertyToCurrentData(accountProperties.properties)}
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
              <p className='font-semibold'>Converting...</p>
            </div>
          ) : (
            <p className='font-semibold'>Convert</p>
          )}
        </PrimaryButton>
      </ModalFooter>
    </Modal>
  );
};

export default ConvertModal;
