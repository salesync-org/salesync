/* eslint-disable @typescript-eslint/no-explicit-any */
import recordApi, { RecordsFilter } from '@/api/record';
import useRecords from '@/hooks/record-service/useRecords';
import { cn } from '@/utils/utils';
import { ChevronRight, X } from 'lucide-react';
import { ChangeEvent, Dispatch, useState } from 'react';
import RecordForm from '../Records/RecordForm';
import { TextInput } from '../ui';
import LoadingSpinner from '../ui/Loading/LoadingSpinner';
import { useToast } from '../ui/Toast';
import { CheckStateStatus } from './RelationModal';

type RelationFormProps = {
  typeProperties: TypeProperty;
  formId: string;
  check: string;
  onCheckStatus: (status: CheckStateStatus) => (e: ChangeEvent<HTMLInputElement>) => void;
  record: RecordPropertyResponse | null;
  setRecord: Dispatch<React.SetStateAction<RecordPropertyResponse | null>>;
  currentData: Record<string, string>;
  companyName: string;
};

const RelationForm = ({
  typeProperties,
  formId,
  check,
  onCheckStatus,
  record,
  setRecord,
  currentData,
  companyName
}: RelationFormProps) => {
  const [isExpand, setIsExpand] = useState(false);
  const [search, setSearch] = useState('');
  const [showHint, setShowHint] = useState(false);
  const [debounceSearch, setDebounceSearch] = useState('');

  const { toast } = useToast();

  const recordFilter: RecordsFilter = {
    searchTerm: debounceSearch,
    isAsc: null,
    propertyName: null,
    currentPage: 1,
    pageSize: 4
  };

  const { data: records, isLoading } = useRecords(companyName, typeProperties.id, recordFilter);
  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (!records) {
    return null;
  }

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
        localStorage.setItem('record-relation', JSON.stringify(res));
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

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    setTimeout(() => {
      setDebounceSearch(e.target.value);
    }, 300);
  };

  return (
    <div className='grid w-full grid-cols-2 rounded-md bg-slate-100 p-4'>
      <section className={cn('col-span-1 grid grid-cols-12 border-r')}>
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
              id={typeProperties.name + 'create'}
              type='radio'
              checked={check === 'create'}
              onChange={onCheckStatus('create')}
            />
            <label htmlFor={typeProperties.name + 'create'} className='text-sm font-medium'>
              Create new
            </label>
          </div>
          <div
            className={cn(
              'h-[320px] w-full overflow-y-auto transition-all duration-[0.25s] ease-in',
              !isExpand && 'h-0 overflow-hidden',
              check !== 'create' && 'pointer-events-none opacity-50'
            )}
          >
            <RecordForm
              currentData={currentData}
              formId={formId}
              typeProperty={typeProperties}
              onSubmit={onSubmit}
              className='pb-4'
            />
          </div>
        </section>
      </section>
      <section className={cn('col-span-1 w-full px-8')}>
        <section className='col-span-4 flex w-full flex-col gap-2'>
          <div className='flex items-center gap-2'>
            <input
              id={typeProperties.name + 'chooseExisting'}
              type='radio'
              checked={check === 'chooseExisting'}
              onChange={onCheckStatus('chooseExisting')}
            />
            <label htmlFor={typeProperties.name + 'chooseExisting'} className='text-sm font-medium'>
              Choose Existing
            </label>
          </div>
          <div className={cn('relative', check !== 'chooseExisting' && 'pointer-events-none opacity-50')}>
            <TextInput
              onFocus={() => setShowHint(true)}
              onBlur={() => setShowHint(false)}
              value={search}
              onChange={handleSearchChange}
              className='w-full'
              postfixIcon='search'
            />
            {record && (
              <section className='absolute top-[0px] flex h-[36px] w-full bg-slate-50'>
                <div className='flex w-full items-center justify-between gap-2 px-2 py-1'>
                  <p className='text-xs font-medium'>{record.name}</p>
                  <X
                    size={20}
                    className='cursor-pointer'
                    onMouseDown={() => {
                      setRecord(null);
                      localStorage.removeItem('record-relation');
                    }}
                  />
                </div>
              </section>
            )}
            {showHint && (
              <ul
                className={cn(
                  'absolute top-[40px] z-[9999] flex w-full flex-col divide-y overflow-hidden rounded-lg bg-white shadow-md transition-all duration-300 ease-in-out'
                )}
              >
                {records &&
                  records.records.map((record: RecordPropertyResponse) => (
                    <li
                      className='w-full cursor-pointer bg-white px-3 py-2 hover:bg-primary-color/10'
                      onMouseDown={(e) => {
                        e.preventDefault();
                        setRecord(record);
                        localStorage.setItem('record-relation', JSON.stringify(record));
                        setShowHint(false);
                      }}
                      key={record.id}
                    >
                      {record.name}
                    </li>
                  ))}
              </ul>
            )}
          </div>
        </section>
      </section>
    </div>
  );
};

export default RelationForm;
