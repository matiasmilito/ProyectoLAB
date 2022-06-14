import React from "react";
import "./login.css"
import { useState } from "react";
import {httpPost} from "../../utils/httpFunctions";
import {Link} from "react-router-dom";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";

const Login = () => {

  const [username, setUsername] = useState();
  const [password, setPassword] = useState();

  const navigate = useNavigate();

  const mostrarAlerta = () => {
    swal({
        title: 'Usted ha iniciado sesión correctamente',
        icon: 'success'
    })
}

const mostrarError = () => {
    swal({
        title: 'No se ha podido iniciar sesión',
        icon: 'error'
    })
}

  const login = (e) => {
      e.preventDefault()
      httpPost('api/login/', {username: username, password: password}).then((res) => {
          localStorage.setItem('token', res.data.access)
          navigate('/home')
          mostrarAlerta();
      }).catch(() => {
        mostrarError();
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
          {/* <div className="button-container"> */}
            <button type="submit" className="login-button">Ingresar</button>
            <Link to={'/register'}><button className="login-button">Registrarme</button></Link>
          {/* </div> */}
        </form>
      </div>
  );
}

export default Login;