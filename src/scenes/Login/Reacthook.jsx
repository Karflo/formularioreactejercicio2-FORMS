import { useForm } from 'react-hook-form';
import {  Card, CardBody } from "react-bootstrap";
import './Reacthook.css';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../../redux/reducers/AuthSlice';
import { useNavigate } from 'react-router-dom';

const Reacthook = () => {

  //Usamos una constante donde guardamos todo lo que deseemo.
  //register implica la forma de registrar los campos del formulario
  //handleSubmit es una funcion que se utiiliza como el event.preventDefault de submit previniendo la carga de la pagina y ejecuta la logica
  //formStaete contiene las propuedas relacionadas con el formulario como por ejemplo los errores que son aquellos que queremos mostrar
  const { handleSubmit, formState: { errors } } = useForm(); 

  const {loading, error, user} = useSelector((state) => state.user);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();


  const manejarSubmit =  (e) => {

    let userCredential = {
      username, password
    }
    dispatch(loginUser(userCredential)).then((result) => {
        if(result.payload){
          setUsername('');
          setPassword('');
          navigate('/lista')
        }
    })
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
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
        {errors.username && <p>{errors.username.message}</p>}

    </div>
    <div>
      <label for="password">Contraseña:</label>
      <input
        type="text"
        id="password"
        name="password"
        onChange={(e) => setPassword(e.target.value)}


      />
    </div>

      <button type="submit">Agregar{loading?'Loading...':'Login'}</button>
      {error && (
        <div>{error}</div>
      )}
    </form>
      </CardBody>
    
 </Card>
  
  );
};

export default Reacthook;
