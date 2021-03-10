import './App.css';
import { BrowserRouter, Route } from 'react-router-dom';
import SiderLayout from './containers/SiderLayout/SiderLayout';
import Login from './containers/Login/Login';
import AuthProvider from './context/AuthProvider';
import ProtectedRoutes from './components/ProtectedRoutes/ProtectedRoutes';

const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Route path="/login" exact component={Login} />
        <ProtectedRoutes>
          <Route path="/" component={SiderLayout} />
        </ProtectedRoutes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
