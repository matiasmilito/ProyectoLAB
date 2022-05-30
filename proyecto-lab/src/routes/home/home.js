import React from "react";
import styles from "./home.module.css";
import {Button} from '../../components/button/Button'
import Footer from '../../components/footer/footer'

const Home = () => {
  return (
    <div>
      <div className={styles.contenedor}>
        <div className={styles.fondoImagen}></div>
        <div className={styles.contenedorTitulo}>
          <h2 className={styles.titulo}>Sanatorio Rosario</h2>
          <h3 className={styles.subTitulo}>Deja tu salud en nuestras manos!</h3>
          <Button>Ver Mas</Button>
        </div>
      </div>
      <Footer></Footer>
    </div>
  )
}

export default Home;