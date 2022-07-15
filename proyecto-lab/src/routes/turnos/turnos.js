import React, { useEffect } from "react";
import { useState } from "react";
import { httpGet2 } from "../../utils/httpFunctions";

const Turnos = () => {

  const [medicos, setMedicos] = useState([])
  const [especialidades, setEspecialidades] = useState([])
  const [especialidad, setEspecialidad] = useState()
  const [profesional, setProfesional] = useState()
  const [medicosFilter, setmedicosFilter] = useState([])

  const fetchmedicos = () => {
    httpGet2('api/medicos')
        .then((res) => setMedicos(res.data))
  }

  const fetchespecialidades = () => {
    httpGet2('api/especialidad')
        .then((res) => setEspecialidades(res.data))
  }

  useEffect(fetchmedicos, [])
  useEffect(fetchespecialidades, [])

  const selectEspecialidad = (value) => {
    setEspecialidad(value)
    const medicosFiltrados = medicos.filter((m) => {
      if(value === m.especialidades.id){
        return true;
      }
      return false;
    })
    setmedicosFilter(medicosFiltrados);
    console.log("hola");
  }


  return (
      <div>
        <div>
          <h1>Turnos</h1>
        </div>
        <div>
          <label>Especialidad</label>
          <select 
            id="especialidad" 
            name="especialidad" 
            onChange={event => selectEspecialidad(parseInt(event.target.value))}>
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
            disabled={!especialidad} 
            onChange={event => setProfesional(parseInt(event.target.value))}>
            <option selected>Seleccione Profesional</option>
            {
              medicosFilter.map(m => {
                return <option value={m.id}>{m.name} {m.last_name}</option>
              }) 
            }
          </select>
        </div>
      </div>
  );
}

export default Turnos;