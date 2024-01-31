import React, {useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { PATH_LIST, PATH_LOGIN } from '../../../constants/Path';
import './Navbar.css';
import { connect } from 'react-redux';  
import {authActionCheckStorage, authActionRequestLogout} from '../../../redux/actions/auth.action';

function Header( props ) {
    const navigate = useNavigate();

    const isTokenStored = () => {
        return !!localStorage.getItem('user')
      }
      useEffect(() => {
        const tokenStored = isTokenStored();
        if (!tokenStored) {
          navigate('/reacthooks');
        } else {
            
        }
      }, [navigate]);

    return (
        <header className="cyberpunk-header">
        <Link to={PATH_LIST} className="cyberpunk-link">Ejercicio Formulario</Link>
        <Link to={PATH_LOGIN} className="cyberpunk-link">Login</Link>
        <button className="cerrarSesion" onClick={
          () =>
           {
            props.onLogoutUser();
          navigate('/')
          }
          }
            style={{ width: "120px", display: props.isAuthenticated ? "block" : "none" }}>CERRAR SESIÓN</button>
    </header>
    );
}

const mapStateToProps = (state) => ({
    isAuthenticated: state.authState.isAuthenticated,
  });

  const mapDispatchToProps = (dispatch) => ({
    onLoadCheckStorage: (isTokenStored) => dispatch(authActionCheckStorage(isTokenStored)),
    onLogoutUser: () => dispatch(authActionRequestLogout()),
  })
  
export default connect(mapStateToProps, mapDispatchToProps)(Header);
