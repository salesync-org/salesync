import { RecordsFilter } from '@/api/record';
import RecordTable from '@/components/Records/RecordTable';
import { ButtonGroup } from '@/components/ui';
import Button from '@/components/ui/Button/Button';
import Panel from '@/components/ui/Panel/Panel';
import TextInput from '@/components/ui/TextInput/TextInput';
import { MODAL_TYPES, useGlobalModalContext } from '@/context/GlobalModalContext';
// import { Type } from '@/type';
import { Filter, Plus, RefreshCw } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Tooltip } from 'react-tooltip';
const iconBaseUrl = `${import.meta.env.VITE_STORAGE_SERVICE_HOST}/system/icons`;

interface RecordSectionProps {
  type: Type | LayoutType | null | undefined;
}

const customTypeIcon = `${iconBaseUrl}/salesync_custom_type.png`;

const RecordSection = ({ type }: RecordSectionProps) => {
  const { showModal } = useGlobalModalContext();
  const { typeId } = useParams();
  const icon = `${iconBaseUrl}/salesync_${type?.name.toLowerCase() || 'custom_type'}.png`;
  const [search, setSearch] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => {
      // setDebounceSearch(search);
      setRecordFilter({ ...recordFilter, searchTerm: search });
    }, 500);

    return () => {
      clearTimeout(timer);
    };
  }, [search]);

  const [recordFilter, setRecordFilter] = useState<RecordsFilter>({
    searchTerm: '',
    isAsc: false,
    propertyName: null,
    currentPage: 1,
    pageSize: 3000
  });

  if (!type || !typeId) {
    return null;
  }

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  return (
    <Panel className='fixed bottom-[10px] left-[10px] right-[10px] top-[108px] m-0 flex h-[calc(100dvh-120px)] max-w-[100vw] flex-col overflow-auto p-4'>
      <section className='px z-[100] flex flex-col items-center justify-between pt-4 md:flex-row'>
        <div className='flex items-center gap-2 space-x-2 align-middle'>
          <div className='w-fit cursor-pointer overflow-hidden rounded-sm'>
            <img
              className='h-10 w-10'
              src={icon}
              alt={`Icon for ${type.name}`}
              onError={(e) => {
                e.currentTarget.src = customTypeIcon;
              }}
            />
          </div>
          <div>
            <h5 className='leading-[10px]'>{type.name}</h5>
            <div className='flex cursor-pointer items-center space-x-2 border-secondary border-transparent text-[#080707] hover:border-b  hover:border-black hover:text-secondary-dark dark:border-secondary-dark dark:text-white'>
              <h1 className='text-[1.3rem]'>All Open {type.name}(s)</h1>
            </div>
          </div>
        </div>
        <section className='my-2 flex items-center justify-end'>
          <div className='flex items-center space-x-1'>
            <TextInput value={search} onChange={handleSearch} placeholder='Search this list...' prefixIcon='search' />
            <div className='flex space-x-1'>
              <Button
                data-tooltip-id='refreshTable'
                data-tooltip-content='Refresh'
                data-tooltip-place='top'
                className='aspect-square p-0'
              >
                <RefreshCw size='1rem' />
              </Button>
              <Tooltip id='refreshTable' />
              <Button
                data-tooltip-id='filterTable'
                data-tooltip-content='Filter'
                data-tooltip-place='top'
                className='aspect-square p-0'
              >
                <Filter size='1rem' />
              </Button>
              <Tooltip id='filterTable' />
              <ButtonGroup>
                <Button
                  intent='normal'
                  zoom={false}
                  className='space-x-2'
                  onClick={() => {
                    let modal = MODAL_TYPES.CREATE_RECORD_MODAL;
                    if (type.name === 'Report') {
                      modal = MODAL_TYPES.REPORT_MODAL;
                    }
                    showModal(modal, { typeId, recordFilter });
                  }}
                >
                  <Plus size='1rem' />
                  <p>New</p>
                </Button>
              </ButtonGroup>
            </div>
          </div>
        </section>
      </section>
      <div className='-mx-4 mt-4 flex-grow'>
        <RecordTable typeId={typeId} recordFilter={recordFilter} />
      </div>
    </Panel>
  );
};
export default RecordSection;
