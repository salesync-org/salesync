import { useGlobalModalContext } from '@/context/GlobalModalContext';
import { Modal } from '../ui';
import { useState } from 'react';
import { cn } from '@/utils/utils';
import SelectReportDataTable from './SelectReportDataTable';

const SelectReportModal = () => {
  const [selectedTypeId, setSelectedTypeId] = useState<string | null>(null);
  const {
    hideModal,
    store: { modalProps, modalType }
  } = useGlobalModalContext();

  const handleSelectChange = (typeId: string) => {
    setSelectedTypeId(typeId);
  };

  console.log(selectedTypeId);
  return (
    <Modal isOpen={true} onClose={hideModal} className='relative h-[600px]' title='Create Report'>
      <div className='flex h-full'>
        <section className={cn('h-full grow-[2]', !selectedTypeId && 'w-full')}>
          <SelectReportDataTable onSelectChange={handleSelectChange} />
        </section>
        <section className={cn('grow-[1] bg-red-500')}></section>
      </div>
    </Modal>
  );
};
export default SelectReportModal;
