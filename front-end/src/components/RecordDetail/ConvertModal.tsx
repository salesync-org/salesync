/* eslint-disable @typescript-eslint/no-explicit-any */
import { MODAL_TYPES, useGlobalModalContext } from '@/context/GlobalModalContext';
import { Button, Modal, ModalFooter, Panel, PrimaryButton, TextInput } from '../ui';
import useProperties from '@/hooks/type-service/useProperties';
import { useParams } from 'react-router-dom';
import RecordForm from '../Records/RecordForm';
import { useState } from 'react';
import { ChevronRight } from 'lucide-react';
import { cn } from '@/utils/utils';

const ConvertModal = () => {
  const {
    hideModal,
    store: { modalType }
  } = useGlobalModalContext();
  const { companyName = '' } = useParams();

  const { data: leadProperties, isLoading: isLeadLoading } = useProperties(
    companyName,
    '11111111-1111-1111-1111-111111111111'
  );

  if (!leadProperties) {
    return null;
  }

  console.log({ leadProperties });
  return (
    <Modal
      isOpen={false}
      onClose={hideModal}
      className='mx-auto h-[600px] w-[1024px] max-w-[calc(100vw-12px)] overflow-y-hidden'
      title='Convert Lead'
    >
      <div className='flex h-[482px] w-full flex-col gap-2 overflow-y-auto pb-[72px]'>
        <ConvertSection typeProperties={leadProperties} />
        <ConvertSection typeProperties={leadProperties} />
        <ConvertSection typeProperties={leadProperties} />
      </div>
      <ModalFooter className='absolute bottom-0 left-0 right-0 m-0 flex h-10 w-full items-center justify-center bg-gray-100 bg-opacity-90 px-3 py-10 shadow-inner'>
        <Button onClick={hideModal}>Cancel</Button>
        <PrimaryButton type='submit'>Convert</PrimaryButton>
      </ModalFooter>
    </Modal>
  );
};

const ConvertSection = ({ typeProperties }: any) => {
  const [isExpand, setIsExpand] = useState(false);
  const onSubmit = (data: any) => {
    console.log(data);
  };
  return (
    <div className='grid w-full grid-cols-2 rounded-md bg-slate-100 p-4'>
      <section className='col-span-1 grid grid-cols-5 border-r'>
        <div className='col-span-1 flex cursor-pointer gap-2' onClick={() => setIsExpand(!isExpand)}>
          <ChevronRight
            size={20}
            style={{ transform: isExpand ? 'rotate(90deg)' : '', transition: 'all 0.25s ease-in' }}
          />
          <h2 className='text-base font-medium'>{typeProperties.name}</h2>
        </div>
        <section className='col-span-4 flex w-full flex-col gap-2'>
          <div className='flex items-center gap-2'>
            <input id={typeProperties.name} type='radio' />
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
            <RecordForm typeProperty={typeProperties} onSubmit={onSubmit} className='pb-4' />
          </div>
        </section>
      </section>
      <section className='col-span-1 w-full px-8'>
        <section className='col-span-4 flex w-full flex-col gap-2'>
          <div className='flex items-center gap-2'>
            <input id={typeProperties.name} type='radio' />
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
