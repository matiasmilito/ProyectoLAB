import React from "react";

const Turnos = () => {
  return (
      <div>
        <div>
          <h1>Turnos</h1>
        </div>
        <div>
          <label>Especialidad</label>
          <select id="especialidad" name="especialidad">
            <option value="Neurologia">Neurologia</option>
            <option value="Traumatologia">Traumatologia</option>
            <option value="Kinesiologia">Kinesiologia</option>
            <option value="Oncología">Oncología</option>
          </select>
        </div>
        <div>
          <label>Profesional</label>
          <select id="profesionales" name="profesionales">
            <option value="JavierPerez">Javier Perez</option>
            <option value="GonzaloRamirez">Gonzalo Ramirez</option>
            <option value="Sabrina Fernandez">Sabrina Fernandez</option>
          </select>
        </div>
      </div>
  );
}

export default Turnos;