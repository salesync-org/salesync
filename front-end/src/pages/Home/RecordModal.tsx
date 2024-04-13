import { Button, DropDown, DropDownItem, Modal, ModalFooter, Panel, PrimaryButton, TextInput } from '@/components/ui';
import LoadingSpinner from '@/components/ui/Loading/LoadingSpinner';
import { MODAL_TYPES, useGlobalModalContext } from '@/context/GlobalModalContext';
import useProperties from '@/hooks/type-service/useProperties';
import { useLocation } from 'react-router-dom';
import ErrorToaster from '../Error/ErrorToaster';
import { PropertyElement } from '@/type';

const RecordModal = () => {
  const { hideModal, store } = useGlobalModalContext();
  const { modalType, modalProps } = store;
  const { typeId } = modalProps;
  const location = useLocation();
  const companyName = location.pathname.split('/')[1] || '';
  const { data: typeProperty, isLoading } = useProperties(companyName, typeId);

  if (!typeId) {
    return null;
  }

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (!typeProperty) {
    return <ErrorToaster errorTitle='Error' errorMessage='Failed to fetch properties' />;
  }

  console.log({ typeProperty });

  return (
    <Modal
      isOpen={modalType === MODAL_TYPES.CREATE_RECORD_MODAL}
      onClose={hideModal}
      className='h-[600px]'
      title={typeProperty ? `New ${typeProperty.name}` : 'New'}
    >
      <form className='-z-1 absolute bottom-2 left-2 right-2 top-20 overflow-x-hidden  pb-32  '>
        <div className='flex w-full flex-col place-content-center gap-2   p-6'>
          {typeProperty ? (
            typeProperty.properties?.map((property: PropertyElement) => {
              if (property.property.name === 'Text' || property.property.name === 'Phone')
                return (
                  <TextInput
                    className='w-full'
                    header={property.label}
                    key={property.id}
                    placeholder={property.label}
                  ></TextInput>
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
          <Button onClick={hideModal}>Cancel</Button>
          <Button onClick={() => {}}>Save & New</Button>

          <PrimaryButton onClick={hideModal}>Save</PrimaryButton>
        </ModalFooter>
      </Panel>
    </Modal>
  );
};

export default RecordModal;
