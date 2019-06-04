import React from 'react';
import { useSelector } from 'react-redux'

import {
  modalSelector,
} from '../../redux/modules/modal'

import SaveWarningModal from './SaveWarningModal';

const MODALS = {
  SAVE_WARNING_MODAL: SaveWarningModal,
};

const ModalRoot = React.memo(() => {
  const { modalType, modalProps } = useSelector(modalSelector);

  if (!modalType) {
    return null;
  }

  const SpecificModal = MODALS[modalType];

  return (
    <SpecificModal {...modalProps} />
  );
});

export default ModalRoot;
