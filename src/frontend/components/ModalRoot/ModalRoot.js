import React from 'react';
import { useSelector } from 'react-redux';

import { modalSelector } from '../../redux/modal/selectors';

import SaveWarningModal from './SaveWarningModal';
import SavingModal from './SavingModal';
import LoadingModal from './LoadingModal';

const MODALS = {
  SAVE_WARNING_MODAL: SaveWarningModal,
  SAVING_MODAL: SavingModal,
  LOADING_MODAL: LoadingModal,
};

const ModalRoot = React.memo(() => {
  const { modalType, modalProps } = useSelector(modalSelector);

  if (!modalType) {
    return null;
  }

  const SpecificModal = MODALS[modalType];

  return <SpecificModal {...modalProps} />;
});

ModalRoot.displayName = 'ModalRoot';

export default ModalRoot;
