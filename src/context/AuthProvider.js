import { useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';
import { attemptLogin, attemptLogout, getLoggedInUser, getSanctumCookie } from '../services/login';
import handleError from '../helpers/handleError';
import Cookies from 'js-cookie'
import { useHistory } from 'react-router';

const IS_LOGGED_IN_COOKIE = 'is_logged_in';

const AuthProvider = (props) => {
  const history = useHistory();
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(Cookies.get(IS_LOGGED_IN_COOKIE));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // const isLoggedInCookie = Cookies.get(IS_LOGGED_IN_COOKIE);

    if (isLoggedIn) {
      getLoggedInUser()
        .then(res => {
          setUser(res.data);
          setIsLoggedIn(true);
          setLoading(false);
        })
        .catch(err => {
          logout();
        });
    } else {
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const login = ({ username, password }, cbError) => {
    getSanctumCookie()
      .then(() => {
        attemptLogin({ username, password })
          .then(res => {
            setUser(res.data);
            setIsLoggedIn(true);
            Cookies.set(IS_LOGGED_IN_COOKIE, true, {expires: 86400, sameSite: 'lax'});
            history.push('/');
          })
          .catch(err => {
            handleError(err);
            cbError(err);
          });
      })
      .catch(err => {
        handleError(err);
        cbError(err);
      });
  }

  const logout = () => {
    attemptLogout()
      .then(res => {
        setUser(null);
        setIsLoggedIn(false);
        Cookies.remove(IS_LOGGED_IN_COOKIE, {expires: 86400, sameSite: 'lax'});
        history.push('/login');
      });
  }

  const contextValue = {
    loading,
    user,
    isLoggedIn,
    login,
    logout
  };

  return (
  <AuthContext.Provider value={contextValue}>
    {props.children}
  </AuthContext.Provider>
  )
}

export default AuthProvider;
