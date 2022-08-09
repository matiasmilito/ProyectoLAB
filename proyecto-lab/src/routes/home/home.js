import React from "react";
import styles from "./home.module.css";
import {Link} from 'react-router-dom';
import { Button } from '../../components/button/Button'


const Home = () => {

  return (
    <div>
      <div className={styles.contenedor}>
        <div className={styles.fondoImagen}></div>
        <div className={styles.contenedorTitulo}>
          <h2 className={styles.titulo}>Sanatorio Rosario</h2>
          <h3 className={styles.subTitulo}>Deja tu salud en nuestras manos!</h3>
          <p className={styles.buttonContainer}>
            <Link to={'/sanatorio'} className={styles.verMasLink}>Ver Mas</Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Home;