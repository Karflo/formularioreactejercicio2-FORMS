import { useForm } from 'react-hook-form';
import {  Card, CardBody } from "react-bootstrap";
import React, { useState } from "react";
import './Reacthook.css';
function Reacthook() {
  const [nuevoUsuario, setNuevoUsuario] = useState({
    username: "",
    mail: "",
    password: "",
    forma: "",
    fecha: "",
  });

  //Usamos una constante donde guardamos todo lo que deseemo.
  //register implica la forma de registrar los campos del formulario
  //handleSubmit es una funcion que se utiiliza como el event.preventDefault de submit previniendo la carga de la pagina y ejecuta la logica
  //formStaete contiene las propuedas relacionadas con el formulario como por ejemplo los errores que son aquellos que queremos mostrar
  const { register, handleSubmit, formState: { errors } } = useForm(); 
  
const manejarSubmit = (data) => {
  console.log('Formulario enviado: ' ,data);
}

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
    <div>
        <label htmlFor="forma">Saludo:</label>
        <select
          id="forma"
          name="forma"
          {...register("forma", {
            required: 'Este campo es obligatorio'
          })}
        >
          <option value="">Seleccionar</option>
          <option value="Señor">Señor</option>
          <option value="Señora">Señora</option>
        </select>
        {errors.forma && <p>{errors.forma.message}</p>}
      </div>
      <div>
        <label htmlFor="fecha">Fecha de nacimiento:</label>
        <input
          type="date"
          id="fecha"
          name="fecha"
          {...register("fecha", {
            required: 'Este campo es obligatorio'
          })}
        />
        {errors.fecha && <p>{errors.fecha.message}</p>}
      </div>
      <button type="submit">Agregar</button>
    </form>
      </CardBody>
    
 </Card>
  
  );
};

export default Reacthook;
