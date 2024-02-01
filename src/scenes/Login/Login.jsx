import './Login.css';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';  
import {authActionRequestFailed, authActionRequestStarted, authActionRequestSuccess} from '../../redux/actions/auth.action';
import { FaUser,FaLock  } from 'react-icons/fa';
import { MdHome } from "react-icons/md";


const Login = ( props ) => {
  //Usamos una constante donde guardamos todo lo que deseemo.
  //register implica la forma de registrar los campos del formulario
  //handleSubmit es una funcion que se utiiliza como el event.preventDefault de submit previniendo la carga de la pagina y ejecuta la logica
  //formStaete contiene las propuedas relacionadas con el formulario como por ejemplo los errores que son aquellos que queremos mostrar
  const [userCredentials, setUsercredentials] = useState( {
      username: '',
      password: ''
  } );

  const navigate = useNavigate();

  const handleChangeUsername = (username) => {
      const _userCredentials = {...userCredentials};
      _userCredentials.username = username;
      setUsercredentials(_userCredentials);
  }
  const handleChangePassword = (password) => {
    const _userCredentials = {...userCredentials};
    _userCredentials.password = password;
    setUsercredentials(_userCredentials);
}

  const handleSubmit =  (e) => {
    e.preventDefault();
      props.onLoadAuthStarted(userCredentials)

  };

  return (
    

    <form id="myForm" className="cyberpunk-form" onSubmit={handleSubmit}>
      <MdHome size={100}  color='#0F0'/>

    <div className="cyberpunk-input-group">
      <label htmlFor="username" className="cyberpunk-label">
        <FaUser className="cyberpunk-icon" />
        Usuario:
      </label>
      <input
        type="text"
        id="username"
        name="username"
        className="cyberpunk-input"
        onChange={(e) => handleChangeUsername(e.target.value)}
      />
      {props.error?.username && <p className="cyberpunk-error-message">{props.error?.username.message}</p>}
    </div>
    <div className="cyberpunk-input-group">
      <label htmlFor="password" className="cyberpunk-label"> 
        <FaLock className="cyberpunk-icon"/>
        Contraseña:
        </label>
      <input
        type="password"
        id="password"
        name="password"
        className="cyberpunk-input"
        onChange={(e) => handleChangePassword(e.target.value)}
      />
    </div>

    <button type="submit" className="cyberpunk-button">
      {props.loading ? 'Cargando...' : 'Iniciar sesión'}
    </button>

    {props.error && (
      <div className="cyberpunk-error">{props.error}</div>
    )}
  </form>

    
  
  );
};

//MapStateToProps es in objeto que recibe state y mapea los estados de Redux en el componente 
//En este caso los de authState siendo los reducers y sus estados
const mapStateToProps = (state) => ({
  loading: state.authState.loading,
  error: state.authState.error,
  user: state.authState.user,
  isAuthenticated: state.authState.isAuthenticated,
});

//Esto recibirá dispatch y tomaré de auth.actions.js las acciones de Auth Login
//NOMBRE PARA EL COMPONENTE: (LO QUE LE PASO) => LA LLAMADA DESDE EL DISPATCH
const mapDispatchToProps = (dispatch) => ({
  onLoadAuthStarted: (userCredential) => dispatch(authActionRequestStarted(userCredential)),
  onLoadAuthSuccess: (user) => dispatch(authActionRequestSuccess(user)),
  onLoadAuthFailed: (error) => dispatch(authActionRequestFailed(error)),

})

export default connect(mapStateToProps, mapDispatchToProps)(Login);
//Esto conecta los mapeos creados y los pasa como parametros al componenten Login