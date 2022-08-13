import React, { useEffect } from "react";
import {useState} from "react";
import {httpPost2, httpGet2} from "../../utils/httpFunctions";
import swal from "sweetalert";
import {useNavigate} from "react-router-dom";
import "./Register.css";


const Register = () => {

    const [first_name, setName] = useState("")
    const [last_name, setLastname] = useState("")
    const [email, setEmail] = useState("")
    const [obraSocialSeleccionada, setobraSocialSeleccionada] = useState()
    const [nro_afiliado, setAfiliado] = useState("")
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [obrasocial, setObrasocial] = useState([])
    const navigate = useNavigate()

    const mostrarAlerta = () => {
        swal({
            title: 'Se ha registrado con éxito, inicie sesión',
            icon: 'success'
        })
    }

    const mostrarError = (parametro) => {
        swal({
            title: parametro,
            icon: 'error'
        })
    }

    const createUser = (e) => {
        e.preventDefault()
        httpPost2('api/register/', {
            first_name : first_name,
            last_name : last_name,
            email : email,
            obra_social : obraSocialSeleccionada,
            nro_afiliado : nro_afiliado,
            username : username,
            password : password
        }).then(() => {
            mostrarAlerta();
            navigate('/login');
        }).catch((error) => {
            mostrarError(error.response.data);
        })
    }

    const fetchobrasocial = () => {
        httpGet2('api/obrasocial')
            .then((res) => setObrasocial(res.data))
    }

    useEffect(fetchobrasocial, [])

  return (
      <div className="Register">
          <form className="formRegister-container" onSubmit={createUser}>
                <div className="title">
                    <h2>Registrese</h2>
                </div>
                <div>
                    <h3 className="subtitle">Para poder sacar su turno</h3>
                </div>
              <div className="inputR-container ic1">
                  <input
                  className="input"
                      type="text"
                      id="firstname"
                      name="firstname"
                      placeholder=""
                      required value={first_name}
                      onChange={(e) => setName(e.target.value)}
                  />
                  <div className="cut"></div>
                  <label for="firstname" className="placeholder">Nombre</label>
              </div>
              <div className="inputR-container ic2">
                  <input
                  className="input"
                      type="text"
                      name="lastname"
                      id="lastname"
                      placeholder=""
                      disabled={!first_name}
                      required value={last_name}
                      onChange={(e) => setLastname(e.target.value)}
                  />
                  <div className="cut"></div>
                  <label for="lastname" className="placeholder">Apellido</label>
              </div>
              <div className="inputR-container ic2">
                  <input
                  className="input"
                    id="email"
                      type="email"
                      placeholder=""
                      disabled={!last_name}
                      required value={email}
                      onChange={(e) => setEmail(e.target.value)}
                  />
                  <div className="cut"></div>
                  <label for="email" className="placeholder">Email</label>
              </div>
              <div className="inputR-container ic2">
                  <select 
                   id="obrasocial" 
                   name="obrasocial"
                   className="input"
                   placeholder=""
                   disabled={!email}
                   required value={obraSocialSeleccionada}
                   onChange={event => setobraSocialSeleccionada(parseInt(event.target.value))}>
                    <option selected disabled>Seleccione Obra Social</option>
                    {
                        obrasocial.map(o => {
                            return <option value={o.id}>{o.nombre_obrasocial} - {o.plan_obrasocial}</option>
                        }) 
                    }
                  </select>
                  <div className="cut"></div>
                  <label for="obrasocial" className="placeholder">Obra Social</label>
              </div>
              <div className="inputR-container ic2">
                  <input
                  className="input"
                  id="numeroafiliado"
                      type="text"
                      placeholder=""
                      disabled={!obraSocialSeleccionada}
                      required value={nro_afiliado}
                      onChange={(e) => setAfiliado(e.target.value)}
                  />
                  <div className="cut"></div>
                  <label for="numeroafiliado" className="placeholder">Nro afiliado</label>
              </div>
              <div className="inputR-container ic2">
                  <input
                  className="input"
                  id="username"
                      type="text"
                      placeholder=""
                      disabled={!nro_afiliado}
                      required value={username}
                      onChange={(e) => setUsername(e.target.value)}
                  />
                  <div className="cut"></div>
                  <label for="username" className="placeholder">Username</label>
              </div>
              <div className="inputR-container ic2">
                  <input
                  className="input"
                  id="password"
                      type="password"
                      placeholder=""
                      disabled={!username}
                      required value={password}
                      onChange={(e) => setPassword(e.target.value)}
                  />
                  <div className="cut"></div>
                  <label for="password" className="placeholder">Contraseña</label>
              </div>
              <div>
                  <input type="submit" className="submit" value='Registrarme'/>
              </div>
          </form>
      </div>
  )
}

export default Register