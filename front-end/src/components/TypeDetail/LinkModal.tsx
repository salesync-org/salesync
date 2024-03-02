import Button from '../ui/Button/Button';
import PrimaryButton from '../ui/Button/PrimaryButton';
import DropDown from '../ui/DropDown/DropDown';
import Item from '../ui/Item/Item';
import Modal, { ModalFooter } from '../ui/Modal/Modal';
import TextInput from '../ui/TextInput/TextInput';

interface LinkModalProp {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
}

const LinkModal = ({ isOpen, setIsOpen }: LinkModalProp) => {
  return (
    <Modal isOpen={isOpen} onOpenChange={setIsOpen} title='Create new Type'>
      <form>
        <div className='grid grid-cols-2 place-content-center gap-3'>
          <div className='w-full'>
            <DropDown header='Link Type' value='Select a value'>
              <Item title='One To Many' />
              <Item title='Many To One' />
              <Item title='Many To Many' />
              <Item title='One To One Right' />
              <Item title='One To One Left' />
              <Item title='Children To Parent' />
            </DropDown>
          </div>
          <DropDown header='Link to' value='Select a value'>
            <Item title='Lead' />
            <Item title='Account' />
            <Item title='Contact' />
            <Item title='Opportunity' />
          </DropDown>
          <div>
            <TextInput className='w-full' header='This Label' value='' placeholder='Label name for this Type' />
          </div>
          <div>
            <TextInput
              className='w-full'
              header='Destination Label'
              value=''
              placeholder='Label name for Destination Type'
            />
          </div>
        </div>
        <ModalFooter className='mt-8'>
          <Button onClick={() => setIsOpen(false)}>Cancel</Button>
          <PrimaryButton onClick={() => setIsOpen(false)}>Save</PrimaryButton>
        </ModalFooter>
      </form>
    </Modal>
  );
};
export default LinkModal;
