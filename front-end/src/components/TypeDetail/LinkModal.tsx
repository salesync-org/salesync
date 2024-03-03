import useType from '@/hooks/type-service/useType';
import Button from '../ui/Button/Button';
import PrimaryButton from '../ui/Button/PrimaryButton';
import DropDown from '../ui/DropDown/DropDown';
import Item from '../ui/Item/Item';
import Modal, { ModalFooter } from '../ui/Modal/Modal';
import TextInput from '../ui/TextInput/TextInput';
import useRelation from '@/hooks/type-service/useRelation';

interface LinkModalProp {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
}

const LinkModal = ({ isOpen, setIsOpen }: LinkModalProp) => {
  const { types = [], isLoading: isTypesLoading } = useType();
  const { relations = [], isLoading: isRelationsLoading } = useRelation();

  return (
    <Modal isOpen={isOpen} onOpenChange={setIsOpen} title='Create new Type'>
      <form>
        <div className='grid grid-cols-2 place-content-center gap-3'>
          <div className='w-full'>
            <DropDown header='Link Type' value={isRelationsLoading ? 'Loading...' : 'Select a value'}>
              {relations.map((relation) => (
                <Item key={relation.id} title={relation.name} />
              ))}
            </DropDown>
          </div>
          <DropDown header='Link to' value={isTypesLoading ? 'Loading...' : 'Select a value'}>
            {types.map((type) => (
              <Item key={type.id} title={type.name} />
            ))}
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
