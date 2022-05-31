import React from 'react'
import {useHistory} from 'react-router-dom'
import {useAuth} from '../authencontext/AuthenProvide'
export const RequireAuth = ({ children}) => {
 const history = useHistory()
 const auth = useAuth();
 if(!auth?.user) {
   //  history.push("/login")
 }
 return children
}
