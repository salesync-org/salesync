import { useEffect, useState } from 'react';
import Panel from '@/components/ui/Panel/Panel';
import TextInput from '@/components/ui/TextInput/TextInput';
import useDebounce from '@/hooks/useDebounce';
import Button from '@/components/ui/Button/Button';
import Icon from '@/components/ui/Icon/Icon';
import PrimaryButton from '@/components/ui/Button/PrimaryButton';
import Modal, { ModalFooter } from '@/components/ui/Modal/Modal';
import DropDown from '@/components/ui/DropDown/DropDown';
import Item from '@/components/ui/Item/Item';
import '@/constants/api';
import { SAMPLE_ACCESS_TOKEN } from '@/constants/api';
import { useSearchParams } from 'react-router-dom';
import Pagination from '@/components/ui/Pagination/Pagination';
import TypeTable from '@/components/ui/Table/TypeTable';
import useType from '@/hooks/type-service/useType';

const ObjectManager = () => {
  //Pop up modal to create new type
  const [isTypeModelOpen, setIsTypeModelOpen] = useState(false);
  //Type name in the input field
  const [typeName, setTypeName] = useState('');
  //List of types
  const { types } = useType();
  //List of types after search
  const [typeSearchResult, setTypeSearchResult] = useState<Type[]>([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState(() => {
    return searchParams.get('search') || '';
  });
  const debouncedSearch = useDebounce(search, 500);
  const [page, setPage] = useState(() => {
    return searchParams.get('page') || '1';
  });

  useEffect(() => {
    // Fetch sample data
    const fetchData = async () => {
      setTypeSearchResult(types ?? []);
    };

    fetchData();
  }, [types]);

  //Search for types
  useEffect(() => {
    const handleSearch = () => {
      const searchResult =
        types &&
        types.filter((item) => {
          return Object.values(item).join('').toLowerCase().includes(debouncedSearch.toLowerCase());
        });

      return searchResult;
    };

    if (debouncedSearch || debouncedSearch === '') {
      searchParams.set('search', debouncedSearch);
      setSearchParams(searchParams);
      setTypeSearchResult(handleSearch() as Type[]);
    }
  }, [debouncedSearch, searchParams, setSearchParams]);

  //create Type sample data and add to types
  const handleCreateType = async () => {
    try {
      // const res = await typeApi.createType({ typeName: typeName, template: 'Account' });
      // if (res) {
      //   console.log('Create Type successfully');
      //   setTypes([res, ...(types || [])]);
      //   setTypeSearchResult([res, ...(types || [])]);
      //   return res;
      // }
    } catch (error) {
      console.error('Create Type failed', error);
    }
  };

  //Handle submit when creating new type
  const handleSubmit = () => {
    if (!typeName) {
      return;
    }
    setIsTypeModelOpen(false);
    handleCreateType();
    setTypeName('');
  };

  //Handle page change
  const handleOnPageChange = (page: number) => {
    searchParams.set('page', page.toString());
    setSearchParams(searchParams);
    setPage(page.toString());
  };
  return (
    <div className='h-full w-full'>
      <Panel className='m-0 h-full'>
        <div className='grid-col-1 grid h-full w-full grid-rows-[48px_1fr]'>
          <div className='mb-10 flex h-fit flex-row justify-between'>
            <div className='flex-grow'>
              <TextInput
                onChange={(e) => setSearch(e.target.value)}
                className='w-full'
                value={search}
                placeholder='Search for types'
                prefixIcon='search'
              />
            </div>
            <PrimaryButton
              className='mx-2'
              onClick={() => {
                setIsTypeModelOpen(true);
              }}
              showHeader={true}
            >
              <Icon name='edit' />
              <p>Create</p>
            </PrimaryButton>
          </div>
          <div className='h-full min-h-full overflow-scroll'>
            <TypeTable types={typeSearchResult}></TypeTable>
          </div>

          <div className='hidden'>
            <Pagination totalPages={15} currentPage={+page} onPageChange={handleOnPageChange} />
          </div>
        </div>
      </Panel>

      <Modal
        isOpen={isTypeModelOpen}
        onClose={() => {
          setIsTypeModelOpen(false);
        }}
        title='Create new Type'
      >
        <form>
          <div className='grid grid-cols-5 place-content-center gap-3'>
            <div className='col-span-3 flex flex-col gap-2'>
              <TextInput
                onChange={(e) => setTypeName(e.target.value)}
                header='Type Name'
                className='w-full'
                value={typeName}
                placeholder='Search for something'
              />
            </div>
            <div className='col-span-2 flex flex-col gap-2'>
              <DropDown header='Template' value='Select a value'>
                <Item title='Account' />
                <Item title='Contact' />
                <Item title='Lead' />
                <Item title='Opportunity' />
              </DropDown>
            </div>
          </div>
          <ModalFooter className='mt-8'>
            <Button onClick={() => setIsTypeModelOpen(false)}>Cancel</Button>
            <PrimaryButton onClick={() => handleSubmit()}>Save</PrimaryButton>
          </ModalFooter>
        </form>
      </Modal>
    </div>
  );
};

export default ObjectManager;
