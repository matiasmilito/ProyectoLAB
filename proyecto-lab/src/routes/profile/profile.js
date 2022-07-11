import React, { useEffect, useState } from "react";  
import { httpGet } from "../../utils/httpFunctions";

const Profile = () => {

    const [userData, setUserData] = useState({})

    useEffect(() => {
        httpGet('api/me/').then((res) =>
        /*console.log(res.data))*/
        setUserData(res.data))
    }, [])

    /*const fetchUser = () => {
        httpGet('api/login/')
            .then((res) => setUserData(res.data))
      }

      useEffect(fetchUser, [])*/
    


    return (
        <div>
        <h2>Hola! Este es mi perfil</h2>
        <div>
            <h3>Mi nombre y apellido es {userData.first_name}  {userData.last_name}</h3>
            <h3>Mi correo es {userData.email}</h3>
            <h3>Mi nombre de usuario es {userData.username}</h3>

        </div>
      </div>       
    )
}

export default Profile