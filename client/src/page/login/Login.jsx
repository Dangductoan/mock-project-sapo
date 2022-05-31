import {useState,useEffect} from 'react'
import { useHistory } from 'react-router-dom'
import LoginService from '../../api/LoginService'
import {AuthProvider} from '../../component/authencontext/AuthenProvide'
function Login() {
    let history = useHistory()
    const [user,setUser] = useState({})
    const [apires,setApires] = useState({})
    const [name,setName] = useState(null)
    const [show,setShow] = useState(false)
    const [password,setPassword] = useState('')
    const [code,setCode] = useState('')
    const [role,setRole] = useState('')
    useEffect(() => {
      setUser({username:name,password:password})
  },[name,password]);
  

  const handleLogin = () => {
    LoginService.loginService(user)
    .then(res => {
      const data = res.data;
      const code = res.status;
      setApires(data)
      setCode(code)
      console.log(apires)
    }).catch((error) => {
      // console.warn('Not good man :(');
  })
    // console.log(apires)
    if(code === 200){
      setRole(apires.user.role.name);
      if(role==="ROLE_ACCOUNTANT")
      history.push("/accountant");
      else if(role==="ROLE_CHIEF_ACCOUNTANT")
      history.push("/chief-accountant");
    }
    else 
    setShow(!show)
  }
    const checkLogin = ()=>{
      return (code === 200);
      
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
	
					{show && <h3>Tai khoan hoac mat khau sai </h3>}
          <AuthProvider user={user} setUser={setUser}></AuthProvider>
	</div>

</>
  )
}
export default Login;
