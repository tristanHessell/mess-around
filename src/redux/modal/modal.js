export const actionTypes = {
  SHOW_MODAL: 'spotify-list/modal/SHOW_MODAL',
  HIDE_MODAL: 'spotify-list/modal/HIDE_MODAL',
};

const DEFAULT_STATE = {
  modalType: undefined,
  modalProps: {},
};

export default function reducer (state = DEFAULT_STATE, action) {
  switch(action.type) {
    case actionTypes.SHOW_MODAL: {
      return {
        modalType: action.modalType,
        modalProps: action.modalProps,
      };
    }
    case actionTypes.HIDE_MODAL: {
      return DEFAULT_STATE;
    }
    default: {
      return state;
    }
  }
}

export const modalSelector = (state) => state.modal;

export function showModal ({modalType, modalProps}) {
  return {
    type: actionTypes.SHOW_MODAL,
    modalType,
    modalProps,
  };
}

export function hideModal () {
  return {
    type: actionTypes.HIDE_MODAL,
  };
}