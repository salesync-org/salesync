import { RecordsFilter } from '@/api/record';
import RecordTable from '@/components/Records/RecordTable';
import { ButtonGroup, DropDown } from '@/components/ui';
import Button from '@/components/ui/Button/Button';
import Icon from '@/components/ui/Icon/Icon';
import Panel from '@/components/ui/Panel/Panel';
import TextInput from '@/components/ui/TextInput/TextInput';
import { MODAL_TYPES, useGlobalModalContext } from '@/context/GlobalModalContext';
// import { Type } from '@/type';
import icon from 'assets/type-icon/lead_icon.png';
import { useState } from 'react';
import { useParams } from 'react-router-dom';

interface RecordSectionProps {
  type: Type | LayoutType | null | undefined;
}

const RecordSection = ({ type }: RecordSectionProps) => {
  const { showModal } = useGlobalModalContext();
  const { typeId } = useParams();
  const [search, setSearch] = useState('');
  const [recordFilter] = useState<RecordsFilter>({
    searchTerm: '',
    isAsc: false,
    propertyName: null,
    currentPage: 1,
    pageSize: 300
  });

  if (!type || !typeId) {
    return null;
  }

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);

    setTimeout(() => {
      console.log(search);
    }, 3000);
  };

  return (
    <Panel className='m-0 h-[calc(100dvh-160px)] max-w-[100vw] overflow-auto p-4'>
      <section className='px flex items-center justify-between pt-4'>
        <div className='flex items-center gap-2'>
          <div className='w-fit cursor-pointer overflow-hidden rounded-sm bg-primary-color'>
            <img className='h-10 w-10' src={icon} alt={`Icon for ${type.name}`} />
          </div>
          <div>
            <h5 className='leading-[10px]'>{type.name}</h5>
            <div className='flex cursor-pointer items-center space-x-2 border-secondary border-transparent text-[#080707] hover:border-b  hover:border-black hover:text-secondary-dark dark:border-secondary-dark dark:text-white'>
              <h1 className='text-[1.3rem]'>All Open {type.name}</h1>
              <Icon name='arrow_drop_down' size='32px' />
            </div>
          </div>
        </div>
        <ButtonGroup>
          <Button
            intent='normal'
            zoom={false}
            onClick={() => {
              showModal(MODAL_TYPES.CREATE_RECORD_MODAL, { typeId, recordFilter });
            }}
          >
            New
          </Button>
        </ButtonGroup>
      </section>
      <section className='my-2 flex items-center justify-end'>
        <div className='flex items-center space-x-1'>
          <TextInput value={search} onChange={handleSearch} placeholder='Search this list...' prefixIcon='search' />
          <div className='hidden space-x-1 md:flex'>
            <DropDown
              value=''
              defaultValue=''
              className='space-x-0 px-3'
              prefixIcon={<Icon name='settings' />}
              suffixIcon={<Icon name='expand_more' />}
              children={undefined}
            ></DropDown>
            <DropDown
              value=''
              defaultValue=''
              className='space-x-0 px-3'
              prefixIcon={<Icon name='table' />}
              suffixIcon={<Icon name='expand_more' />}
              children={undefined}
            ></DropDown>
            <Button className='aspect-square'>
              <Icon name='replay' />
            </Button>
            <Button className='aspect-square'>
              <Icon name='edit' />
            </Button>
            <Button className='aspect-square'>
              <Icon name='pie_chart' />
            </Button>
            <Button className='aspect-square'>
              <Icon name='filter_alt' />
            </Button>
          </div>
        </div>
      </section>
      <div className='-mx-4 mt-4'>
        <RecordTable typeId={typeId} recordFilter={recordFilter} />
      </div>
    </Panel>
  );
};
export default RecordSection;
