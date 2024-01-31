import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import storeConfigure from "./redux/store/index";
import reportWebVitals from "./reportWebVitals";
import "bootstrap/dist/css/bootstrap.min.css";
import { Provider } from "react-redux";

//
//Provider es un componente proporcionado por la biblioteca react-redux que permite que todos los componentes de tu aplicación tengan acceso al store de Redux sin pasar manualmente el store como prop a cada componente.
//El prop store={store} que le estás pasando al Provider es el store de Redux que has configurado previamente con configureStore.
//Al envolver tu aplicación con el Provider, todos los componentes dentro de tu aplicación pueden acceder al estado de Redux y despachar acciones.
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={storeConfigure({ initialState: {}, cache: false })}>
      <App />
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
