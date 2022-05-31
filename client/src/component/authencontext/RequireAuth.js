<<<<<<< HEAD
import React from 'react'
import {useHistory} from 'react-router-dom'
import {useAuth} from '../authencontext/AuthenProvide'
export const RequireAuth = ({ children}) => {
 const history = useHistory()
 const auth = useAuth();
 if(!auth.user) {
    history.push("/login")
 }
 return children
}
=======
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
>>>>>>> 2a96b1098f9fc006b0fd9893e014a9d545caf4b4
