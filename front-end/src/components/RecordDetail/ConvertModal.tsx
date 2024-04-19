/* eslint-disable @typescript-eslint/no-explicit-any */
import recordApi from '@/api/record';
import { MODAL_TYPES, useGlobalModalContext } from '@/context/GlobalModalContext';
import useProperties from '@/hooks/type-service/useProperties';
import useType from '@/hooks/type-service/useType';
import { cn, getCompanyName } from '@/utils/utils';
import { ChevronRight } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import RecordForm from '../Records/RecordForm';
import { Button, Modal, ModalFooter, PrimaryButton, TextInput } from '../ui';
import LoadingSpinner from '../ui/Loading/LoadingSpinner';
import { useToast } from '../ui/Toast';
import { useQueryClient } from 'react-query';

const TYPE_FORM_ID = {
  CONTACT: 'contactForm',
  OPPORTUNITY: 'opportunityForm',
  ACCOUNT: 'accountForm'
};
type Status = 'create' | 'chooseExisting';

type CheckStateStatus = {
  contactCheckStatus: Status;
  opportunityCheckStatus: Status;
  accountCheckStatus: Status;
};

const ids = {
  Contact: '',
  Opportunity: '',
  Account: ''
};

const ConvertModal = () => {
  const [checkStatus, setCheckStatus] = useState<CheckStateStatus>({
    contactCheckStatus: 'create',
    opportunityCheckStatus: 'create',
    accountCheckStatus: 'create'
  });
  const [contact, setContact] = useState<RecordProperty | null>(null);
  const [opportunity, setOpportunity] = useState<RecordProperty | null>(null);
  const [account, setAccount] = useState<RecordProperty | null>(null);
  const [convertClicked, setConvertClicked] = useState(true);
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const companyName = getCompanyName();
  const {
    hideModal,
    store: { modalType }
  } = useGlobalModalContext();

  useEffect(() => {
    const handleRevert = async () => {
      if (convertClicked && contact && opportunity && account) {
        try {
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
            window.location.href = `${companyName}/record/${contact.id}`
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
        }
      }
    };

    handleRevert();
  }, [account, companyName, contact, convertClicked, hideModal, opportunity, queryClient, toast]);

  const { types = [], isLoading: isTypesLoading } = useType();

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
        />
        <ConvertSection
          typeProperties={opportunityProperties}
          formId={TYPE_FORM_ID.OPPORTUNITY}
          check={checkStatus.opportunityCheckStatus}
          onCheckStatus={handleCheckStatus('opportunityCheckStatus')}
          setRecord={setOpportunity}
        />
        <ConvertSection
          typeProperties={accountProperties}
          formId={TYPE_FORM_ID.ACCOUNT}
          check={checkStatus.accountCheckStatus}
          onCheckStatus={handleCheckStatus('accountCheckStatus')}
          setRecord={setAccount}
        />
      </div>
      <ModalFooter className='absolute bottom-0 left-0 right-0 m-0 flex h-10 w-full items-center justify-center bg-gray-100 bg-opacity-90 px-3 py-10 shadow-inner'>
        <Button onClick={hideModal}>Cancel</Button>
        <PrimaryButton type='submit' onClick={handleConvert}>
          Convert
        </PrimaryButton>
      </ModalFooter>
    </Modal>
  );
};

const ConvertSection = ({ typeProperties, formId, check, onCheckStatus, setRecord }: any) => {
  const [isExpand, setIsExpand] = useState(false);
  const { toast } = useToast();
  const companyName = getCompanyName();

  const onSubmit = async (data: any) => {
    try {
      const req = {
        record_name: data['Name'],
        stage_id: data.stage,
        properties: typeProperties.properties!.map((property: any) => {
          return {
            id: property.id,
            property_name: property.name,
            property_label: property.label,
            item_value: data[property.name]
          };
        })
      };

      const typeId = typeProperties.id;
      const res = await recordApi.createRecord(companyName, typeId, req);

      if (res) {
        toast({
          title: 'Success',
          description: 'Create record successfully'
        });

        setRecord(res);
        ids[typeProperties.name as keyof typeof ids] = res.id;
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
    <div className='grid w-full grid-cols-2 rounded-md bg-slate-100 p-4'>
      <section className='col-span-1 grid grid-cols-12 border-r'>
        <div className='col-span-3 -mt-1 flex cursor-pointer gap-2' onClick={() => setIsExpand(!isExpand)}>
          <ChevronRight
            size={20}
            style={{ transform: isExpand ? 'rotate(90deg)' : '', transition: 'all 0.25s ease-in' }}
          />
          <h2 className='text-base font-medium'>{typeProperties.name}</h2>
        </div>
        <section className='col-span-9 flex w-full flex-col gap-2'>
          <div className='flex items-center gap-2'>
            <input
              id={typeProperties.name}
              type='radio'
              checked={check === 'create'}
              onChange={onCheckStatus('create')}
            />
            <label htmlFor={typeProperties.name} className='text-sm font-medium'>
              Create new
            </label>
          </div>
          <div
            className={cn(
              'h-[320px] w-full overflow-y-auto transition-all duration-[0.25s] ease-in',
              !isExpand && 'h-0 overflow-hidden'
            )}
          >
            <RecordForm formId={formId} typeProperty={typeProperties} onSubmit={onSubmit} className='pb-4' />
          </div>
        </section>
      </section>
      <section className='col-span-1 w-full px-8'>
        <section className='col-span-4 flex w-full flex-col gap-2'>
          <div className='flex items-center gap-2'>
            <input
              id={typeProperties.name}
              type='radio'
              checked={check === 'chooseExisting'}
              onChange={onCheckStatus('chooseExisting')}
            />
            <label htmlFor={typeProperties.name} className='text-sm font-medium'>
              Choose Existing
            </label>
          </div>
          <div>
            <TextInput className='w-full' postfixIcon='search' />
          </div>
        </section>
      </section>
    </div>
  );
};
export default ConvertModal;
