import React, { useState } from 'react';
import axios from 'axios'; // Importa Axios

function Register() {
  const [userData, setUserData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    age: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Utiliza Axios para realizar la solicitud POST
      const response = await axios.post('/api/sessions/register', userData);

      if (response.status === 200) {
        // El registro fue exitoso, redirige al usuario a la página de inicio de sesión
        console.log('Registro exitoso');
      } else {
        // El registro falló, muestra un mensaje de error apropiado
        console.error('Registro fallido');
      }
    } catch (error) {
      console.error('Error en la solicitud:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="container">
        <div className="mb-3">
          <label htmlFor="first_name" className="form-label">
            First name
          </label>
          <input
            type="text"
            className="form-control"
            id="first_name"
            name="first_name"
            value={userData.first_name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="last_name" className="form-label">
            Last name
          </label>
          <input
            type="text"
            className="form-control"
            id="last_name"
            name="last_name"
            value={userData.last_name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            value={userData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="age" className="form-label">
            Age
          </label>
          <input
            type="number"
            className="form-control"
            id="age"
            name="age"
            value={userData.age}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            value={userData.password}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Register
        </button>
      </div>
    </form>
  );
}

export default Register;
