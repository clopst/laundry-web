import { createContext, useContext } from 'react';

const AuthContext = createContext({});
const useAuthContext = () => useContext(AuthContext);

export { AuthContext, useAuthContext };
