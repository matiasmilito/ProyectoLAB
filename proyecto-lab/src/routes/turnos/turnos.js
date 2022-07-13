import React, { useEffect } from "react";
import { useState } from "react";
import { httpGet2 } from "../../utils/httpFunctions";

const Turnos = () => {

  const [medicos, setMedicos] = useState([])

  const fetchmedicos = () => {
    httpGet2('api/medicos/')
        .then((res) => setMedicos(res.data))
  }


  useEffect(fetchmedicos, [])
  console.log(medicos[0])


  return (
      <div>
        <div>
          <h1>Turnos</h1>
        </div>
        <div>
          <label>Especialidad</label>
          <select id="especialidad" name="especialidad">
            {/* <option>{httpGet2('api/medicos/')
        .then((res) => setMedicos(res.data.name))}</option> */}
          </select>
        </div>
        <div>
          <label>Profesional</label>
          <select id="profesionales" name="profesionales">
            <option></option>
          </select>
        </div>
      </div>
  );
}

export default Turnos;