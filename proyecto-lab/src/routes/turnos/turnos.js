import React, { useEffect } from "react";
import { useState } from "react";
import {httpGet2, httpPost2, httpGet, httpPatch, httpPut} from "../../utils/httpFunctions";
import swal from "sweetalert";
import {useNavigate} from "react-router-dom";
import './turnos.css';

const Turnos = () => {

    const [medicos, setMedicos] = useState([])
    const [medicosFilter, setMedicosFilter] = useState([])
    const [medicoSeleccionado, setMedicoSeleccionado] = useState('')
    const [especialidades, setEspecialidades] = useState([])
    const [especialidadSeleccionada, setEspecialidadSeleccionada] = useState('')
    const [sedes, setSedes] = useState([])
    const [sedeSeleccionada, setSedeSeleccionada] = useState('')
    const [dates, setDates] = useState([])
    const [dateSelected, setDateSelected] = useState('')
    const [times, setTimes] = useState([])
    const [timeSelected, setTimeSelected] = useState('')
    const [user, setUser] = useState({})
    const [turnos, setTurnos] = useState([])
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

    const fetchsedes = () => {
        httpGet2('api/sede')
            .then((res) => setSedes(res.data))
    }

    const fetchturnos = () => {
        httpGet2('api/turnosdisponibles')
            .then((res) => setTurnos(res.data))
    }

    useEffect(fetchmedicos, [])
    useEffect(fetchespecialidades, [])
    useEffect(fetchsedes, [])
    useEffect(fetchturnos, [])
    useEffect(() => {
        httpGet('api/me/').then((res) =>
            setUser(res.data))
    }, [])

    const selectEspecialidades = (value) => {
        setEspecialidadSeleccionada(value)
        setMedicoSeleccionado('')
        setSedeSeleccionada('')
        setDateSelected('')
        setTimeSelected('')
        const medicosFiltrados = medicos.filter((m) => {
            if(value === m.especialidades.id){
                return true;
            }
            return false;
        })
        setMedicosFilter(medicosFiltrados);
    }

    const selectProfesionales = (value) => {
        setMedicoSeleccionado(value)
        setSedeSeleccionada('')
        setDateSelected('')
        setTimeSelected('')
    }

    const selectSedes = (value) => {
        setSedeSeleccionada(value)
        setDateSelected('')
        setTimeSelected('')
        const fechasFiltradas = turnos.filter((t) => {
            if(value === t.sedeturnos.id && medicoSeleccionado === t.medicosturnos.id){
                return true;
            }
            return false;
        })
        setDates(fechasFiltradas);
    }

    const selectDate = (value) => {
        setDateSelected(value)
        setTimeSelected('')
        const tiempoFiltrado = turnos.filter((t) => {
            if(value === t.fechaturno_turno){
                return true;
            }
            return false;
        })
        setTimes(tiempoFiltrado);
    }

    const selectTime = (value) => {
        setTimeSelected(value)
    }

    const turn = (e) => {
        console.log('especialidad', especialidadSeleccionada)
        console.log('profesional', medicoSeleccionado)
        console.log('sede', sedeSeleccionada)
        console.log('fecha', dateSelected)
        console.log('hora', timeSelected)
        console.log('user', user)

        e.preventDefault()
        
        // httpPatch(`api/turnos/${timeSelected}/` , {usuario_turno: user.id,
        //     turnodisponible: false
        // }).then((res) => {
        //     navigate('/');
        //     turnoconfirmado();
        // }).catch(() => {
        //     turnorechazado();
        // })
    }

    return (
        <div className="turnos-page">
            <form onSubmit={turn} className="turnos-container">
                <div className="title">
                    <h1>Turnos</h1>
                </div>
                {
                    especialidades.length > 0 && medicos.length > 0 && sedes.length > 0 && turnos.length > 0
                        ? <>
                            <div className="input-container ic1">
                                <select
                                    className="input"
                                    id="especialidad"
                                    name="especialidad"
                                    value={especialidadSeleccionada}
                                    onChange={event => selectEspecialidades(parseInt(event.target.value))}>
                                    <option value="">Seleccione Especialidad</option>
                                    {
                                        especialidades.map(e => {
                                            return <option value={e.id}>{e.descripcion_especialidad}</option>
                                        })
                                    }
                                </select>
                                <div className="cut"></div>
                                <label htmlFor="especialidad" className="placeholder">Especialidad</label>
                            </div>
                            <div className="input-container ic1">
                                <select
                                    className="input"
                                    id="profesionales"
                                    name="profesionales"
                                    value={medicoSeleccionado}
                                    disabled={!especialidadSeleccionada}
                                    onChange={event => selectProfesionales(parseInt(event.target.value))}>
                                    <option value="">Seleccione Profesional</option>
                                    {
                                        medicosFilter.map(m => {
                                            return <option value={m.id}>{m.name} {m.last_name}</option>
                                        })
                                    }
                                </select>
                                <div className="cut"></div>
                                <label htmlFor="profesionales" className="placeholder">Profesional</label>
                            </div>
                            <div className="input-container ic1">
                                <select
                                    className="input"
                                    id="sede"
                                    name="sede"
                                    value={sedeSeleccionada}
                                    disabled={!medicoSeleccionado}
                                    onChange={event => selectSedes(parseInt(event.target.value))}>
                                    <option value="">Seleccione la Sede</option>
                                    {
                                        sedes.map(s => {
                                            return <option value={s.id}>{s.nombre_sede} - {s.direccion}</option>
                                        })
                                    }
                                </select>
                                <div className="cut"></div>
                                <label htmlFor="sede" className="placeholder">Sede</label>
                            </div>
                            <div className="input-container ic1">
                                <select
                                    className="input"
                                    id="date"
                                    name="date"
                                    type="date"
                                    value={dateSelected}
                                    disabled={!sedeSeleccionada}
                                    onChange={event => selectDate(event.target.value)}>
                                    <option value="">Seleccione el día</option>
                                    {
                                        dates.length > 0
                                        ? dates.map(d => {
                                            return <option value={d.fechaturno_turno}>{d.fechaturno_turno}</option>
                                        })
                                        : <option value="">No hay fechas disponibles</option>
                                    }
                                </select>
                                <div className="cut"></div>
                                <label htmlFor="sede" className="placeholder">Dia</label>
                            </div>
                            <div className="input-container ic1">
                                <select
                                    className="input"
                                    id="time"
                                    name="time"
                                    type="time"
                                    value={timeSelected}
                                    disabled={!dateSelected}
                                    onChange={event => selectTime(event.target.value)}>
                                    <option value="">Seleccione la hora</option>
                                    {
                                        times.length > 0
                                        ? times.map(ti => {
                                            return <option value={ti.id}>{ti.horaturno_turno}</option>
                                        })
                                        : <option value="">No hay horarios disponibles</option>
                                    }
                                </select>
                                <div className="cut"></div>
                                <label htmlFor="sede" className="placeholder">Hora</label>
                            </div>
                            <input
                                type="submit"
                                className="submit"
                                disabled={especialidadSeleccionada === '' || medicoSeleccionado === '' || sedeSeleccionada === '' || dateSelected === '' || timeSelected === ''}
                            />
                        </>
                        : <p>Cargando...</p>
                }
            </form>
        </div>
    );
}

export default Turnos;