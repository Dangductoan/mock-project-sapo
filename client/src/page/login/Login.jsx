import { useState } from "react";
import AuthService from "../../api/AuthService";
import logo from "./logo.svg"
function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState({});

  function handleLogin(event) {
    event.preventDefault();

    AuthService.login(username, password)
      .then((res) => {
        localStorage.setItem("user", JSON.stringify(res.data?.user));
        localStorage.setItem("token", res.data?.user?.token);

        if (res.data.user.role.name === "ROLE_ACCOUNTANT") {
          window.location.replace("/accountant");
        } else {
          window.location.replace("/chief-accountant");
        }
      })
      .catch(({ response }) => {
        setError(response.data?.error);
      });
  }

  return (
    <>
    <div className="login-container">
      <div className="login-logo">
        <img src={logo}/>
      </div>
    <div className="login-form">
        <form onSubmit={handleLogin}>
          <div className="form-ele">
          <input
            type="text"
            className="input-name"
            placeholder="Tên đăng nhập của bạn"
            onChange={(e) => setUsername(e.target.value)}
          ></input>
          </div>
        
          <div className="form-ele">
          <input
            type="password"
            className="input-password"
            placeholder="Mật khẩu đăng nhập"
            onChange={(e) => setPassword(e.target.value)}
          ></input>
          </div>

          <div className="form-ele">
          <input className="input-submit" type="submit" value="Đăng Nhập" />
          </div>
        
          
         
        </form>
        {error && <p style={{ color: "red" }}>{error.message}</p>}
      </div>
    </div>
       
    </>
  );
}

export default Login;
