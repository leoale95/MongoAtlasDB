import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Profile() {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    // Realiza una solicitud GET para obtener los datos del perfil del usuario
    axios.get('http://localhost:8080/api/users')
      .then((response) => {
        // Aquí no es necesario llamar a response.json()
        setUserData(response.data);
      })
      .catch((error) => {
        console.error('Error al obtener el perfil del usuario:', error);
      });
  }, []);

  return (
    <div>
      <h1>Perfil del usuario</h1>
      {userData ? (
        <div>
          <p>Nombre: {userData.first_name} {userData.last_name}</p>
          <p>Email: {userData.email}</p>
          <p>Edad: {userData.age}</p>
        </div>
      ) : (
        <p>Cargando...</p>
      )}
    </div>
  );
}

export default Profile;
