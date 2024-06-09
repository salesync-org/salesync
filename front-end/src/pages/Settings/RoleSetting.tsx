import { useEffect, useState } from 'react';
import Panel from '@/components/ui/Panel/Panel';
import TextInput from '@/components/ui/TextInput/TextInput';
import useDebounce from '@/hooks/useDebounce';
import Button from '@/components/ui/Button/Button';
import Icon from '@/components/ui/Icon/Icon';
import PrimaryButton from '@/components/ui/Button/PrimaryButton';
import Modal, { ModalFooter } from '@/components/ui/Modal/Modal';
import '@/constants/api';
import { useParams, useSearchParams } from 'react-router-dom';
import { Table, TableBody, TableCell, TableHeader, TableRow } from '@/components/ui/Table';
import useAuth from '@/hooks/useAuth';
import { getUsers } from '@/api/users';
import { AvatarGroup, TextArea } from '@/components/ui';
import { UserPlus } from 'lucide-react';
import ToggleButton from '@/components/ui/ToggleButton/ToggleButton';
import { createRole } from '@/api/roles';
import { useToast } from '@/components/ui/Toast';
import AssignRoleToUserModal from './AssignRoleToUserModal';
import LoadingSpinner from '@/components/ui/Loading/LoadingSpinner';
import NotFoundImage from '@/components/NotFoundImage/NotFoundImage';

const RoleSetting = () => {
  //Pop up modal to create new type
  const [isRoleModalOpen, setRoleModal] = useState<Role | null>(null);
  const [isAssignModalOpen, setAssignModalOpen] = useState<Role | null>(null);
  const { companyName } = useParams();

  const { getRoles, getPermissions } = useAuth();
  const [roles, setRoles] = useState<Role[]>([]);
  const [permissions, setPermissions] = useState<{ permission: Permission; isSelected: boolean }[]>([]);
  const [users, setUsers] = useState<SimpleUser[]>([]);
  const [roleSearchResult, setRoleSearchResult] = useState<Role[]>([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const { toast } = useToast();
  const [search, setSearch] = useState(() => {
    return searchParams.get('search') || '';
  });
  const debouncedSearch = useDebounce(search, 500);
  const loadUsers = async () => {
    const newUsers = await getUsers(companyName ?? '');
    setUsers(newUsers);
  };

  useEffect(() => {
    const fetchRoles = async () => {
      const result = await getRoles(companyName ?? '');
      setRoles(result || []);
    };
    const fetchPermission = async () => {
      const result = await getPermissions(companyName ?? '');
      const permissionSet = result?.map((permission) => {
        return { permission: permission, isSelected: false };
      });
      setPermissions(permissionSet ?? []);
    };
    fetchRoles();
    fetchPermission();
    loadUsers();
  }, [companyName, getRoles, getPermissions]);

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

  const resetPermissions = () => {
    setPermissions(
      permissions.map((permission) => {
        return { ...permission, isSelected: false };
      })
    );
  };

  //Handle submit when creating new type
  const handleSubmit = async () => {
    if (isRoleModalOpen) {
      const selectedPermissions = permissions
        .filter((permission) => permission.isSelected)
        .map((permission) => permission.permission);
      const newRole: Role = {
        role_id: '',
        role_name: isRoleModalOpen.role_name,
        description: isRoleModalOpen.description,
        permissions: selectedPermissions
      };
      const result = await createRole(companyName ?? '', newRole);
      if (result) {
        setRoleModal(null);
        resetPermissions();
        setRoles([...roles, result]);
        toast({
          title: 'Success',
          description: 'Role created successfully'
        });
      } else {
        toast({
          title: 'Error',
          description: 'Failed to create role. Role name is duplicated'
        });
      }
    }
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
          <div className='h-full min-h-full overflow-y-scroll'>
            <div className='h-full overflow-y-scroll rounded border-2 border-input-stroke-light dark:border-input-stroke-dark'>
              {roles.length > 0 ? (
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
                    {roleSearchResult.length > 0 ? (
                      roleSearchResult.map(
                        (role) =>
                          role.role_name !== `default-roles-${companyName}` && (
                            <TableRow key={role.role_id}>
                              <TableCell>
                                <td>
                                  <div className='w-fit'>
                                    <div className='my-2 text-[1.2rem] font-semibold text-primary-bold dark:text-secondary-light'>
                                      {role.role_name}
                                    </div>
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
                                </td>
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
                                  className='flex w-40 rounded-full p-0 px-4'
                                  onClick={() => {
                                    setAssignModalOpen(role);
                                  }}
                                >
                                  <UserPlus size='1rem' />
                                  <p>Assign Users</p>
                                </Button>
                              </TableCell>
                            </TableRow>
                          )
                      )
                    ) : (
                      <div className='flex h-full items-center justify-center'>
                        <NotFoundImage />
                      </div>
                    )}
                  </TableBody>
                </Table>
              ) : (
                <div className='flex h-full items-center justify-center'>
                  <LoadingSpinner />
                </div>
              )}
            </div>
          </div>
        </div>
      </Panel>

      <Modal
        isOpen={!!isRoleModalOpen}
        onClose={() => {
          setRoleModal(null);
          resetPermissions();
        }}
        className='mx-auto w-full'
        title={isRoleModalOpen?.role_id ? 'Edit Role' : 'Create New Role'}
      >
        <form className='w-full'>
          <div className='grid-col-1 grid h-full max-h-full'>
            <div className='grid grid-cols-5 gap-10 overflow-scroll'>
              <div className='col-span-3 flex flex-col gap-2'>
                <div className='mb-2 flex items-baseline'>
                  <h3 className='min-w-[100px]'>Role Details</h3>
                  <div className='w-full border-b-2 border-button-stroke-light py-4 dark:border-button-stroke-dark'></div>
                </div>
                <TextInput
                  header='Role Name'
                  className='w-full'
                  onChange={(e) => {
                    if (isRoleModalOpen) {
                      isRoleModalOpen.role_name = e.target.value;
                    }
                  }}
                  defaultValue={isRoleModalOpen?.role_name}
                  readOnly={isRoleModalOpen?.role_id ? true : false}
                  disabled={isRoleModalOpen?.role_id ? true : false}
                  placeholder='Enter a name for the role'
                />
                <TextArea
                  header='Description'
                  className='w-full'
                  onChange={(e) => {
                    if (isRoleModalOpen) {
                      isRoleModalOpen.description = e.target.value;
                    }
                  }}
                  placeholder='Enter a description for the role'
                />
              </div>
              <div className='col-span-2 flex max-h-[350px] flex-col gap-5'>
                <div className='flex items-baseline'>
                  <h3 className='min-w-[100px]'>Permissions</h3>
                  <div className='w-full border-b-2 border-button-stroke-light py-4 dark:border-button-stroke-dark'></div>
                </div>
                <div className='flex h-fit flex-wrap space-x-2'>
                  {permissions &&
                    permissions.map((permission) => (
                      <div key={permission.permission.permission_id}>
                        <ToggleButton
                          className='my-2 w-full'
                          onToggle={() => {
                            setPermissions(
                              permissions.map((p) => {
                                if (p.permission.permission_id === permission.permission.permission_id) {
                                  return { ...p, isSelected: !p.isSelected };
                                }
                                return p;
                              })
                            );
                          }}
                          isToggled={permission.isSelected}
                        >
                          {permission.permission.permission_name}
                        </ToggleButton>
                      </div>
                    ))}
                </div>
              </div>
            </div>

            <ModalFooter className='mt-8 w-full'>
              <Button
                onClick={() => {
                  setRoleModal(null);
                  resetPermissions();
                }}
              >
                Cancel
              </Button>
              <PrimaryButton onClick={() => handleSubmit()}>
                {isRoleModalOpen?.role_id ? 'Save' : 'Create'}
              </PrimaryButton>
            </ModalFooter>
          </div>
        </form>
      </Modal>
      <AssignRoleToUserModal
        isOpen={isAssignModalOpen != null}
        onClose={() => {
          setAssignModalOpen(null);
          loadUsers();
        }}
        role={isAssignModalOpen ?? { role_id: '', role_name: '', description: '', permissions: [] }}
        users={users}
      />
    </div>
  );
};

export default RoleSetting;
