import {
  deleteContact,
  getAddContactDetails,
  getCurrentUser,
  // importContacts,
  saveAddContactDetails,
  updatedData,
  // setContactInStorage,
} from '../storage/Storage';

const initialState = getAddContactDetails();

export const contactReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SIGN_IN': {
      const newState = [...action.payload];
      return newState;
    }
    case 'ADD_CONTACT': {
      const newState = [...state, action.payload];
      const sessionData = getCurrentUser();
      const activeUser = sessionData?.userId;
      saveAddContactDetails(action.payload, activeUser);
      return newState;
    }
    case 'DELETE_CONTACT': {
      const deletedState = state.filter((val) => val.userId !== action.payload);
      deleteContact(action.payload);
      return deletedState;
    }
    case 'UPDATE_CONTACT': {
      updatedData(action.payload);
      const updatedState = state.map((val) =>
        val.userId === action.payload.userId ? action.payload : val
      );
      return updatedState;
    }
    case 'IMPORT_CONTACT': {
      const newState = [...state, ...action.payload];
      // saveAddContactDetails(action.payload);
      return newState;
    }

    default:
      return state;
  }
};
