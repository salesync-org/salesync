import useType from '@/hooks/type-service/useType';
import Button from '../ui/Button/Button';
import PrimaryButton from '../ui/Button/PrimaryButton';
import DropDown from '../ui/DropDown/DropDown';
import Item from '../ui/Item/Item';
import Modal, { ModalFooter } from '../ui/Modal/Modal';
import TextInput from '../ui/TextInput/TextInput';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { cn } from '@/utils/utils';
import ErrorText from '../ui/ErrorText/ErrorText';
import { useParams } from 'react-router-dom';
import linkApi from '@/api/link';
import { useQueryClient } from 'react-query';

const LinkModalSchema = z.object({
  sourceLabel: z.string().min(1, "Can't be empty"),
  destinationLabel: z.string().min(1, "Can't be empty")
});

type LinkModalSchemaType = z.infer<typeof LinkModalSchema>;

interface LinkModalProp {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  currentLink?: TypeRelation | null;
}

const INIT_SELECTED = 'Select a value';

const LinkModal = ({ isOpen, setIsOpen, currentLink }: LinkModalProp) => {
  const [selectedRelation, _] = useState(INIT_SELECTED);
  const [selectedType, setSelectedType] = useState(INIT_SELECTED);
  const [loading, setLoading] = useState(false);
  const { types = [], isLoading: isTypesLoading } = useType();


  const { id } = useParams<{ id: string }>() as { id: string };
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors }
  } = useForm<LinkModalSchemaType>({
    defaultValues: {
      sourceLabel: currentLink?.source_type_label || '',
      destinationLabel: currentLink?.destination_label || ''
    }
  });

  useEffect(() => {
    reset({
      sourceLabel: currentLink?.source_type_label || '',
      destinationLabel: currentLink?.destination_label || ''
    });
  }, [currentLink, reset]);

  useEffect(() => {
    if (selectedType && types.length > 0) {
      const sourceType = types.find((type) => type.id === id);
      const desType = types.find((type) => type.id === selectedType);
      if (sourceType && desType) {
        setValue('sourceLabel', sourceType.name);
        setValue('destinationLabel', desType.name);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, isOpen, selectedType, types]);

  const queryClient = useQueryClient();

  const createLink = async (data: LinkModalSchemaType) => {
    try {
      setLoading(true);
      if (selectedRelation === INIT_SELECTED || selectedType === INIT_SELECTED) {
        return;
      }

      const res = await linkApi.createLink(id, data.sourceLabel, selectedType, data.destinationLabel, selectedRelation);

      if (res?.source_type_relation) {
        // queryClient.setQueryData(['links', id], (oldData: TypeRelation[] | undefined) => {
        //   return [res.source_type_relation, ...(oldData || [])];
        // });
        queryClient.invalidateQueries(['links', id]);

        setIsOpen(false);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const updateLink = async (data: LinkModalSchemaType) => {
    try {
      setLoading(true);

      const res = await linkApi.updateLink(currentLink?.id || '', data.sourceLabel, data.destinationLabel);

      if (res?.source_type_relation) {
        queryClient.invalidateQueries(['links', id]);

        setIsOpen(false);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = async (data: LinkModalSchemaType) => {
    currentLink ? await updateLink(data) : await createLink(data);
  };

  return (
    <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} title='Create new Type'>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='grid grid-cols-2 place-content-center gap-3'>
          <div className='w-full'>
          </div>
          <DropDown
            header='Link to'
            value={isTypesLoading ? 'Loading...' : selectedType}
            onValueChange={setSelectedType}
            defaultValue={currentLink?.destination_type.name || INIT_SELECTED}
            disabled={Boolean(currentLink)}
          >
            {types.map((type) => (
              <Item key={type.id} title={type.name} value={type.id} />
            ))}
          </DropDown>
          <div>
            <TextInput
              className={cn('w-full', errors.sourceLabel && 'border-red-500')}
              header='This Label'
              placeholder='Label name for this Type'
              name='sourceLabel'
              register={register}
            />
            {errors.sourceLabel && <ErrorText text={errors.sourceLabel.message} />}
          </div>
          <div>
            <TextInput
              className={cn('w-full', errors.sourceLabel && 'border-red-500')}
              header='Destination Label'
              placeholder='Label name for Destination Type'
              name='destinationLabel'
              register={register}
            />
            {errors.destinationLabel && <ErrorText text={errors.destinationLabel.message} />}
          </div>
        </div>
        <ModalFooter className='mt-8'>
          <Button onClick={() => setIsOpen(false)} disabled={loading}>
            Cancel
          </Button>
          <PrimaryButton type='submit' disabled={loading}>
            Save
          </PrimaryButton>
        </ModalFooter>
      </form>
    </Modal>
  );
};
export default LinkModal;
