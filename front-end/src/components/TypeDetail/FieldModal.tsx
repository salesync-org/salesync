import Button from '../ui/Button/Button';
import PrimaryButton from '../ui/Button/PrimaryButton';
import DropDown from '../ui/DropDown/DropDown';
import Item from '../ui/Item/Item';
import Modal, { ModalFooter } from '../ui/Modal/Modal';
import TextInput from '../ui/TextInput/TextInput';
import Switch from '../ui/Switch/Switch';
import Icon from '../ui/Icon/Icon';

interface FieldModalProp {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
}

const FieldModal = ({ isOpen, setIsOpen }: FieldModalProp) => {
  return (
    <Modal isOpen={isOpen} onOpenChange={setIsOpen} title='Add Field For Account'>
      <form>
        <div className='grid grid-cols-5 place-content-center gap-3'>
          <div className='col-span-3 flex flex-col'>
            <TextInput
              header='Field Name'
              value=''
              // onChange={(e) => setFieldName(e.target.value)}
              placeholder='Input Field Name'
            />
          </div>
          <div className='col-span-2 flex flex-col'>
            <DropDown header='Input Type' value='Select type'>
              <Item title='Text' />
              <Item title='Number' />
              <Item title='Date' />
              <Item title='DateTime' />
            </DropDown>
          </div>
          <div className='col-span-3 flex flex-col'>
            <TextInput
              header='Label Name'
              className='w-full'
              value=''
              placeholder='Input Label Name'
              // onChange={(e) => setLabelName(e.target.value)}
            />
          </div>
          <div className='col-span-2 flex flex-col justify-center gap-2'>
            <Switch header='Is Required' onClick={() => console.log('object')} checked={false} />
          </div>
        </div>

        <hr className='my-5 h-1 w-full rounded border-0 bg-gray-100 dark:bg-gray-700 md:my-4'></hr>

        <TextInput
          header='Default Value'
          className='w-full'
          value=''
          placeholder='Input Value'
          // onChange={(e) => setDefaultValue(e.target.value)}
        />

        <div className='mt-8 flex items-center justify-between'>
          <div className='flex items-center'>
            <Switch onClick={() => console.log('object')} checked={true} className='mt-1' />
            <div className='ml-2'>Set As Secondary Names</div>
            <Icon name='info' className='ml-1' size='1' />
          </div>
          <ModalFooter className='mt-0'>
            <Button onClick={() => setIsOpen(false)}>Cancel</Button>
            <PrimaryButton onClick={() => setIsOpen(false)}>Save</PrimaryButton>
          </ModalFooter>
        </div>
      </form>
    </Modal>
  );
};
export default FieldModal;
