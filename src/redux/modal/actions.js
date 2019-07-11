import * as actionTypes from './types';

export function showModal({ modalType, modalProps }) {
  return {
    type: actionTypes.SHOW_MODAL,
    modalType,
    modalProps,
  };
}

export function hideModal() {
  return {
    type: actionTypes.HIDE_MODAL,
  };
}
