import React, { useContext } from 'react';

import { PropTypes } from 'prop-types';
import { Navigate } from 'react-router-dom';

import { AuthContext } from './AuthProvider';

const AuthenticatedRoute = ({ children }) => {
  const { user } = useContext(AuthContext);

  if (!user) {
    return <Navigate to="/" />;
  }

  return children;
};
AuthenticatedRoute.propTypes = {
  children: PropTypes.node.isRequired,
};
export default AuthenticatedRoute;
