import React from 'react';
import { Redirect } from 'react-router';
import { useAuthContext } from '../../context/AuthContext';
import Loading from '../Loading/Loading';

const ProtectedRoutes = (props) => {
  const { isLoggedIn, loading } = useAuthContext();

  if (loading) {
    return <Loading spinning={true} />
  }

  if (!isLoggedIn) {
    return <Redirect to='/login' />;
  }

  return props.children;
}

export default ProtectedRoutes;
