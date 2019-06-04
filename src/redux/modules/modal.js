const SHOW_MODAL = 'spotify-list/modal/SHOW_MODAL';
const HIDE_MODAL = 'spotify-list/modal/HIDE_MODAL';

const DEFAULT = {
  modalType: undefined,
  modalProps: {},
};

export default function reducer (state = DEFAULT, action) {
  switch(action.type) {
    case SHOW_MODAL: {
      return {
        modalType: action.modalType,
        modalProps: action.modalProps,
      };
    }
    case HIDE_MODAL: {
      return DEFAULT;
    }
    default: {
      return state;
    }
  }
}

export const modalSelector = (state) => state.modal;

export function showModal ({modalType, modalProps}) {
  return {
    type: SHOW_MODAL,
    modalType,
    modalProps,
  };
}

export function hideModal () {
  return {
    type: HIDE_MODAL,
  };
}