import { MODAL_TYPES, useGlobalModalContext } from '@/context/GlobalModalContext';
import { Modal } from '../ui';
import { useState } from 'react';
import { cn } from '@/utils/utils';
import SelectReportDataTable from './SelectReportDataTable';
import SelectReportDetail from './SelectReportDetail';

export type SelectReportType = {
  id: string;
  name: string;
};

const SelectReportModal = () => {
  const [selectedType, setSelectedType] = useState<SelectReportType | undefined>(undefined);
  const {
    hideModal,
    store: { modalType }
  } = useGlobalModalContext();

  const handleSelectChange = (typeId: string, name: string) => {
    setSelectedType({
      id: typeId,
      name
    });
  };

  const onDetailClose = () => {
    setSelectedType(undefined);
  };

  console.log(selectedType);
  return (
    <Modal
      isOpen={modalType === MODAL_TYPES.REPORT_MODAL}
      onClose={hideModal}
      className='relative h-[500px]'
      title='Create Report'
    >
      <div className='flex h-[calc(100%-12px)] border-t pt-4'>
        <section className={cn('h-full grow-[2] border-r pr-6', !selectedType && 'w-full')}>
          <SelectReportDataTable selectedType={selectedType} onSelectChange={handleSelectChange} />
        </section>
        <section className={cn('h-full grow-[1] px-4', !selectedType && 'hidden')}>
          <SelectReportDetail onDetailClose={onDetailClose} selectedType={selectedType} typeName={selectedType?.name} />
        </section>
      </div>
    </Modal>
  );
};
export default SelectReportModal;
