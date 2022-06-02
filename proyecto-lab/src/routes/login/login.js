import React from "react";
import "./login.css"
import { useState } from "react";
import {httpPost} from "../../utils/httpFunctions";

const Login = () => {

  const [username, setUsername] = useState();
  const [password, setPassword] = useState();

  const login = (e) => {
      e.preventDefault()
      httpPost('api/login/', {username: username, password: password}).then((res) => {
          localStorage.setItem('token', res.data.access)
      })
  }


  return (
      <div className="login">
        <form className="form-container" onSubmit={login}>
          <div className="username-container">
            <label className="username-label">Username</label>
            <input
                type="text"
                placeholder="tuUsuarioEjemplo"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="password-container">
            <label className="password-label">Password</label>
            <input
                type="password"
                placeholder="Ingrese su contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {/*<div className="button-container">*/}
            <button type="submit" className="login-button">Ingresar</button>
          {/*</div>*/}
        </form>
      </div>
  );
}

export default Login;