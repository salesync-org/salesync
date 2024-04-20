import { DropDown, DropDownItem, ErrorText, Panel, PrimaryButton, TextInput } from '@/components/ui';
import { cn } from '@/utils/utils';
import { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { createUser, getUsers } from '@/api/users';
import { loadRoles } from '@/api/roles';
import UserTable from '@/components/ui/Table/UserTable';

const UserSetting = () => {
  const { companyName } = useParams();
  const [email, setEmail] = useState('');
  const [roles, setRoles] = useState<Role[]>([]);
  const [users, setUsers] = useState<SimpleUser[]>([]);
  const [profile, setProfile] = useState('');
  const [errors, setErrors] = useState({
    email: '',
    profile: ''
  });
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

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const user: NewUser = {
      email: email,
      role: profile,
      first_name: 'Unknown',
      last_name: 'Name',
      job_title: 'None',
      phone: 'None'
    };

    if (!email) {
      setErrors((prev) => ({ ...prev, email: 'Email is required' }));
      return;
    }

    if (!profile) {
      setErrors((prev) => ({ ...prev, profile: 'Profile is required' }));
      return;
    }

    const token = localStorage.getItem('access_token');
    const companyName = location.pathname.split('/')[1];

    if (companyName && token) {
      createUser(companyName, user, token ? token : '');
      setEmail('');
      setProfile('');
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
        <div className='mx-6 flex-grow'>
          <h2 className='border-b-2 border-button-stroke-light py-4 dark:border-button-stroke-dark'>Add New User</h2>
        </div>
        <form className='flex w-full flex-col place-content-center gap-2 p-6'>
          <Panel className='flex flex-col items-center bg-gray-100 p-5'>
            <div className='w-1/2'>
              <TextInput
                value={email}
                className='w-full'
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                header='Email'
                placeholder='Enter an email address'
                isError={!!errors.email}
              ></TextInput>
              {errors.email && <ErrorText className='text-sm text-red-500' text={errors.email} />}
              <DropDown
                isError={!!errors.profile}
                defaultValue='Choose Profile'
                value='Choose Profile'
                onValueChange={(newValue) => setProfile(newValue)}
                className='w-full'
                header='Profile'
              >
                {roles &&
                  roles.map((role) => (
                    <DropDownItem title={convertToHyphenFormat(role.role_name)} value={role.role_name}></DropDownItem>
                  ))}
              </DropDown>
              {errors.email && <ErrorText className='text-sm text-red-500' text={errors.profile} />}
            </div>
            <PrimaryButton
              className='mt-5'
              onClick={(e) => {
                handleSubmit(e);
              }}
            >
              Send Invitation
            </PrimaryButton>
          </Panel>
        </form>

        <div className='flex flex-col items-center px-10'>
          <h2 className='mb-10'>Users and invitations</h2>
          <UserTable users={users}></UserTable>
        </div>
      </div>
    </Panel>
  );
};

export default UserSetting;
