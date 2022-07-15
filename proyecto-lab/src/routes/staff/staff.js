import React from "react";
import './staff.css';
import {useEffect, useState} from "react";
import {httpGet2} from "../../utils/httpFunctions";

const Staff = () => {

    const [Medicos, setMedicos] = useState([])

    const fetchMedicos = () => {
        httpGet2('api/medicos/')
            .then((res) => {
                setMedicos(res.data)
                console.log(res.data)
            })}

    let imgUrl = 'https://thumbnails.production.thenounproject.com/yHA0EnKW2hpoIb8PgqTvjLDfz-w=/fit-in/1000x1000/photos.production.thenounproject.com/photos/8D87F5C4-ECE2-44DC-BA78-344CE691F320.jpg'
    useEffect(fetchMedicos, [])
    /*const Medicos = [
        {
            id: 1,
            imgUrl: 'https://thumbnails.production.thenounproject.com/yHA0EnKW2hpoIb8PgqTvjLDfz-w=/fit-in/1000x1000/photos.production.thenounproject.com/photos/8D87F5C4-ECE2-44DC-BA78-344CE691F320.jpg',
            especialidad: 'Cardiologia',
            nombre: 'Javier',
            apellido: 'Perez'
        },
        {
            id: 2,
            imgUrl: 'https://thumbnails.production.thenounproject.com/yHA0EnKW2hpoIb8PgqTvjLDfz-w=/fit-in/1000x1000/photos.production.thenounproject.com/photos/8D87F5C4-ECE2-44DC-BA78-344CE691F320.jpg',
            especialidad: 'Traumatologia',
            nombre: 'Javier',
            apellido: 'Perez'
        },
        {
            id: 3,
            imgUrl: 'https://thumbnails.production.thenounproject.com/yHA0EnKW2hpoIb8PgqTvjLDfz-w=/fit-in/1000x1000/photos.production.thenounproject.com/photos/8D87F5C4-ECE2-44DC-BA78-344CE691F320.jpg',
            especialidad: 'Pediatria',
            nombre: 'Javier',
            apellido: 'Perez'
        },
        {
            id: 4,
            imgUrl: 'https://thumbnails.production.thenounproject.com/yHA0EnKW2hpoIb8PgqTvjLDfz-w=/fit-in/1000x1000/photos.production.thenounproject.com/photos/8D87F5C4-ECE2-44DC-BA78-344CE691F320.jpg',
            especialidad: 'Oncología',
            nombre: 'Javier',
            apellido: 'Perez'
        },
        {
            id: 5,
            imgUrl: 'https://thumbnails.production.thenounproject.com/yHA0EnKW2hpoIb8PgqTvjLDfz-w=/fit-in/1000x1000/photos.production.thenounproject.com/photos/8D87F5C4-ECE2-44DC-BA78-344CE691F320.jpg',
            especialidad: 'Neumologia',
            nombre: 'Javier',
            apellido: 'Perez'
        },
        {
            id: 6,
            imgUrl: 'https://thumbnails.production.thenounproject.com/yHA0EnKW2hpoIb8PgqTvjLDfz-w=/fit-in/1000x1000/photos.production.thenounproject.com/photos/8D87F5C4-ECE2-44DC-BA78-344CE691F320.jpg',
            especialidad: 'Neurologia',
            nombre: 'Javier',
            apellido: 'Perez'
        }
    ]*/

    return (
        <div>
            <div className="staff-background"/>
            <div className="staff-page">
                <h1 className="staff-title">Nuestros profesionales</h1>
                <h2 className="staff-subtitle">Contamos con el staff de medicos mas capacitados de la region</h2>
            </div>
            <div className="staff-items">
                {Medicos.map((data) => (
                    <div key={data.id} className="staff-container">
                        <img className="staff-img" src={imgUrl} alt=""/>
                        <h2>{data.name} {data.last_name}</h2>
                        <p>{data.especialidades.descripcion_especialidad}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Staff;