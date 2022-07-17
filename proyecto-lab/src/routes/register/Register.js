import React, { useEffect } from "react";
import {useState} from "react";
import {httpPost2, httpGet2} from "../../utils/httpFunctions";
import swal from "sweetalert";
import {useNavigate} from "react-router-dom";


const Register = () => {

    const [first_name, setName] = useState("")
    const [last_name, setLastname] = useState("")
    const [email, setEmail] = useState("")
    const [obra_social, setObra] = useState("") 
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

    const mostrarError = () => {
        swal({
            title: 'No se pudo registrar, intente nuevamente',
            icon: 'error'
        })
    }

    const createUser = (e) => {
        e.preventDefault()
        httpPost2('api/register/', {
            first_name : first_name,
            last_name : last_name,
            email : email,
            obra_social : obra_social,
            nro_afiliado : nro_afiliado,
            username : username,
            password : password
        }).then(() => {
            mostrarAlerta();
            navigate('/login');
        }).catch(() => {
            mostrarError();
        })
    }

    const fetchobrasocial = () => {
        httpGet2('api/obrasocial')
            .then((res) => setObrasocial(res.data))
    }

    useEffect(fetchobrasocial, [])

  return (
      <div>
          <form action="" onSubmit={createUser}>
              <div>
                  <label htmlFor="">Nombre</label>
                  <input
                      type="text"
                      name="firstname"
                      placeholder="Pablo"
                      required value={first_name}
                      onChange={(e) => setName(e.target.value)}
                  />
              </div>
              <div>
                  <label htmlFor="">Apellido</label>
                  <input
                      type="text"
                      name="lastname"
                      placeholder="Perez"
                      disabled={!first_name}
                      required value={last_name}
                      onChange={(e) => setLastname(e.target.value)}
                  />
              </div>
              <div>
                  <label htmlFor="">Email</label>
                  <input
                      type="email"
                      placeholder="pabloperez@gmail.com"
                      disabled={!last_name}
                      required value={email}
                      onChange={(e) => setEmail(e.target.value)}
                  />
              </div>
              <div>
                  <label htmlFor="">Obra Social</label>
                  <select 
                   id="obrasocial" 
                   name="obrasocial"
                   disabled={!email}
                   required value={obra_social} 
                   onChange={event => setObra(parseInt(event.target.value))}>
                    <option selected disabled>Seleccione Obra Social</option>
                    {
                        obrasocial.map(o => {
                            return <option value={o.id}>{o.nombre_obrasocial} - {o.plan_obrasocial}</option>
                        }) 
                    }
                  </select>
              </div>
              <div>
                  <label htmlFor="">Numero de afiliado</label>
                  <input
                      type="text"
                      placeholder="00465654066"
                      disabled={!obra_social}
                      required value={nro_afiliado}
                      onChange={(e) => setAfiliado(e.target.value)}
                  />
              </div>
              <div>
                  <label htmlFor="">Cree su Username</label>
                  <input
                      type="text"
                      placeholder="pabloPerez99"
                      disabled={!nro_afiliado}
                      required value={username}
                      onChange={(e) => setUsername(e.target.value)}
                  />
              </div>
              <div>
                  <label htmlFor="">Cree su contraseña</label>
                  <input
                      type="password"
                      placeholder="Contraseña"
                      disabled={!username}
                      required value={password}
                      onChange={(e) => setPassword(e.target.value)}
                  />
              </div>
              <div>
                  <button type="submit">Registrarme</button>
              </div>
          </form>
      </div>
  )
}

export default Register