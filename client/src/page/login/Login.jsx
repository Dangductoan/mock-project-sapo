import { useState } from "react";
import AuthService from "../../api/AuthService";
import logo from "./logo.svg"
import "./Login.css"
import { useFormik } from "formik";
import * as Yup from "yup";
function Login() {
  const [error, setError] = useState({});
  const login= useFormik({
    initialValues: {
      username: "",
      password: ""
    },
    validationSchema: validateLogin,
    onSubmit: (login) => {
      AuthService.login(login.username, login.password)
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
    },
  });

  return (
    <>
    <div className="login-container">
      <div className="login-logo" >
        <img  src={logo}/>
      </div>
    <div className="login-form">
        <form onSubmit={login.handleSubmit}>
          <div className="form-ele">
          <input
            type="text"
            name="username"
            className="input-name"
            placeholder="Tên đăng nhập của bạn"
            onBlur={login.handleBlur}
            onChange={login.handleChange}
          />
          {login.touched.username && login.errors.username && (
            <div className="text-danger">{login.errors.username}</div>
          )}
          </div>
        
          <div className="form-ele">
          <input
            type="password"
            name="password"
            className="input-password"
            placeholder="Mật khẩu đăng nhập"
            onBlur={login.handleBlur}
            onChange={login.handleChange}
          />
          {login.touched.password && login.errors.password && (
            <div className="text-danger">{login.errors.password}</div>
          )}
          </div>

          <div className="form-ele">
          <button className="input-submit" type="submit">Đăng Nhập</button>
          </div>
        
          
         
        </form>
        {error && <p style={{ color: "red", paddingLeft : "20px"}}>{error.message}</p>}
      </div>
    </div>
       
    </>
  );
}
const validateLogin = Yup.object().shape({
  username: Yup.string().required("Chưa nhập tên"),
  password: Yup.string().required("Chưa nhập mật khẩu"),
});
export default Login;
