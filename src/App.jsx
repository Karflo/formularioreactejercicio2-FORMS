// App.jsx
import React from 'react';
import './App.css';
import Barranavegacion from './scenes/Barranavegacion/Barranavegacion';
import { BrowserRouter as Router, Route, Routes, RouterProvider } from 'react-router-dom';
import Formulario from './scenes/Formulario/Formulario';
import Login from './scenes/Login/Login';
import Hooks from './scenes/Hooks/Hooks';
import Props from './scenes/Props/Props';
import Customhooks from './scenes/Customhooks/Customhooks';

import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";
import Peticiones from './scenes/Peticiones/Peticiones';
import { rutas } from './components/layouts/main/Router';

//Este index lo que realiza es una serie de rutas, en el caso de / me manda a Barranavegacion mas bien renderiza, en el caso de /registro que se combina con la barra de navegacion
//Me mandará al Formulario renderizado que se combina con el /registro
//La primera ruta me va a redigidir a Barranavegacion por eso no aparece nada
function App() {
  return (
    <div className='App'>
      {/*<Router>
        <Routes>
          <Route path="/" element={<Barranavegacion />} />
          <Route path="/registro" element={<Formulario />} />
          <Route path="/login" element={<Login />} />
          <Route path="/hooks" element={<Hooks />} />
          <Route path="/props" element={<Props />} />
          <Route path="/custom" element={<Customhooks />} />
          <Route path="/api" element={<Peticiones />} />
        </Routes>
      </Router>*/}

      {/**/ }<RouterProvider router={rutas} />
    </div>
  );
}

export default App;
