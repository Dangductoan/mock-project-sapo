import {useState,useEffect,useRef} from 'react'
import { useHistory } from 'react-router-dom'
import LoginService from '../../api/LoginService'
import {AuthProvider} from '../../component/authencontext/AuthenProvide'
function Login() {
    let history = useHistory()
    const [user,setUser] = useState({})
    const api = useRef([]);
    const code = useRef('');
    const show = useRef(false);
    const [name,setName] = useState(null)
    const [password,setPassword] = useState('')
 
    
    useEffect(() => {
      setUser({username:name,password:password})
  },[name,password]);

  const handleLogin = () => {
    console.log(user)
    LoginService.loginService(user)
      .then(res => {
        api.current= res.data.user;
        code.current= res.status;
        console.log(api);
      
      }).then(()=>{
        if(code.current == "200"){
          console.log(api.current.role.name)
          if(api.current.role.name=="ROLE_ACCOUNTANT")
          history.push("/accountant");
          else if(api.current.role.name=="ROLE_CHIEF_ACCOUNTANT")
          history.push("/chief-accountant");
        }
        show.current=true;  
      }) .catch((error) => {
    console.warn('Not good man :(');
})}


    const checkLogin = ()=>{
      return (code.current == "200");
    }
  
  return (
<>
  <div>
						<label >Username</label>
						<input type="text" className="input"
						 onChange={(e) => setName(e.target.value)}
						></input>
						<label >Password</label>
						<input type="password" 
					  		onChange={(e) => setPassword(e.target.value)}
						></input>
	
				<button onClick={handleLogin}className="button ">submit</button>
	
					{(show.current) && <h3>Tai khoan hoac mat khau sai </h3>}
          <AuthProvider user={user} setUser={setUser}></AuthProvider>
	</div>

</>
  )
}
export default Login;
