import { createUser } from '@/api/users';
import {
  DropDown,
  DropDownItem,
  ErrorText,
  Modal,
  ModalFooter,
  Panel,
  PrimaryButton,
  TextInput
} from '@/components/ui';
import UserTable from '@/components/ui/Table/UserTable';
import { MODAL_TYPES, useGlobalModalContext } from '@/context/GlobalModalContext';
import { NewUser } from '@/type';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';

const UserModal = () => {
  const [email, setEmail] = useState('');
  const [profile, setProfile] = useState('');

  const [errors, setErrors] = useState({
    email: '',
    profile: ''
  });

  const location = useLocation();
  const {
    hideModal,
    store: { modalType }
  } = useGlobalModalContext();

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
    <Modal
      isOpen={modalType === MODAL_TYPES.USER_MODAL}
      onClose={hideModal}
      className='h-[600px]'
      title='Invite your team'
    >
      <div className='-z-1 overflow-x-hidden  pb-32  '>
        <form className='flex w-full flex-col place-content-center gap-2   p-6'>
          <Panel className='flex flex-col items-center bg-gray-100 p-5'>
            <div className='w-full'>
              <TextInput
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                header='Email'
                isError={!!errors.email}
              ></TextInput>
              {errors.email && <ErrorText className='text-sm text-red-500' text={errors.email} />}
              <DropDown
                isError={!!errors.profile}
                value='Choose Profile'
                onValueChange={(newValue) => setProfile(newValue)}
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

      <Panel className='absolute bottom-0 left-0 right-0 m-0   -mt-4 flex h-10 items-center justify-end bg-gray-100 bg-opacity-90 px-3  py-10 shadow-inner'>
        <ModalFooter className='m-0 '>
          <PrimaryButton onClick={hideModal}>Close</PrimaryButton>
        </ModalFooter>
      </Panel>
    </Modal>
  );
};

export default UserModal;
