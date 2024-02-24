import { useState } from 'react';
import PrimaryButton from 'ui/Button/PrimaryButton';
import Modal, { ModalFooter } from 'ui/Modal/Modal';
import TextInput from 'ui/TextInput/TextInput';
import DropDown from 'ui/DropDown/DropDown';
import Item from 'ui/Item/Item';
import Button from 'ui/Button/Button';

function ModalPanel() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <PrimaryButton onClick={() => setIsOpen(true)}>Open modal</PrimaryButton>

      <Modal isOpen={isOpen} onOpenChange={setIsOpen} title='Create new Type'>
        <form>
          <div className='grid grid-cols-5 place-content-center gap-3'>
            <div className='col-span-3 flex flex-col gap-2'>
              <TextInput header='Type Name' className='w-full' value='' placeholder='Search for something' />
            </div>
            <div className='col-span-2 flex flex-col gap-2'>
              <DropDown header='Template' value='Select a value'>
                <Item title='Item 1' />
                <Item title='Item 2' />
                <Item title='Item 3' />
                <Item title='Item 4' />
              </DropDown>
            </div>
          </div>
          <ModalFooter className='mt-8'>
            <Button onClick={() => setIsOpen(false)}>Cancel</Button>
            <PrimaryButton onClick={() => setIsOpen(false)}>Save</PrimaryButton>
          </ModalFooter>
        </form>
      </Modal>
    </>
  );
}

export default ModalPanel;
