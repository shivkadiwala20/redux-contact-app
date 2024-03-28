export const saveFormDataToLocalStorage = (formData) => {
  try {
    const existingData = getFormDataFromLocalStorage() || [];
    const updatedData = [...existingData, formData];
    localStorage.setItem('formData', JSON.stringify(updatedData));
    return true;
  } catch (error) {
    console.error('Error saving data to local storage:', error);
  }
};

export function setCurrentUser(data) {
  try {
    return sessionStorage.setItem('activeUserId', JSON.stringify(data));
  } catch (error) {
    throw new Error(error);
  }
}

export const getCurrentUser = () => {
  try {
    const formData = JSON.parse(sessionStorage.getItem('activeUserId'));
    return formData;
  } catch (error) {
    throw new Error(error);
  }
};

export const loggedOut = () => {
  sessionStorage.removeItem('activeUserId');
};

export const getFormDataFromLocalStorage = () => {
  try {
    const formData = JSON.parse(localStorage.getItem('formData')) ?? [];
    // console.log(FormData);
    return formData;
  } catch (error) {
    console.error('Error retrieving data from local storage:', error);
    return undefined;
  }
};

export const saveAddContactDetails = (contactData, userId) => {
  const avaiLableData = getAddContactDetails() || [];

  if (avaiLableData !== null) {
    const arr = JSON.parse(localStorage.getItem([userId])) || [];

    arr.push(contactData);
    localStorage.setItem([userId], JSON.stringify(arr));
  } else {
    const arr = [];
    arr.push(contactData);
    localStorage.setItem([userId], JSON.stringify(arr));
  }
};

export const getAddContactDetails = () => {
  try {
    const sessionData = getCurrentUser();
    // console.log("SessionData", sessionData);
    const userId = sessionData?.userId;
    const contactData = JSON.parse(localStorage.getItem(userId)) ?? [];
    return contactData;
  } catch (error) {
    console.error('Error saving data to local storage:', error);
  }
};

export const deleteContact = (userId) => {
  const sessionData = getCurrentUser();
  const user = sessionData.userId;
  const contactData = JSON.parse(localStorage.getItem(user)) ?? [];
  const updatedData = contactData.filter((val) => val?.userId !== userId);
  localStorage.setItem(user, JSON.stringify(updatedData));
  return true;
};

// export const saveAddContactDetails = (contactData) => {
//   const sessionData = getCurrentUser();
//   const userId = sessionData.userId;
//   console.log("StorageData", contactData);
//   return localStorage.setItem(userId, JSON.stringify(contactData));
// };

export const getActiveUser = (userId) => {
  const sessionData = getCurrentUser();
  const activeUser = sessionData?.userId;
  return JSON.parse(localStorage.getItem(activeUser)) ?? [];
};

export const setContactInStorage = (userId, data) => {
  return localStorage.setItem(userId, JSON.stringify(data));
};

export const updatedData = (newContactData) => {
  const sessionData = getCurrentUser();
  const userId = sessionData.userId;
  const existingData = JSON.parse(localStorage.getItem(userId)) ?? [];
  const updatedData = existingData.map((val) =>
    val.userId === newContactData.userId ? newContactData : val
  );
  localStorage.setItem(userId, JSON.stringify(updatedData));
  return true;
};

export const importContacts = (data) => {
  const sessionData = getCurrentUser();
  const userId = sessionData.userId;
  const existingData = JSON.parse(localStorage.getItem(userId)) ?? [];
  const updatedData = [...existingData, ...data];
  localStorage.setItem(userId, JSON.stringify(updatedData));
  return true;
};
