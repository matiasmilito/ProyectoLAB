import React from "react";
import "./login.css"
// import { useState, useEffect} from "react";

const Login = () => {

  // const [username, setUsername] = useState();
  // const [password, setPassword] = useState();


  return (
      <div className="login">
        <div className="form-container">
          <div className="username-container">
            <label className="username-label">Username</label>
            <input type="text" placeholder="tuUsuarioEjemplo"/>
          </div>
          <div className="password-container">
            <label className="password-label">Password</label>
            <input type="password" placeholder="Ingrese su contraseña"/>
          </div>
          {/*<div className="button-container">*/}
            <button type="submit" className="login-button">Ingresar</button>
          {/*</div>*/}
        </div>
      </div>
  );
}

export default Login;