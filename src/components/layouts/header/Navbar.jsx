import React from 'react';
import { Link } from 'react-router-dom';
import {PATH_LIST, PATH_LOGIN, PATH_FORM} from '../../../constants/Path'
import './Navbar.css'

function Header(){ //Creo el header de la aplicacion con un link to PATH_LIST hacia una ruta de mi Router.js
    return(
        <header >
        
       <Link to={PATH_LIST}>Ejercicio Formulario</Link> 
       <Link to={PATH_FORM}>Formulario</Link> 
       <Link to={PATH_LOGIN}>Login</Link> 
        </header>
    )
}

export default Header;