/* eslint-disable @typescript-eslint/no-explicit-any */
import ConvertModal from '@/components/ConvertModal/ConvertModal';
import UserModal from '@/components/UserModal/UserModal';
import RecordModal from '@/pages/Home/RecordModal';
import React, { createContext, useContext, useState } from 'react';

export const MODAL_TYPES = {
  CREATE_RECORD_MODAL: 'CREATE_RECORD_MODAL',
  USER_MODAL: 'USER_MODAL',
  CONVERT_MODAL: 'CONVERT_MODAL'
};

const MODAL_COMPONENTS: any = {
  [MODAL_TYPES.CREATE_RECORD_MODAL]: RecordModal,
  [MODAL_TYPES.USER_MODAL]: UserModal,
  [MODAL_TYPES.CONVERT_MODAL]: ConvertModal
};

type GlobalModalContext = {
  showModal: (modalType: string, modalProps?: any) => void;
  hideModal: () => void;
  store: any;
};

const initialState: GlobalModalContext = {
  showModal: () => {},
  hideModal: () => {},
  store: {}
};

const GlobalModalContext = createContext(initialState);
export const useGlobalModalContext = () => useContext(GlobalModalContext);

export const GlobalModalProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [store, setStore] = useState({
    modalType: '',
    modalProps: {}
  });
  const { modalType, modalProps } = store;

  const showModal = (modalType: string, modalProps: any = {}) => {
    setStore({
      ...store,
      modalType,
      modalProps
    });
  };

  const hideModal = () => {
    setStore({
      ...store,
      modalType: '',
      modalProps: {}
    });
  };

  const renderComponent = () => {
    const ModalComponent = MODAL_COMPONENTS[modalType];
    if (!modalType || !ModalComponent) {
      return null;
    }

    return <ModalComponent id='global-modal' {...modalProps} />;
  };

  return (
    <GlobalModalContext.Provider value={{ store, showModal, hideModal }}>
      {renderComponent()}
      {children}
    </GlobalModalContext.Provider>
  );
};
