import { Button, DropDown, DropDownItem, ErrorText, Modal, Panel, PrimaryButton, TextInput } from '@/components/ui';
import useAuth from '@/hooks/useAuth';
import { Pencil } from 'lucide-react';
import { cn } from '@/utils/utils';
import { useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';
import { createUser, uploadAvatar } from '@/api/users';
import UserTable from '@/components/ui/Table/UserTable';
import { useGlobalModalContext } from '@/context/GlobalModalContext';

const UserSetting = () => {
  const [email, setEmail] = useState('');
  const [profile, setProfile] = useState('');

  const [errors, setErrors] = useState({
    email: '',
    profile: ''
  });

  const location = useLocation();

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
  return (
    <Panel className={cn('m-0 grid h-full grid-cols-1 px-4 py-6')}>
      <div className=' overflow-y-scroll'>
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
                <DropDownItem title='System Administrator' value='admin-user'></DropDownItem>
                <DropDownItem title='Standard User' value='standard-user'></DropDownItem>
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
          <UserTable></UserTable>
        </div>
      </div>
    </Panel>
  );
};

export default UserSetting;
