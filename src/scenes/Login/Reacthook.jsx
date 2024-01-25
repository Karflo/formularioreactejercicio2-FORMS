import { useForm } from 'react-hook-form';
import {  Card, CardBody } from "react-bootstrap";
import './Reacthook.css';
import React, { useState } from 'react';
import { postToken } from '../../api/requests/requests';

function Reacthook() {

  const [token, setToken] = useState(null); // Nuevo estado para almacenar el token

  //Usamos una constante donde guardamos todo lo que deseemo.
  //register implica la forma de registrar los campos del formulario
  //handleSubmit es una funcion que se utiiliza como el event.preventDefault de submit previniendo la carga de la pagina y ejecuta la logica
  //formStaete contiene las propuedas relacionadas con el formulario como por ejemplo los errores que son aquellos que queremos mostrar
  const { register, handleSubmit, formState: { errors } } = useForm(); 

  const path = "/auth/login"
  


  const manejarSubmit = async (data) => {
    try {
      // Llamada a la API para obtener el token
      const response = await postToken(path, data);
      
      if (response.token) {
        // Actualiza el estado del token si la llamada es exitosa
        setToken(response.token);
      } else {
        // Manejar casos donde la autenticación falla
        console.error("Inicio de sesión fallido");
      }
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
    }
  };

  return (
    <Card>
      <CardBody>
      <form id="myForm" onSubmit={handleSubmit(manejarSubmit)}>
    <div>
      <label for="username">Usuario:</label>
      <input
        type="text"
        id="username"
        name="username"
        {...register("username", {required: 'Este campo es obligatorio', 
        minLength:{
          value: 3,
          message: 'El usuario debe tener al menos tres caracteres'
        }})}
      />
        {errors.username && <p>{errors.username.message}</p>}

    </div>
    <div>
      <label for="mail">Correo:</label>
      <input
        type="text"
        id="mail"
        name="mail"
        {...register("mail",
         {required: 'El campo de email es obligatorio', 
        minLength: 3,
        pattern:{
          value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
          message: 'Ingresa un correo electrónico valido'
        }})}

      />    
      {errors.mail && <p>{errors.mail.message}</p>}

    </div>
    <div>
      <label for="password">Contraseña:</label>
      <input
        type="text"
        id="password"
        name="password"
        {...register("password", 
        {required: 'Este campo es obligatorio',
         minLength:{
          value: 4,
          message: 'La contraseña debe contener al menos 8 caracteres'
         },
        pattern: {

        }})}

      />
    </div>

      <button type="submit">Agregar</button>
    </form>
      </CardBody>
    
 </Card>
  
  );
};

export default Reacthook;
