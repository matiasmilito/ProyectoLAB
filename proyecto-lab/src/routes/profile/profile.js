import React, { useEffect, useState } from "react";
import { httpGet } from "../../utils/httpFunctions";
import { useNavigate } from "react-router-dom";
import styles from './profile.module.css';

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
        localStorage.removeItem('token')
        navigate('/');
    }

    return (
        <div className={styles.profileContainer}>
            <h2 className={styles.welcomeTitle}>¡Bienvenido a tu perfil!</h2>
            
            <div className={styles.userInfo}>
                <h3>Nombre y apellido: {userData.first_name} {userData.last_name}</h3>
                <h3>Correo electrónico: {userData.email}</h3>
                <h3>Nombre de usuario: {userData.username}</h3>
            </div>

            <div className={styles.buttonContainer}>
                <button 
                    className={`${styles.button} ${styles.logoutButton}`}
                    onClick={logout}>
                    Cerrar sesión
                </button>
                <button 
                    className={`${styles.button} ${styles.viewButton}`}
                    onClick={fetchTurnosUsuario}>
                    Ver mis turnos
                </button>
            </div>

            {TurnosUsuario.length > 0 && (
                <table className={styles.turnosTable}>
                    <thead>
                        <tr>
                            <th>Fecha y Hora</th>
                            <th>Especialidad</th>
                            <th>Médico</th>
                            <th>Sede</th>
                        </tr>
                    </thead>
                    <tbody>
                        {TurnosUsuario.map((tp, index) => (
                            <tr key={index}>
                                <td>{tp.fechaturno_turno} {tp.horaturno_turno}</td>
                                <td>{tp.medicosturnos.especialidades.descripcion_especialidad}</td>
                                <td>{tp.medicosturnos.name} {tp.medicosturnos.last_name}</td>
                                <td>{tp.sedeturnos.nombre_sede}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    )
}

export default Profile