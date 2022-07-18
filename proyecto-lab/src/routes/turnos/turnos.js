import React, { useEffect } from "react";
import { useState } from "react";
import { httpGet2, httpPost2, httpGet } from "../../utils/httpFunctions";
import swal from "sweetalert";
import {useNavigate} from "react-router-dom";
import './turnos.css';

const Turnos = () => {

  const [medicos, setMedicos] = useState([])
  const [especialidades, setEspecialidades] = useState([])
  const [especialidad, setEspecialidad] = useState()
  const [profesional, setProfesional] = useState()
  const [medicosFilter, setmedicosFilter] = useState([])
  const [sede, setSede] = useState([])
  const [sedeSeleccionada, setSedeSeleccionada] = useState()
  const [date, setDate] = useState()
  const [time, setTime] = useState()
  const [user, setUser] = useState({})
  const navigate = useNavigate();

    const turnoconfirmado = () => {
        swal({
            title: 'Su turno ha sido guardado con éxito',
            icon: 'success'
        })
    }

    const turnorechazado = () => {
        swal({
            title: 'No se ha podido guardar el turno',
            icon: 'error'
        })
    }
 
  const fetchmedicos = () => {
    httpGet2('api/medicos')
        .then((res) => setMedicos(res.data))
  }

  const fetchespecialidades = () => {
    httpGet2('api/especialidad')
        .then((res) => setEspecialidades(res.data))
  }

  const fetchsede = () => {
    httpGet2('api/sede')
        .then((res) => setSede(res.data))
  }

  useEffect(fetchmedicos, [])
  useEffect(fetchespecialidades, [])
  useEffect(fetchsede, [])
  useEffect(() => {
    httpGet('api/me/').then((res) =>
        setUser(res.data))
}, [])

  const selectEspecialidad = (value) => {
    setEspecialidad(value)
    const medicosFiltrados = medicos.filter((m) => {
      if(value === m.especialidades.id){
        return true;
      }
      return false;
    })
    setmedicosFilter(medicosFiltrados);
  }

  const turn = (e) => {
      e.preventDefault()
      httpPost2('api/turnos/', {fechaturno_turno: date, horaturno_turno: time, usuario_turno: user.id, medico_turno: profesional, sede_turno: sedeSeleccionada
      }).then((res) => {
          navigate('/')
          turnoconfirmado();
      }).catch(() => {
          turnorechazado();
  })}


  return (
    <div className="turnos-page">
     <form onSubmit={turn} className="turnos-container">
        <div className="title">
          <h1>Turnos</h1>
        </div>
        <div className="input-container ic1">
          <select
          className="input"
            id="especialidad" 
            name="especialidad"
            value={especialidad} 
            onChange={event => selectEspecialidad(parseInt(event.target.value))}>
              <option selected disabled>Seleccione Especialidad</option>
              {
                especialidades.map(e => {
                  return <option value={e.id}>{e.descripcion_especialidad}</option>
                }) 
              }
          </select>
          <div className="cut"></div>
          <label for="especialidad" className="placeholder">Especialidad</label>
        </div>
        <div className="input-container ic1">
          <select
          className="input"
            id="profesionales" 
            name="profesionales"
            value={profesional} 
            disabled={!especialidad} 
            onChange={event => setProfesional(parseInt(event.target.value))}>
            <option selected disabled>Seleccione Profesional</option>
            {
              medicosFilter.map(m => {
                return <option value={m.id}>{m.name} {m.last_name}</option>
              }) 
            }
          </select>
          <div className="cut"></div>
          <label for="profesionales" className="placeholder">Profesional</label>
        </div>
        <div className="input-container ic1">
          <select
          className="input"
            id="sede" 
            name="sede" 
            value={sedeSeleccionada}
            disabled={!profesional}
            onChange={event => setSedeSeleccionada(parseInt(event.target.value))}>
            <option selected disabled>Seleccione la Sede</option>
            {
              sede.map(s => {
                return <option value={s.id}>{s.nombre_sede} - {s.direccion}</option>
              })
            }
          </select>
          <div className="cut"></div>
          <label for="sede" className="placeholder">Sede</label>
        </div>
        <div className="input-container ic1">
          <input 
          className="input"
          id="date"
          type="date"
          disabled={!sedeSeleccionada}
          value={date}
          onChange={event => setDate(event.target.value)}/>
          <div className="cut"></div>
          <label for="date" className="placeholder">Dia</label>
        </div>
        <div className="input-container ic1">
          <input 
          className="input"
          id="time"
          type="time"
          disabled={!date}
          value={time}
          onChange={event => setTime(event.target.value)}/> 
          <div className="cut"></div>
          <label for="time" className="placeholder">Horario</label>
        </div>
        <div className="input-container ic2">
          <select 
            className="input"
            id="user"
            type="user"
            disabled={!time}
            value={user.id}
            onChange={event => setUser(parseInt(event.target.value))}>
               <option selected defaultValue={user.id}>{user.first_name}</option>
                 <h3>Mi nombre y apellido es {user.first_name}  {user.last_name}</h3>
          </select>
          <div className="cut"></div>
          <label for="user" className="placeholder">User</label>
        </div>
        <button type="submit" className="submit">Enviar</button>
      </form>
    </div>        
  );
}

export default Turnos;