import { useState } from "react";
import AuthService from "../../api/AuthService";

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
      <div>
        <form onSubmit={handleLogin}>
          <label>Username</label>
          <input
            type="text"
            className="input"
            onChange={(e) => setUsername(e.target.value)}
          ></input>
          <label>Password</label>
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          ></input>
          <input type="submit" value="Đăng Nhập" />
        </form>
        {error && <p style={{ color: "red" }}>{error.message}</p>}
      </div>
    </>
  );
}

export default Login;
