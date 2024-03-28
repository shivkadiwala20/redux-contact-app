import { createContext, useState } from 'react';

import { PropTypes } from 'prop-types';

import { getCurrentUser } from '../storage/Storage';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const currentUser = getCurrentUser();
  const [user, setUser] = useState(currentUser);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};
AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
export default AuthProvider;
