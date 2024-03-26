import { useState } from 'react';
import { PrimaryButton, Modal, ModalFooter, TextInput, DropDown, Item, Button } from '@/components/ui';

function ModalPanel() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <PrimaryButton onClick={() => setIsOpen(true)}>Open modal</PrimaryButton>

      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} title='Create new Type'>
        <form>
          <div className='grid w-full grid-cols-5 place-content-center gap-3'>
            <div className='col-span-3 flex flex-row'>
              <TextInput header='Type Name' className='w-full' placeholder='Search for something' />
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
