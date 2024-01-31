import {  createBrowserRouter } from "react-router-dom";

import { EVERYTHING_PATH,PATH_LIST, PATH_LOGIN, PATH_HOME } from "../../../constants/Path";
import { Error404 } from "../errorpages/_404";
import Peticiones from "../../../scenes/Peticiones/Peticiones";
import Layout from './Layout';
import React from "react";
import Login from "../../../scenes/Login/Login";
import Home from "../../../scenes/Home/Home";
export const rutas  = createBrowserRouter([ //En este lugar renderiza el padre "Layout" que tiene el header, el footer y el content
  {
    element: <Layout />, //Padre de mi aplicacion
    children: [ //Estos hijos gracias a las rutas renderizarán cada vez que modifique la misma
      {
        path:EVERYTHING_PATH,
        element: <Error404 /> 
      },
      {
        path:PATH_LIST,
        element: <Peticiones /> 
      },
      {
        path:PATH_LOGIN,
        element: <Login /> 
      },
      {
        path:PATH_HOME,
        element: <Home /> 
      },
    ]
  },
  

])