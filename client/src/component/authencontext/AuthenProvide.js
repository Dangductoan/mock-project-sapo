import { createContext, useState,useContext } from "react";
import checkLogin from '../../page/login/Login'
const AuthContext = createContext(null);

export const AuthProvider = ({user,setUser,children}) => {

  const login = (user) => {
    setUser(user);
    return checkLogin(user)
  };
  const logOut = (user) => {
    setUser(null);
  };
  return(
  <AuthContext.Provider value={{ user, login, logOut }}>
    
    {children}
  </AuthContext.Provider>
  )
  
};
export const useAuth = () =>{
    return useContext(AuthContext)
}

export default AuthContext;