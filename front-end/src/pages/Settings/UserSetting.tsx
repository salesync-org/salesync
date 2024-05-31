import { DropDown, DropDownItem, ErrorText, Panel, PrimaryButton, TextInput } from '@/components/ui';
import { cn } from '@/utils/utils';
import { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { createUser, getUsers } from '@/api/users';
import { loadRoles } from '@/api/roles';
import UserTable from '@/components/ui/Table/UserTable';
import { set } from 'date-fns';
import LoadingSpinnerSmall from '@/components/ui/Loading/LoadingSpinnerSmall';

const blankUser = {
  email: '',
  role: '',
  first_name: '',
  last_name: '',
  job_title: 'None',
  phone: 'None'
};

const UserSetting = () => {
  const { companyName } = useParams();
  const [newUser, setNewUser] = useState<NewUser>(blankUser);
  const [roles, setRoles] = useState<Role[]>([]);
  const [isSending, setIsSending] = useState<boolean>(false);
  const [users, setUsers] = useState<SimpleUser[]>([]);

  const [errors, setErrors] = useState<NewUser>(blankUser);
  const location = useLocation();
  useEffect(() => {
    const getProfiles = async () => {
      console.log('companyName', companyName);
      const roles = await loadRoles(companyName ?? '');
      console.log('roles' + roles);
      setRoles(roles);
    };

    const loadUsers = async () => {
      const newUsers = await getUsers(companyName ?? '');
      setUsers(newUsers);
    };
    getProfiles();
    loadUsers();
  }, []);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsSending(true);
    Object.entries(newUser).forEach(([key, value]) => {
      if (value === '') {
        setErrors((prev) => ({ ...prev, [key]: `Field is required` }));
      }
    });

    const token = localStorage.getItem('access_token');
    const companyName = location.pathname.split('/')[1];

    if (companyName && token) {
      createUser(companyName, newUser, token ? token : '').then(() => {
        setIsSending(false);
        setUsers((prev) => [
          ...prev,
          {
            avatar_url: 'default',
            first_name: newUser.first_name,
            last_name: newUser.last_name,
            roles: [newUser.role],
            email: newUser.email,
            user_id: '1',
            user_name: newUser.email.split('@')[0]
          }
        ]);
      });
      setNewUser(blankUser);
    }
  };

  const convertToHyphenFormat = (str: string): string => {
    const words = str.split('-');
    const capitalizedWords = words.map((word) => word.charAt(0).toUpperCase() + word.slice(1));
    return capitalizedWords.join(' ');
  };

  return (
    <Panel className={cn('m-0 grid h-full grid-cols-1 px-4 py-6')}>
      <div className=' overflow-y-scroll'>
        <div className='mb-2 flex items-baseline space-x-2 px-4'>
          <h3 className='flex-shrink-0'>Add New User</h3>
          <div className='w-full border-b-2 border-button-stroke-light py-4 dark:border-button-stroke-dark'></div>
        </div>
        <form className='flex w-full flex-col place-content-center gap-2 p-6'>
          <div className='flex flex-col items-center rounded-xl border-[1px] border-input-stroke p-5 dark:border-input-stroke-dark'>
            <div className='flex w-full space-x-4'>
              <div className='flex-grow'>
                <TextInput
                  value={newUser.first_name}
                  className='w-full'
                  onChange={(e) => {
                    setNewUser((prev) => ({ ...prev, first_name: e.target.value }));
                  }}
                  header='First Name'
                  placeholder='Enter the user first name'
                  isError={!!errors.first_name}
                ></TextInput>
                {errors.first_name && <ErrorText className='text-sm text-red-500' text={errors.first_name} />}
                <TextInput
                  value={newUser.last_name}
                  className='w-full'
                  onChange={(e) => {
                    setNewUser((prev) => ({ ...prev, last_name: e.target.value }));
                  }}
                  header='Last Name'
                  placeholder='Enter the user last name'
                  isError={!!errors.last_name}
                ></TextInput>
                {errors.last_name && <ErrorText className='text-sm text-red-500' text={errors.last_name} />}
              </div>
              <div className='flex-grow'>
                <TextInput
                  value={newUser.email}
                  className='w-full'
                  onChange={(e) => {
                    setNewUser((prev) => ({ ...prev, email: e.target.value }));
                  }}
                  header='Email'
                  placeholder="Enter the user's email"
                  isError={!!errors.email}
                ></TextInput>
                {errors.email && <ErrorText className='text-sm text-red-500' text={errors.email} />}
                <DropDown
                  isError={!!errors.role}
                  defaultValue='Choose Profile'
                  value='Choose Profile'
                  onValueChange={(newValue) => setNewUser((prev) => ({ ...prev, role: newValue }))}
                  className='w-full'
                  header='Profile'
                >
                  {roles &&
                    roles.map((role) => (
                      <DropDownItem title={convertToHyphenFormat(role.role_name)} value={role.role_name}></DropDownItem>
                    ))}
                </DropDown>
                {errors.email && <ErrorText className='text-sm text-red-500' text={errors.role} />}
              </div>
            </div>
            <PrimaryButton
              className='mt-5 self-end'
              onClick={(e) => {
                handleSubmit(e);
              }}
            >
              {isSending && <LoadingSpinnerSmall className='h-[1.2rem] w-[1.2rem]'></LoadingSpinnerSmall>}
              <p>Send Invitation</p>
            </PrimaryButton>
          </div>
        </form>

        <div className='mb-2 flex items-baseline space-x-2 px-4'>
          <h3 className='flex-shrink-0'>User List</h3>
          <div className='w-full border-b-2 border-button-stroke-light py-4 dark:border-button-stroke-dark'></div>
        </div>
        <div className='mt-5 flex flex-col items-center px-10'>
          <UserTable users={users}></UserTable>
        </div>
      </div>
    </Panel>
  );
};

export default UserSetting;
