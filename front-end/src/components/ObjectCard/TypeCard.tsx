import { cn } from '@/utils/utils';
import PrimaryButton from '../ui/Button/PrimaryButton';
import TextButton from '../ui/Button/TextButton';
import Icon from '../ui/Icon/Icon';
import Panel from '../ui/Panel/Panel';
import TypeTable from '../ui/Table/TypeTable';
import { Button } from '../ui/Button';
import { Modal, ModalFooter } from '../ui/Modal';
import { useState } from 'react';
import { DropDown, DropDownItem, TextInput } from '@/components/ui';
import propertyApi from '@/api/propertyApi';
import { Divide } from 'lucide-react';
const TypeCard = ({ type }: { type: Type }) => {
  const colorName = type.background_color;

  const [isOpen, setIsOpen] = useState(false);
  const [properties, setProperties] = useState<TypeProperty>();

  const getProperty = async (typeId: string) => {
    const property = await propertyApi.getAllProperties(typeId);

    setProperties(property);
  };

  return (
    <>
      <Panel className='flex min-h-[400px] flex-col items-center justify-between'>
        <div className='w-full'>
          <div className='flex w-full flex-row items-center gap-1 '>
            <img className={cn('h-8 w-8 rounded-sm ', colorName)} src={type.icon_url ?? ''} alt='type' />
            <TextInput prefixIcon='search' className='w-full' placeholder={`My ${type.name}`}></TextInput>
            <Button
              onClick={() => {
                getProperty(type.id);
                setIsOpen(true);
              }}
            >
              New
            </Button>
            <DropDown value='' header=''>
              <DropDownItem title='Change Home Card' value={''} />
              <DropDownItem title='View Card' value={''} />
            </DropDown>
          </div>
          <TypeTable type={type}></TypeTable>
        </div>
        <div className='flex w-full flex-row items-center justify-between border-t border-black'>
          <TextButton
            onClick={() => {
              console.log('first');
            }}
            text='View Report'
          ></TextButton>
          <div className='flex flex-row items-center'>
            <div>As of today at 11:37</div>
            <button className='ml-2 h-fit align-middle' onClick={() => {}}>
              <Icon name='replay'></Icon>
            </button>
          </div>
        </div>
      </Panel>

      <Modal isOpen={isOpen} onOpenChange={setIsOpen} title={properties ? `New ${properties.name}` : 'New'}>
        <form>
          <div className='flex w-full flex-col  place-content-center gap-3'>
            {properties ? (
              properties.properties?.map((property) => {
                if (property.type === 'text')
                  return <TextInput header={property.name} key={property.id} placeholder={property.name}></TextInput>;
                else if (property.type === 'dropdown')
                  return (
                    <DropDown key={property.id} value='' header={property.name}>
                      {property.options?.map((value) => {
                        return <DropDownItem key={value} title={value} value={value}></DropDownItem>;
                      })}
                    </DropDown>
                  );
                else return <div></div>;
              })
            ) : (
              <div>loading</div>
            )}
          </div>
          <ModalFooter className='mt-8'>
            <Button onClick={() => setIsOpen(false)}>Cancel</Button>
            <PrimaryButton onClick={() => setIsOpen(false)}>Save</PrimaryButton>
          </ModalFooter>
        </form>
      </Modal>
    </>
  );
};

export default TypeCard;
