import { Modal, TextInput, DropDown, DropDownItem, Panel, ModalFooter, Button, PrimaryButton } from '@/components/ui';

interface props {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  properties?: TypeProperty;
}

const TypeModal = ({ isOpen, setIsOpen, properties }: props) => {
  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={setIsOpen}
      className='h-[600px]'
      title={properties ? `New ${properties.name}` : 'New'}
    >
      <form className='-z-1 absolute bottom-2 left-2 right-2 top-20 overflow-x-hidden  pb-32  '>
        <div className='flex w-full flex-col place-content-center gap-2   p-6'>
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
      </form>
      <Panel className='absolute bottom-0 left-0 right-0 m-0   -mt-4 flex h-10 items-center justify-center bg-gray-100 bg-opacity-90 px-3  py-10 shadow-inner'>
        <ModalFooter className='m-0 '>
          <Button onClick={() => setIsOpen(false)}>Cancel</Button>
          <Button onClick={() => {}}>Save & New</Button>

          <PrimaryButton onClick={() => setIsOpen(false)}>Save</PrimaryButton>
        </ModalFooter>
      </Panel>
    </Modal>
  );
};

export default TypeModal;
