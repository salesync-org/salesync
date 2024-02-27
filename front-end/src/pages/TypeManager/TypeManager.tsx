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
import typeApi from '@/api/typeApi';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/Table/Table';
import generateUUID from '@/constants/constant';
import { useSearchParams } from 'react-router-dom';
import Pagination from '@/components/ui/Pagination/Pagination';
import { set } from 'react-hook-form';

const TypeManager = () => {
  //Pop up modal to create new type
  const [isTypeModelOpen, setIsTypeModelOpen] = useState(false);
  //Type name in the input field
  const [typeName, setTypeName] = useState('');
  //List of types
  const [types, setTypes] = useState<Type[]>([]);
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

  // Save access token to localStorage (for testing purpose only)
  localStorage.setItem('access_token', SAMPLE_ACCESS_TOKEN);

  useEffect(() => {
    // Fetch sample data
    const fetchData = async () => {
      try {
        const res = await typeApi.getAllTypes();
        if (res) {
          console.log('Fetch Type successfully');
          console.log(res);
          setTypes(res.types);
          setTypeSearchResult(res.types);
        }
      } catch (error) {
        console.error('Fetch Type failed', error);
      }
    };

    fetchData();
  }, []);

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
    let exampleType: Type = {
      id: generateUUID(),
      name: typeName,
      description: 'This is an example type.',
      fields: [],
      links: []
    };

    try {
      const res = await typeApi.createType({ type: exampleType });
      if (res) {
        console.log('Create Type successfully');
        setTypes([res.type, ...(types || [])]);
        setTypeSearchResult([res.type, ...(types || [])]);
        return res.type;
      }
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
    <div className='mx-auto px-10'>
      <Panel>
        <div className='flex w-full flex-col'>
          <button className='self-start'>
            <div className='flex flex-row items-center'>
              <Icon name='navigate_before' className='text-link-text' />
              <div className='text-link-text underline underline-offset-2'>Go back</div>
            </div>
          </button>

          <h1 className='my-10 text-4xl font-bold'>Type Manager</h1>
          <div className='flex flex-row justify-between'>
            <TextInput
              onChange={(e) => setSearch(e.target.value)}
              className='w-auto'
              value={search}
              placeholder='Search for types'
              prefixIcon='search'
            />
            <PrimaryButton
              className='mx-8'
              onClick={() => {
                setIsTypeModelOpen(true);
              }}
              showHeader={true}
            >
              <Icon name='edit' />
              <p>Create</p>
            </PrimaryButton>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Type Name</TableHead>
                <TableHead>No. Fields</TableHead>
                <TableHead>No. Links</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {typeSearchResult &&
                typeSearchResult.map((type: Type) => {
                  return (
                    <TableRow key={type.id}>
                      <TableCell className='font-medium'>{type.name}</TableCell>
                      <TableCell>{type.fields.length}</TableCell>
                      <TableCell>{type.links.length}</TableCell>
                      <TableCell>
                        <button>
                          <Icon name='navigate_next'></Icon>
                        </button>
                      </TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
          <Pagination totalPages={15} currentPage={+page} onPageChange={handleOnPageChange} />
        </div>
      </Panel>

      <Modal isOpen={isTypeModelOpen} onOpenChange={setIsTypeModelOpen} title='Create new Type'>
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

export default TypeManager;
