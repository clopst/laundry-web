import { useHistory } from 'react-router';
import { useAuthContext } from '../../context/AuthContext';

const Logout = (props) => {
  const { logout } = useAuthContext();

  logout();

  return useHistory().push('/login');
}

export default Logout;
