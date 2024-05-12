import { X } from 'lucide-react';
import { PrimaryButton } from '../ui';
import reportIcon from '@/assets/type-icon/report_type.fb93b610c51607e576fc.svg';
import { standardTypes } from '../ui/Table/TypeTable';
import useProperties from '@/hooks/type-service/useProperties';
import { useParams } from 'react-router-dom';
import LoadingSpinner from '../ui/Loading/LoadingSpinner';
import { SelectReportType } from './SelectReportModal';

type SelectReportDetailProps = {
  selectedType?: SelectReportType;
  onDetailClose: () => void;
  typeName?: string;
};

const SelectReportDetail = ({ selectedType, onDetailClose, typeName }: SelectReportDetailProps) => {
  const { companyName = '' } = useParams();

  const { data: typeProperties, isLoading } = useProperties(companyName, selectedType?.id);
  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (!typeProperties || !typeName) {
    return null;
  }

  console.log({ typeProperties });
  return (
    <div>
      <header className='flex justify-between border-b pb-5'>
        <h2 className='text-2xl font-medium'>Detail</h2>
        <X className='cursor-pointer rounded-sm transition-all hover:bg-slate-200' onClick={onDetailClose} />
      </header>
      <div className='flex flex-col gap-6 py-3'>
        <ShortSelectReportDetail name={typeName} />
        <PrimaryButton>Start Report</PrimaryButton>
      </div>
    </div>
  );
};

const ShortSelectReportDetail = ({ name }: { name: string }) => {
  return (
    <div className='flex items-center gap-4'>
      <img src={reportIcon} alt='icon for report' className='size-10 rounded-md bg-green-500' />
      <div>
        <h3>{name}</h3>
        <span>{standardTypes.includes(name) ? 'Standard Report Type' : 'Custom Report Type'}</span>
      </div>
    </div>
  );
};

export default SelectReportDetail;
