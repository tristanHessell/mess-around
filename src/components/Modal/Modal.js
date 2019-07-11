import React from 'react';
import { useSelector } from 'react-redux';

import { modalSelector } from '../../redux/modal/selectors';

import SaveWarningModal from './SaveWarningModal';
import SavingModal from './SavingModal';

const MODALS = {
  SAVE_WARNING_MODAL: SaveWarningModal,
  SAVING_MODAL: SavingModal,
};

const ModalRoot = React.memo(() => {
  const { modalType, modalProps } = useSelector(modalSelector);

  if (!modalType) {
    return null;
  }

  const SpecificModal = MODALS[modalType];

  return <SpecificModal {...modalProps} />;
});

export default ModalRoot;
