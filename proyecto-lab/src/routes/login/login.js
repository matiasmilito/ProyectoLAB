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
          navigate('/profile')
          mostrarAlerta();
      }).catch(() => {
        mostrarError();
      })
  }


  return (
      <div className="login">
        <form className="form-container" onSubmit={login}>
          <div className="title">
            <h2>Bienvenido</h2>
          </div>
          <div>
            <h3 className="subtitle">Inicie Sesion</h3>
          </div>
          <div className="username-container input-container ic1">
            <input
            className="input"
            id="username"
                type="text"
                placeholder=""
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <div className="cut"></div>
            <label for="username" className="placeholder">Username</label>            
          </div>
          <div className="password-container input-container ic2">
            <input
                className="input"
                id="password"
                type="password"
                placeholder=""
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <div className="cut cut-short"></div>
            <label for="password" className="placeholder">Password</label>
          </div>
          {/* <div className="button-container"> */}
            <input type="submit" className="submit" value='Ingresar'/>
            <Link to={'/register'}><input className="submit" value='Registrarme'/></Link>
          {/* </div> */}
        </form>
      </div>
  );
}

export default Login;