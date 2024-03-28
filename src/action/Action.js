const ADD_CONTACT = 'ADD_CONTACT';
const DELETE_CONTACT = 'DELETE_CONTACT';
const UPDATE_CONTACT = 'UPDATE_CONTACT';

export const signIn = (contacts) => ({
  type: 'SIGN_IN',
  payload: contacts,
});

export const addContact = (contactData) => ({
  type: ADD_CONTACT,
  payload: contactData,
});

export const deleteContacts = (userId) => ({
  type: DELETE_CONTACT,
  payload: userId,
});

export const updateContacts = (contactData) => ({
  type: UPDATE_CONTACT,
  payload: contactData,
});

export const importContacts = (contactData) => ({
  type: 'IMPORT_CONTACT',
  payload: contactData,
});
