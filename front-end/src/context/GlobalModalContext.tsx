/* eslint-disable @typescript-eslint/no-explicit-any */
import ConvertModal from '@/components/ConvertModal/ConvertModal';
import RelationModal from '@/components/Relation/RelationModal';
import SelectReportModal from '@/components/Report/SelectReportModal';
import UserModal from '@/components/UserModal/UserModal';
import RecordModal from '@/pages/Home/RecordModal';
import React, { Dispatch, createContext, useContext, useState } from 'react';

export const MODAL_TYPES = {
  CREATE_RECORD_MODAL: 'CREATE_RECORD_MODAL',
  USER_MODAL: 'USER_MODAL',
  CONVERT_MODAL: 'CONVERT_MODAL',
  RELATION_MODAL: 'RELATION_MODAL',
  REPORT_MODAL: 'REPORT_MODAL'
};

const MODAL_COMPONENTS: any = {
  [MODAL_TYPES.CREATE_RECORD_MODAL]: RecordModal,
  [MODAL_TYPES.USER_MODAL]: UserModal,
  [MODAL_TYPES.CONVERT_MODAL]: ConvertModal,
  [MODAL_TYPES.RELATION_MODAL]: RelationModal,
  [MODAL_TYPES.REPORT_MODAL]: SelectReportModal
};

type GlobalModalContext = {
  showModal: (modalType: string, modalProps?: any) => void;
  hideModal: () => void;
  store: any;
  isLoading: boolean;
  setIsLoading: Dispatch<React.SetStateAction<boolean>>;
};

const initialState: GlobalModalContext = {
  showModal: () => {},
  hideModal: () => {},
  store: {},
  isLoading: false,
  setIsLoading: () => {}
};

const GlobalModalContext = createContext(initialState);
export const useGlobalModalContext = () => useContext(GlobalModalContext);

export const GlobalModalProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [store, setStore] = useState({
    modalType: '',
    modalProps: {}
  });
  const [isLoading, setIsLoading] = useState(false);
  const { modalType, modalProps } = store;

  const showModal = (modalType: string, modalProps: any = {}) => {
    setIsLoading(true);
    setStore({
      ...store,
      modalType,
      modalProps
    });
  };

  const hideModal = () => {
    if (isLoading) {
      setIsLoading(false);
    }
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
    <GlobalModalContext.Provider value={{ store, showModal, hideModal, isLoading, setIsLoading }}>
      {renderComponent()}
      {children}
    </GlobalModalContext.Provider>
  );
};
