import call_api from "./Request";

const loginService =(user)=>{
    return call_api({
        method: "POST",
        url: "auth/login",
        data: user
      })
}

const LoginService = {
   loginService
 }
 export default LoginService;