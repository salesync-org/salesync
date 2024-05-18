import useType from '@/hooks/type-service/useType';
import { cn } from '@/utils/utils';
import { Search } from 'lucide-react';
import { useState } from 'react';
import { useDebounce } from 'use-debounce';
import { RecordTableSkeleton } from '../Records/RecordTable';
import { Table, TableBody, TableCell, TableHeader, TableRow } from '../ui';
import { standardTypes } from '../ui/Table/TypeTable';
import { SelectReportType } from './SelectReportModal';

const SelectReportDataTable = ({
  selectedType,
  onSelectChange
}: {
  selectedType?: SelectReportType;
  onSelectChange: (typeId: string, name: string) => void;
}) => {
  const [search, setSearch] = useState('');
  const [debouncedSearch] = useDebounce(search, 500);
  const handleSearchChange = (value: string) => {
    setSearch(value);
  };

  return (
    <div className='flex h-full flex-col gap-6 pb-4'>
      <h3 className='px-2 text-2xl font-semibold'>Select a Report Type</h3>
      <SearchInput value={search} onChange={handleSearchChange} />
      <div className='grow overflow-auto'>
        <ReportTable search={debouncedSearch} onSelectChange={onSelectChange} selectedTypeId={selectedType?.id} />
      </div>
    </div>
  );
};
export default SelectReportDataTable;

const SearchInput = ({ value, onChange }: { value: string; onChange: (value: string) => void }) => {
  return (
    <form className='flex items-center rounded-md border border-gray-200 bg-white px-4 transition-all focus-within:border-[2px] focus-within:border-blue-500'>
      <Search size={20} />
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        type='text'
        placeholder='Search Report Types'
        className='w-full border-none px-3 py-2 focus:outline-none'
      />
    </form>
  );
};

const ReportTable = ({
  search,
  onSelectChange,
  selectedTypeId
}: {
  search: string;
  onSelectChange: (typeId: string, name: string) => void;
  selectedTypeId?: string;
}) => {
  const { types, isLoading } = useType();

  if (isLoading) {
    return <RecordTableSkeleton />;
  }

  if (!types) {
    return null;
  }

  return (
    <Table className='h-full'>
      <TableHeader className='max-h-full rounded-sm border-b-2 border-input-stroke-light dark:border-input-stroke-dark'>
        <TableRow className='left-0 right-0 bg-slate-50 dark:bg-secondary/10'>
          <TableCell className='max-w-28 font-semibold'>Type Name</TableCell>
          <TableCell className='font-semibold'>Category</TableCell>
        </TableRow>
      </TableHeader>
      <TableBody className='h-full overflow-y-scroll'>
        {types.map((type, index) => {
          return type.name.toLowerCase().includes(search.toLowerCase()) ? (
            <TableRow
              key={index}
              className={cn(
                'cursor-pointer transition-all hover:bg-slate-200/60',
                selectedTypeId === type.id && 'bg-slate-200/60'
              )}
              onClick={() => onSelectChange(type.id, type.name)}
            >
              <TableCell className='w-4/12'>{type.name}</TableCell>
              <TableCell className='w-3/12'>{standardTypes.includes(type.name) ? 'Standard' : 'Custom'}</TableCell>
            </TableRow>
          ) : null;
        })}
      </TableBody>
    </Table>
  );
};
