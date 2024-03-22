import Button from '../ui/Button/Button';
import PrimaryButton from '../ui/Button/PrimaryButton';
import DropDown from '../ui/DropDown/DropDown';
import Item from '../ui/Item/Item';
import Modal, { ModalFooter } from '../ui/Modal/Modal';
import TextInput from '../ui/TextInput/TextInput';
import Switch from '../ui/Switch/Switch';
import Icon from '../ui/Icon/Icon';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { useState } from 'react';
import fieldApi from '@/api/fieldApi';
import { useParams, useSearchParams } from 'react-router-dom';
import { useQueryClient } from 'react-query';

interface FieldModalProp {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
}

const filedSchema = z.object({
  fieldName: z.string(),
  labelName: z.string(),
  defaultValue: z.string()
});

type FieldData = z.infer<typeof filedSchema>;

const FieldModal = ({ isOpen, setIsOpen }: FieldModalProp) => {
  const [_, setIsLoading] = useState(false);
  const { handleSubmit, register, reset } = useForm<FieldData>({
    defaultValues: {
      fieldName: '',
      labelName: '',
      defaultValue: ''
    }
  });

  const { id } = useParams<{ id: string }>() as { id: string };
  const [searchParams]   = useSearchParams();

  const queryClient = useQueryClient();

  const onSubmit = async (data: FieldData) => {
    try {
      setIsLoading(true);

      const res = await fieldApi.createField(id, data.fieldName, data.labelName, data.defaultValue);

      if (res) {
        setIsOpen(false);
        queryClient.invalidateQueries(['property', id]);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
      reset();
    }
  };
  return (
    <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} title={`Add Field For ${searchParams.get('name')}`}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='grid grid-cols-5 place-content-center gap-3'>
          <div className='col-span-3 flex flex-col'>
            <TextInput
              header='Field Name'
              // onChange={(e) => setFieldName(e.target.value)}
              placeholder='Input Field Name'
              name='fieldName'
              register={register}
            />
          </div>
          <div className='col-span-2 flex flex-col'>
            <DropDown header='Input Type' value='Text' defaultValue='Text'>
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
              placeholder='Input Label Name'
              // onChange={(e) => setLabelName(e.target.value)}
              name='labelName'
              register={register}
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
          placeholder='Input Value'
          // onChange={(e) => setDefaultValue(e.target.value)}
          name='defaultValue'
          register={register}
        />

        <div className='mt-8 flex items-center justify-between'>
          <div className='flex items-center'>
            <Switch onClick={() => console.log('object')} checked={true} className='mt-1' />
            <div className='ml-2'>Set As Secondary Names</div>
            <Icon name='info' className='ml-1' size='1' />
          </div>
          <ModalFooter className='mt-0'>
            <Button onClick={() => setIsOpen(false)}>Cancel</Button>
            <PrimaryButton type='submit'>Save</PrimaryButton>
          </ModalFooter>
        </div>
      </form>
    </Modal>
  );
};
export default FieldModal;
