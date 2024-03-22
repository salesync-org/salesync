/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, createContext, useContext } from 'react';
import RecordModal from '@/pages/Home/RecordModal';

export const MODAL_TYPES = {
  CREATE_RECORD_MODAL: 'CREATE_RECORD_MODAL'
};

const MODAL_COMPONENTS: any = {
  [MODAL_TYPES.CREATE_RECORD_MODAL]: RecordModal
};

type GlobalModalContext = {
  showModal: (modalType: string, modalProps?: any) => void;
  hideModal: () => void;
  store: any;
};

const initalState: GlobalModalContext = {
  showModal: () => {},
  hideModal: () => {},
  store: {}
};

const GlobalModalContext = createContext(initalState);
export const useGlobalModalContext = () => useContext(GlobalModalContext);

export const GlobalModalProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [store, setStore] = useState({ modalType: '', modalProps: {} });
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
