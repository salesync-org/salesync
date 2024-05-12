/* eslint-disable @typescript-eslint/no-explicit-any */
import reportIcon from '@/assets/type-icon/report_type.fb93b610c51607e576fc.svg';
import { useGlobalModalContext } from '@/context/GlobalModalContext';
import useProperties from '@/hooks/type-service/useProperties';
import useAuth from '@/hooks/useAuth';
import { Search, X } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PrimaryButton } from '../ui';
import LoadingSpinner from '../ui/Loading/LoadingSpinner';
import { standardTypes } from '../ui/Table/TypeTable';
import { SelectReportType } from './SelectReportModal';

type SelectReportDetailProps = {
  selectedType?: SelectReportType;
  onDetailClose: () => void;
  typeName?: string;
};

const SelectReportDetail = ({ selectedType, onDetailClose, typeName }: SelectReportDetailProps) => {
  const { company } = useAuth();
  const { hideModal } = useGlobalModalContext();
  const companyName = company?.name ?? '';
  const { data: typeProperties, isLoading } = useProperties(companyName, selectedType?.id);
  const navigate = useNavigate();
  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (!typeProperties || !typeName) {
    return null;
  }

  console.log({ typeProperties });
  return (
    <div className='flex h-full flex-col'>
      <header className='flex justify-between border-b pb-5'>
        <h2 className='text-2xl font-medium'>Detail</h2>
        <X className='cursor-pointer rounded-sm transition-all hover:bg-slate-200' onClick={onDetailClose} />
      </header>
      <div className='flex h-full grow flex-col gap-6 py-3'>
        <ShortSelectReportDetail name={typeName} />
        <PrimaryButton
          onClick={() => {
            navigate(`${companyName}/all/report/create-report/${selectedType?.id}`);
            hideModal();
          }}
        >
          Start Report
        </PrimaryButton>
        <TypeFields typeProperties={typeProperties} />
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

const FieldsSearchInput = ({ value, onChange }: { value: string; onChange: (value: string) => void }) => {
  return (
    <form className='flex items-center rounded-md border border-gray-200 bg-white px-4 transition-all focus-within:border-[2px] focus-within:border-blue-500'>
      <Search size={20} />
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        type='text'
        placeholder='Quick lookup'
        className='w-full border-none px-3 py-2 focus:outline-none'
      />
    </form>
  );
};

const TypeFields = ({ typeProperties }: { typeProperties: any }) => {
  const [term, setTerm] = useState('');

  const handleSearchChange = (value: string) => {
    setTerm(value);
  };

  const fieldsNumber = typeProperties.properties.length;
  return (
    <div className='flex grow flex-col gap-4'>
      <h3>Fields ({fieldsNumber})</h3>
      <FieldsSearchInput value={term} onChange={handleSearchChange} />
      <ul className='flex grow flex-col gap-3 overflow-auto'>
        {typeProperties.properties.map((property: any) => {
          return property.label.toLowerCase().includes(term.toLowerCase()) ? (
            <li key={property.id} className='border px-4 py-3 shadow-sm'>
              <span>{property.label}</span>
            </li>
          ) : null;
        })}
      </ul>
    </div>
  );
};
export default SelectReportDetail;
