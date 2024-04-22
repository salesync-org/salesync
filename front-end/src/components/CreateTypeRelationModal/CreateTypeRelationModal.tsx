import { useEffect, useState } from 'react';
import { Button, DropDown, DropDownItem, Item, Modal, ModalFooter, PrimaryButton, TextInput } from '../ui';
import typeApi from '@/api/type';
import { useParams } from 'react-router-dom';

type CreateTypeRelationModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (data: TypeRelation) => void;
  typeId: string;
};

const CreateTypeRelationModal = ({ isOpen, onClose, onCreate, typeId }: CreateTypeRelationModalProps) => {
  const [types, setTypes] = useState<Type[]>([]);
  const { companyName } = useParams();
  const [relations, setRelations] = useState<Relation[]>([]);
  const [newTypeRelation, setNewTypeRelation] = useState<TypeRelation>({
    id: '',
    source_type: { id: '', name: '', template: { id: '', name: '' } },
    source_type_label: '',
    relation: {
      id: '',
      name: '',
      inverse_id: ''
    },
    destination_type: {
      id: '',
      name: '',
      template: {
        id: '',
        name: ''
      }
    },
    destination_type_label: ''
  });

  useEffect(() => {
    const fetchData = async () => {
      const types = await typeApi.getAllTypes(companyName ?? '');
      const relations = await typeApi.getAllRelations(companyName ?? '');
      setTypes(types);
      setRelations(relations);
      setNewTypeRelation((prev) => ({
        ...prev,
        source_type: types.find((type: Type) => type.id === typeId) ?? {
          id: '',
          name: '',
          template: { id: '', name: '' }
        }
      }));
    };

    fetchData();
  }, [companyName]);

  const handleSubmit = () => {
    const result: TypeRelation = {
      id: '',
      source_type: newTypeRelation.source_type,
      source_type_label: newTypeRelation.source_type_label,
      relation: newTypeRelation.relation,
      destination_type: newTypeRelation.destination_type,
      destination_type_label: newTypeRelation.destination_type_label
    };
    onCreate(result);
  };

  return (
    <Modal className='h-full' isOpen={isOpen} onClose={onClose} title='Create New Relation'>
      <div className='h-full w-full'>
        <form className=''>
          <div className='flex flex-nowrap place-content-center gap-3'>
            <div className='flex min-w-[200px] flex-col gap-2'>
              <TextInput
                header='Source Type Name'
                className='w-full'
                value={types.find((type) => type.id === typeId)?.name ?? ''}
                disabled
              />
              <TextInput
                header='Source Type Label'
                className='w-full'
                value={newTypeRelation.source_type_label}
                onChange={(e) => setNewTypeRelation({ ...newTypeRelation, source_type_label: e.target.value })}
                placeholder='Enter source type label'
              />
            </div>
            <div className='w-fit p-6'>
              <DropDown
                header='Relation'
                value={newTypeRelation.relation.name}
                onValueChange={(value) => {
                  setNewTypeRelation({
                    ...newTypeRelation,
                    relation: relations.find((relation) => relation.id === value) ?? {
                      id: '',
                      name: '',
                      inverse_id: ''
                    }
                  });
                }}
              >
                {relations.map((relation) => (
                  <DropDownItem key={`${relation?.id}_1`} title={relation?.name} value={relation?.id}>
                    <Item key={relation?.id} title={relation?.name} value={relation?.id} />
                  </DropDownItem>
                ))}
              </DropDown>
            </div>
            <div className='flex min-w-[200px] flex-col gap-2'>
              <DropDown
                header='Types'
                value={newTypeRelation.source_type.name}
                defaultValue='Select a type'
                onValueChange={(value) => {
                  setNewTypeRelation({
                    ...newTypeRelation,
                    destination_type: types.find((type) => type.id === value) ?? {
                      id: '',
                      name: '',
                      template: { id: '', name: '' }
                    }
                  });
                }}
              >
                {types.map((type) => (
                  <DropDownItem key={`${type?.id}_2`} title={type?.name} value={type?.id}>
                    <Item key={type?.id} title={type?.name} value={type?.id} />
                  </DropDownItem>
                ))}
              </DropDown>
              <TextInput
                header='Desination Type Label'
                className='w-full'
                value={newTypeRelation.destination_type_label}
                onChange={(e) => setNewTypeRelation({ ...newTypeRelation, destination_type_label: e.target.value })}
                placeholder='Search for something'
              />
            </div>
          </div>
          <ModalFooter className='mt-8 h-full'>
            <Button onClick={onClose}>Cancel</Button>
            <PrimaryButton
              onClick={() => {
                handleSubmit();
              }}
            >
              Save
            </PrimaryButton>
          </ModalFooter>
        </form>
      </div>
    </Modal>
  );
};

export default CreateTypeRelationModal;
