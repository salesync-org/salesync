import { Modal, Panel, ModalFooter, PrimaryButton, TextInput, DropDown, DropDownItem } from '@/components/ui';
import UserTable from '@/components/ui/Table/UserTable';

interface props {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const UserModal = ({ isOpen, setIsOpen }: props) => {
  return (
    <Modal isOpen={isOpen} onClose={()=> setIsOpen(false)} className='h-[600px]' title='Invite your team'>
      <div className='-z-1 absolute bottom-2 left-2 right-2 top-20 overflow-x-hidden  pb-32  '>
        <form className='flex w-full flex-col place-content-center gap-2   p-6'>
          <Panel className='flex flex-col items-center bg-gray-100 p-5'>
            <div className='w-full'>
              <TextInput header='Email'></TextInput>
              <DropDown value='Choose Profile' header='Profile'>
                <DropDownItem title='System Administrator' value='123'></DropDownItem>
                <DropDownItem title='Standard User' value='123'></DropDownItem>
              </DropDown>
            </div>
            <PrimaryButton className='mt-5' onClick={() => {}}>
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
