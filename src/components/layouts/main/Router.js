import {  createBrowserRouter } from "react-router-dom";
import Formulario from "../../../scenes/Formulario/Formulario";
import Login from "../../../scenes/Login/Login";
import { EVERYTHING_PATH,PATH_FORM,PATH_LIST,PATH_LOGIN,PATH_HOOK } from "../../../constants/Path";
import { Error404 } from "../errorpages/_404";
import Peticiones from "../../../scenes/Peticiones/Peticiones";
import Layout from './Layout';
import React from "react";
import Reacthook from "../../../scenes/ReactForm/Reacthook";
export const rutas  = createBrowserRouter([ //En este lugar renderiza el padre "Layout" que tiene el header, el footer y el content
  {
    element: <Layout />, //Padre de mi aplicacion
    children: [ //Estos hijos gracias a las rutas renderizarán cada vez que modifique la misma
      {
        path:PATH_FORM,
        element:<Formulario /> 
      },
      {
        path:PATH_LOGIN,
        element: <Login />
      },
      {
        path:EVERYTHING_PATH,
        element: <Error404 /> 
      },
      {
        path:PATH_LIST,
        element: <Peticiones /> 
      },
      {
        path:PATH_HOOK,
        element: <Reacthook /> 
      },
    ]
  },
  

])