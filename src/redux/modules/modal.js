export const types = {
  SHOW_MODAL: 'spotify-list/modal/SHOW_MODAL',
  HIDE_MODAL: 'spotify-list/modal/HIDE_MODAL',
};

const DEFAULT_STATE = {
  modalType: undefined,
  modalProps: {},
};

export default function reducer (state = DEFAULT_STATE, action) {
  switch(action.type) {
    case types.SHOW_MODAL: {
      return {
        modalType: action.modalType,
        modalProps: action.modalProps,
      };
    }
    case types.HIDE_MODAL: {
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
    type: types.SHOW_MODAL,
    modalType,
    modalProps,
  };
}

export function hideModal () {
  return {
    type: types.HIDE_MODAL,
  };
}