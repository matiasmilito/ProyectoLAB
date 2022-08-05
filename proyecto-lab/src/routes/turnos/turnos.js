import React, { useEffect } from "react";
import { useState } from "react";
import {httpGet2, httpPost2, httpGet, httpPatch, httpPut} from "../../utils/httpFunctions";
import swal from "sweetalert";
import {useNavigate} from "react-router-dom";
import './turnos.css';

const Turnos = () => {

    const [medicos, setMedicos] = useState([])
    const [medicosFilter, setmedicosFilter] = useState([])
    const [profesional, setProfesional] = useState()
    const [especialidades, setEspecialidades] = useState([])
    const [especialidad, setEspecialidad] = useState()
    const [sede, setSede] = useState([])
    const [sedeSeleccionada, setSedeSeleccionada] = useState()
    const [dateFilter, setDateFilter] = useState([])
    const [dateSelected, setDateSelected] = useState()
    const [timeFilter, setTimeFilter] = useState([])
    const [timeSelected, setTimeSelected] = useState()
    const [user, setUser] = useState({})
    const [turnos, setTurnos] = useState([])
    const navigate = useNavigate();

    console.log(timeSelected)

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

    const fetchturnos = () => {
        httpGet2('api/turnosdisponibles')
            .then((res) => setTurnos(res.data))
    }

    useEffect(fetchmedicos, [])
    useEffect(fetchespecialidades, [])
    useEffect(fetchsede, [])
    useEffect(fetchturnos, [])
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

    const selectDate = (value) => {
        setSedeSeleccionada(value)
        const fechaFiltrada = turnos.filter((t) => {
            if(value === t.sedeturnos.id && profesional === t.medicosturnos.id){
                return true;
            }
            return false;
        })
        setDateFilter(fechaFiltrada);
    }


    const selecTime = (value) => {
        setDateSelected(value)
        const tiempoFiltrado = turnos.filter((t) => {
            if(value === t.fechaturno_turno){
                return true;
            }
            return false;
        })
        setTimeFilter(tiempoFiltrado);
    }


    /*const turn = (e) => {
        e.preventDefault()
        httpPut(`api/turnos/${timeSelected}/`, {fechaturno_turno: dateSelected, horaturno_turno: timeSelected,
            usuario_turno: user.id, medico_turno: profesional, sede_turno: sedeSeleccionada,
            turnodisponible: false
        }).then((res) => {
            navigate('/')
            turnoconfirmado();
        }).catch(() => {
            turnorechazado();
        })
    }  */

    const turn = (e) => {
        e.preventDefault()
        httpPatch(`api/turnos/${timeSelected}/` , {usuario_turno: user.id,
            turnodisponible: false
        }).then((res) => {
            navigate('/')
            turnoconfirmado();
        }).catch(() => {
            turnorechazado();
        })
    }

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
                        onChange={event => /*setSedeSeleccionada*/selectDate(parseInt(event.target.value))}>
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
                    <select
                        className="input"
                        id="date"
                        name="date"
                        type="date"
                        value={dateSelected}
                        disabled={!sedeSeleccionada}
                        onChange={event => selecTime(event.target.value)}>
                        <option selected disabled>Seleccione el día</option>
                        {
                            dateFilter.map(d => {
                                return <option value={d.fechaturno_turno}>{d.fechaturno_turno}</option>
                            })
                        }
                    </select>
                    <div className="cut"></div>
                    <label htmlFor="sede" className="placeholder">Dia</label>
                </div>
                <div className="input-container ic1">
                    <select
                        className="input"
                        id="date"
                        name="date"
                        type="date"
                        value={timeSelected}
                        disabled={!dateSelected}
                        onChange={event => setTimeSelected(event.target.value)}>
                        <option selected disabled>Seleccione la hora</option>
                        {
                            timeFilter.map(ti => {
                                return <option value={ti.id}>{ti.horaturno_turno}</option>
                            })
                        }
                    </select>
                    <div className="cut"></div>
                    <label htmlFor="sede" className="placeholder">Hora</label>
                </div>
                <div className="input-container ic2">
                    <select
                        className="input"
                        id="user"
                        type="user"
                        disabled={!timeSelected}
                        value={user.id}
                        onChange={event => setUser(parseInt(event.target.value))}>
                        <option selected defaultValue={user.id}>{user.first_name} {user.last_name}</option>
                    </select>
                    <label for="user" className="placeholder">User</label>
                </div>
                <button type="submit" className="submit">Enviar</button>
            </form>
        </div>
    );
}

export default Turnos;