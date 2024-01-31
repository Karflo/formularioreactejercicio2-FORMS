import './Login.css';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';  
import {authActionRequestFailed, authActionRequestStarted, authActionRequestSuccess} from '../../redux/actions/auth.action';


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
      props.onLoadAuthStarted(userCredentials)
        navigate('/')

  };

  return (
    
    <div className='tarjeta'>

        <form id="myForm" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="username">Usuario:</label>
              <input
                type="text"
                id="username"
                name="username"
                onChange={(e) => handleChangeUsername(e.target.value)}
              />
                {props.error?.username && <p>{props.error?.username.message}</p>}

            </div>
            <div>
              <label htmlFor="password">Contraseña:</label>
              <input
                type="text"
                id="password"
                name="password"
                onChange={(e) => handleChangePassword(e.target.value)}


              />
            </div>

              <button type="submit">{props.loading?'Cargando...':'Iniciar sesión'}</button>
              {props.error && (
                <div>{props.error}</div>
              )}
            </form>
    </div>
    
  
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