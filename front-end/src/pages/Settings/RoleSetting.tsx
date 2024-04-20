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
import { useParams, useSearchParams } from 'react-router-dom';
import Pagination from '@/components/ui/Pagination/Pagination';
import TypeTable from '@/components/ui/Table/TypeTable';
import useType from '@/hooks/type-service/useType';
import { Table, TableBody, TableCell, TableHead, TableRow } from '@/components/ui/Table';
import useAuth from '@/hooks/useAuth';

const RoleSetting = () => {
  //Pop up modal to create new type
  const [isTypeModelOpen, setIsTypeModelOpen] = useState(false);
  //Type name in the input field
  const [typeName, setTypeName] = useState('');
  const { companyName } = useParams();

  const { getRoles } = useAuth();
  const [roles, setRoles] = useState<Role[]>([]);
  const [roleSearchResult, setRoleSearchResult] = useState<Role[]>([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState(() => {
    return searchParams.get('search') || '';
  });
  const debouncedSearch = useDebounce(search, 500);
  const [page, setPage] = useState(() => {
    return searchParams.get('page') || '1';
  });

  useEffect(() => {
    const fetchRoles = async () => {
      const result = await getRoles(companyName ?? '');
      console.log('result');
      console.log(result);
      setRoles(result || []);
    };
    fetchRoles();
  }, [companyName, getRoles]);

  useEffect(() => {
    const fetchData = async () => {
      setRoleSearchResult(roles);
    };
    fetchData();
  }, [roles]);

  //Search for types
  useEffect(() => {
    const handleSearch = () => {
      const searchResult =
        roles &&
        roles.filter((role) => {
          return Object.values(role).join('').toLowerCase().includes(debouncedSearch.toLowerCase());
        });

      return searchResult;
    };

    if (debouncedSearch || debouncedSearch === '') {
      searchParams.set('search', debouncedSearch);
      setSearchParams(searchParams);
      setRoleSearchResult(handleSearch() as Role[]);
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
              className='ml-2'
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
            <Table>
              <TableHead>
                <TableCell className='font-semibold'>Role Name</TableCell>
              </TableHead>
              <TableBody>
                {roleSearchResult.map(
                  (role) =>
                    role.role_name !== `default-roles-${companyName}` && (
                      <TableRow key={role.role_id}>
                        <TableCell>{role.role_name}</TableCell>
                      </TableRow>
                    )
                )}
              </TableBody>
            </Table>
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

export default RoleSetting;
