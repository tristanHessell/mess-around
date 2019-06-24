import * as actionTypes from './types';

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



