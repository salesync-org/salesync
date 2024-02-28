import { useState } from 'react';
import PrimaryButton from 'ui/Button/PrimaryButton';
import Modal, { ModalFooter } from 'ui/Modal/Modal';
import TextInput from 'ui/TextInput/TextInput';
import DropDown from 'ui/DropDown/DropDown';
import Item from 'ui/Item/Item';
import Button from 'ui/Button/Button';
import Icon from 'ui/Icon/Icon';
import Switch from 'ui/Switch/Switch';

function AddFieldModal(props: { nameType: string }) {
  const [fieldName, setFieldName] = useState('');
  const [labelName, setLabelName] = useState('');
  const [inputType, setInputType] = useState('');
  const [isRequired, setIsRequired] = useState(false);
  const [defaultValue, setDefaultValue] = useState('');
  const [isSecondaryName, setIsSecondaryName] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const title = `Add Field for ${props.nameType}`;

  const onOpenAddFieldModal = () => {
    setFieldName('');
    setLabelName('');
    setInputType('');
    setIsRequired(false);
    setIsSecondaryName(true);
    setDefaultValue('');
    setIsOpen(true);
  };

  const onSubmit = () => {
    console.log('fieldName', fieldName);
    console.log('labelName', labelName);
    console.log('inputType', inputType);
    console.log('isRequired', isRequired);
    console.log('isSecondaryName', isSecondaryName);
    console.log('defaultValue', defaultValue);
    setIsOpen(false);
  };

  return (
    <>
      <PrimaryButton onClick={onOpenAddFieldModal}>
        <Icon name='add' />
        <span>Add Fields</span>
      </PrimaryButton>

      <Modal isOpen={isOpen} onOpenChange={setIsOpen} title={title}>
        <form>
          <div className='grid grid-cols-5 place-content-center gap-3'>
            <div className='col-span-3 flex flex-col gap-2'>
              <TextInput
                header='Field Name'
                className='w-full'
                value={fieldName}
                onChange={(e) => setFieldName(e.target.value)}
                placeholder='Input Field Name'
              />
            </div>
            <div className='col-span-2 flex flex-col gap-2'>
              <DropDown header='Input Type' value={inputType} onChange={setInputType}>
                <Item title='Text' />
                <Item title='Number' />
                <Item title='Date' />
                <Item title='DateTime' />
              </DropDown>
            </div>
            <div className='col-span-3 flex flex-col gap-2'>
              <TextInput
                header='Label Name'
                className='w-full'
                value={labelName}
                placeholder='Input Label Name'
                onChange={(e) => setLabelName(e.target.value)}
              />
            </div>
            <div className='col-span-2 flex flex-col justify-center gap-2'>
              <Switch header='Is Required' onClick={setIsRequired} checked={false} />
            </div>
          </div>

          <hr className='my-5 h-1 w-full rounded border-0 bg-gray-100 dark:bg-gray-700 md:my-4'></hr>

          <TextInput
            header='Default Value'
            className='w-full'
            value={defaultValue}
            placeholder='Input Value'
            onChange={(e) => setDefaultValue(e.target.value)}
          />

          <div className='mt-8 flex items-center justify-between'>
            <div className='flex items-center'>
              <Switch onClick={setIsSecondaryName} checked={true} className='mt-1' />
              <div className='ml-2'>Set As Secondary Names</div>
              <Icon name='info' className='ml-1' size='1' />
            </div>
            <ModalFooter className='mt-0'>
              <Button onClick={() => setIsOpen(false)}>Cancel</Button>
              <PrimaryButton onClick={onSubmit}>Save</PrimaryButton>
            </ModalFooter>
          </div>
        </form>
      </Modal>
    </>
  );
}

export default AddFieldModal;
