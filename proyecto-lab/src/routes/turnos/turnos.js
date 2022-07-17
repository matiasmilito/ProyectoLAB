import React, { useEffect } from "react";
import { useState } from "react";
import { httpGet2, httpPost2 } from "../../utils/httpFunctions";
import swal from "sweetalert";
import {useNavigate} from "react-router-dom";

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
  const [user, setUser] = useState()
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
      httpPost2('api/turnos/', {fechaturno_turno: date, horaturno_turno: time, usuario_turno: user, medico_turno: profesional, sede_turno: sedeSeleccionada
      }).then((res) => {
          navigate('/')
          turnoconfirmado();
      }).catch(() => {
          turnorechazado();
  })}


  return (
     <form onSubmit={turn}>
        <div>
          <h1>Turnos</h1>
        </div>
        <div>
          <label>Especialidad</label>
          <select
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
        </div>
        <div>
          <label>Profesional</label>
          <select
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
        </div>
        <div>
          <label>Sede</label>
          <select
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
        </div>
        <div>
          <label>Dia</label>
          <input 
          type="date"
          disabled={!sedeSeleccionada}
          value={date}
          onChange={event => setDate(event.target.value)}/>
        </div>
        <div>
          <label>Horario</label>
          <input 
          type="time"
          disabled={!date}
          value={time}
          onChange={event => setTime(event.target.value)}/> 
        </div>
        <div>
          <label>User</label>
          <input 
          type="user"
          disabled={!time}
          value={user}
          onChange={event => setUser(parseInt(event.target.value))}/> 
        </div>
        <button type="submit">enviar</button>
      </form>

  );
}

export default Turnos;