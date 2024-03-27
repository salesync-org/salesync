import { createUser } from '@/api/users';
import { Modal, Panel, ModalFooter, PrimaryButton, TextInput, DropDown, DropDownItem } from '@/components/ui';
import UserTable from '@/components/ui/Table/UserTable';
import { useState } from 'react';
import { useParams } from 'react-router-dom';

interface props {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const UserModal = ({ isOpen, setIsOpen }: props) => {
  const [email, setEmail] = useState('');
  const [profile, setProfile] = useState('');
  const { companyName = '' } = useParams();

    const handleSubmit = (event: React.FormEvent) => {
      event.preventDefault();
      const user: NewUser = {
        email: email,
        role: profile,
        first_name: '',
        last_name: '',
        job_title: '',
        phone: ''
      };

      const token = localStorage.getItem('access_token');
      createUser(companyName, user, token ? token : '');
      setEmail('');
      setProfile('');
    };
  return (
    <Modal isOpen={isOpen} onClose={()=> setIsOpen(false)} className='h-[600px]' title='Invite your team'>
      <div className='-z-1 absolute bottom-2 left-2 right-2 top-20 overflow-x-hidden  pb-32  '>
        <form className='flex w-full flex-col place-content-center gap-2   p-6'>
          <Panel className='flex flex-col items-center bg-gray-100 p-5'>
            <div className='w-full'>
              <TextInput value={email} onChange={(e) => {setEmail(e.target.value)}} header='Email'></TextInput>
              <DropDown value='Choose Profile' onValueChange={(newValue) => setProfile(newValue)} header='Profile'>
                <DropDownItem title='System Administrator' value='admin-user'></DropDownItem>
                <DropDownItem title='Standard User' value='standard-user'></DropDownItem>
              </DropDown>
            </div>
            <PrimaryButton className='mt-5' onClick={(e) => {handleSubmit(e)}}>
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
          <PrimaryButton onClick={() => setIsOpen(false)}>Close</PrimaryButton>
        </ModalFooter>
      </Panel>
    </Modal>
  );
};

export default UserModal;
