import React, { useEffect, useState } from "react";  
import { httpGet } from "../../utils/httpFunctions";
import {useNavigate} from "react-router-dom";
import {Button} from "../../components/button/Button";

const Profile = () => {

    const [userData, setUserData] = useState({})
    const [TurnosUsuario, setTurnosUsuario] = useState([])
    const navigate = useNavigate()

    const fetchTurnosUsuario = () => {
        httpGet(`api/turnospaciente/?id_paciente=${parseInt(userData.id)}`)
            .then((res) => {
                setTurnosUsuario(res.data)
            })
    }

    useEffect(() => {
        httpGet('api/me/').then((res) =>
        setUserData(res.data))
    }, [])

    const logout = () => {
        /*localStorage.clear();*/
        localStorage.removeItem('token')
        /*window.location.href = '/';*/
        navigate('/');
    }

    /*useEffect(fetchTurnosUsuario, [])*/


    return (
        <div>
        <h2>Hola! Este es mi perfil</h2>
        <div>
            <h3>Mi nombre y apellido es {userData.first_name}  {userData.last_name}</h3>
            <h3>Mi correo es {userData.email}</h3>
            <h3>Mi nombre de usuario es {userData.username}</h3>
        </div>
            <div>
                <button href="#" onClick={logout}>Cerrar sesión</button>
            </div>
            <div>
        <button onClick={fetchTurnosUsuario}>Ver mis turnos</button>
        </div> <div>
    <table className="table table-dark">
        <thead>
        <tr>
            <th scope="col">Fecha </th>
            <th scope="col">Especialidad</th>
            <th scope="col">Medico</th>
            <th scope="col">Sede</th>
        </tr>
        </thead>
        {TurnosUsuario.map(tp => {
            return (
                <tbody>
                <tr>
                    <td>{tp.fechaturno_turno} {tp.horaturno_turno}</td>
                    <td>{tp.medicosturnos.especialidades.descripcion_especialidad}</td>
                    <td>{tp.medicosturnos.name} {tp.medicosturnos.last_name}</td>
                    <td>{tp.sedeturnos.nombre_sede}</td>
                </tr>
                </tbody>  ) })}
    </table>
        </div></div>
    )}

export default Profile