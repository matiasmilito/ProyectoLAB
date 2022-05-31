import React from "react";
import styles from "./footer.module.css";

const Footer = () => {
  return (
    <>
      <div className={styles.contenedor}>
        <div className={styles.columnaUno}>
          <h4>Nuestras redes</h4>
          <ul className={styles.lista}>
            <a className={styles.link} href="http://instagram.com" target={'_blank'}><li>Instagram</li></a>
            <a className={styles.link} href="http://facebook.com" target={'_blank'}><li>Facebook</li></a>
            <a className={styles.link} href="http://youtube.com" target={'_blank'}><li>Youtube</li></a>
          </ul>
        </div>
        <div className={styles.columnaDos}>
        <h4>Contactanos</h4>
          <ul>
            <li>Instagram</li>
            <li>Facebook</li>
            <li>Youtube</li>
          </ul>
        </div>
        <div className={styles.columnaTres}>
          <h4>Ubicacion</h4>
          <div className={styles.mapa}>
            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3348.277443683122!2d-60.65702663555158!3d-32.943683679066766!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95b7ab4058bb9939%3A0xdc02a2e468756e85!2sSanatorio%20Parque!5e0!3m2!1ses-419!2sar!4v1653869072396!5m2!1ses-419!2sar" width={"200"} height={"150"} loading={"lazy"}></iframe>
          </div>
        </div>
      </div>
    </>
  )
}

export default Footer;
