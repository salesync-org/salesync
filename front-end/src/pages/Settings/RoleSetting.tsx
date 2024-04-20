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
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/Table';
import useAuth from '@/hooks/useAuth';
import { getUsers } from '@/api/users';
import { AvatarGroup, TextArea } from '@/components/ui';
import { Pencil } from 'lucide-react';

const RoleSetting = () => {
  //Pop up modal to create new type
  const [isRoleModalOpen, setRoleModal] = useState<Role | null>(null);
  //Type name in the input field
  const [typeName, setTypeName] = useState('');
  const { companyName } = useParams();

  const { getRoles } = useAuth();
  const [roles, setRoles] = useState<Role[]>([]);
  const [users, setUsers] = useState<SimpleUser[]>([]);
  const [roleSearchResult, setRoleSearchResult] = useState<Role[]>([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState(() => {
    return searchParams.get('search') || '';
  });
  const debouncedSearch = useDebounce(search, 500);

  useEffect(() => {
    const fetchRoles = async () => {
      const result = await getRoles(companyName ?? '');
      console.log('result');
      console.log(result);
      setRoles(result || []);
    };
    const loadUsers = async () => {
      const newUsers = await getUsers(companyName ?? '');
      setUsers(newUsers);
    };
    fetchRoles();
    loadUsers();
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
    setRoleModal(null);
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
                placeholder='Search for roles'
                prefixIcon='search'
              />
            </div>
            <PrimaryButton
              className='ml-2'
              onClick={() => {
                setRoleModal({} as Role);
              }}
              showHeader={true}
            >
              <Icon name='edit' />
              <p>Create</p>
            </PrimaryButton>
          </div>
          <div className='h-full min-h-full overflow-scroll'>
            <div className='h-full overflow-y-scroll rounded border-2 border-input-stroke-light dark:border-input-stroke-dark'>
              <Table className='h-full'>
                <TableHeader className='max-h-full rounded-sm border-b-2 border-input-stroke-light dark:border-input-stroke-dark'>
                  <TableRow>
                    <TableCell className='font-semibold'>Role Name</TableCell>
                    <TableCell className='font-semibold'>Description</TableCell>
                    <TableCell className='font-semibold'>Users</TableCell>
                    <TableCell className='font-semibold'></TableCell>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {roleSearchResult.map(
                    (role) =>
                      role.role_name !== `default-roles-${companyName}` && (
                        <TableRow key={role.role_id}>
                          <TableCell>
                            <div className='w-fit'>
                              <div className='my-2'>{role.role_name}</div>
                              <div className=' flex w-fit flex-wrap space-x-2'>
                                {role.permissions &&
                                  role.permissions.map((permission) => (
                                    <div
                                      key={permission.permission_id}
                                      className='my-2 mr-1 w-fit text-ellipsis text-nowrap rounded-full bg-gray-200 px-3 py-1 text-xs dark:bg-slate-600'
                                    >
                                      {permission.permission_name}
                                    </div>
                                  ))}
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>{role.description ?? 'No Description'}</TableCell>
                          <TableCell>
                            <AvatarGroup
                              maxAvatars={3}
                              users={users.filter((user) => user.roles.includes(role.role_name))}
                            ></AvatarGroup>
                          </TableCell>
                          <TableCell>
                            <Button
                              rounded
                              className='h-10 w-10 rounded-full p-0'
                              onClick={() => {
                                setRoleModal(role);
                              }}
                            >
                              <Pencil size='1rem'></Pencil>
                            </Button>
                          </TableCell>
                        </TableRow>
                      )
                  )}
                </TableBody>
              </Table>
            </div>
          </div>
        </div>
      </Panel>

      <Modal
        isOpen={!!isRoleModalOpen}
        onClose={() => {
          setRoleModal(null);
        }}
        className='h-[400px]'
        title={isRoleModalOpen?.role_id ? 'Edit Role' : 'Create New Role'}
      >
        <form>
          <div className='grid grid-cols-5 place-content-center gap-10'>
            <div className='col-span-3 flex flex-col gap-2 '>
              <div className='mb-2 flex items-baseline'>
                <h3 className='min-w-[100px]'>Role Details</h3>
                <div className='w-full border-b-2 border-button-stroke-light py-4 dark:border-button-stroke-dark'></div>
              </div>
              <TextInput
                onChange={(e) => setTypeName(e.target.value)}
                header='Role Name'
                className='w-full'
                defaultValue={isRoleModalOpen?.role_name}
                readOnly
                disabled
                placeholder='Enter a name for the role'
              />
              <TextArea header='Description' className='w-full' placeholder='Enter a description for the role' />
            </div>
            <div className='col-span-2 flex flex-col gap-5'>
              <div className='flex items-baseline'>
                <h3 className='min-w-[100px]'>Permissions</h3>
                <div className='w-full border-b-2 border-button-stroke-light py-4 dark:border-button-stroke-dark'></div>
              </div>
            </div>
          </div>
          <ModalFooter className='mt-8'>
            <Button onClick={() => setRoleModal(null)}>Cancel</Button>
            <PrimaryButton onClick={() => handleSubmit()}>Save</PrimaryButton>
          </ModalFooter>
        </form>
      </Modal>
    </div>
  );
};

export default RoleSetting;
