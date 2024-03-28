import React, { useContext } from 'react';

import { PropTypes } from 'prop-types';
import { Navigate } from 'react-router-dom';

import { AuthContext } from './AuthProvider';

const NonAuthRoutes = ({ children }) => {
  const { user } = useContext(AuthContext);

  if (user) {
    return <Navigate to="/contacts" />;
  }

  return children;
};
NonAuthRoutes.propTypes = {
  children: PropTypes.node.isRequired,
};
export default NonAuthRoutes;
