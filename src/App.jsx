// App.jsx
import React from "react";
import "./App.css";
import { RouterProvider } from "react-router-dom";
import "mdb-react-ui-kit/dist/css/mdb.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { rutas } from "./components/layouts/main/Router";
import { connect } from "react-redux";

//Este index lo que realiza es una serie de rutas, en el caso de / me manda a Barranavegacion mas bien renderiza, en el caso de /registro que se combina con la barra de navegacion
//Me mandará al Formulario renderizado que se combina con el /registro
//La primera ruta me va a redigidir a Barranavegacion por eso no aparece nada
function App() {
  return (
    <div>
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

      {/**/}
      <RouterProvider router={rutas} />
    </div>
  );
}

export default connect()(App);
