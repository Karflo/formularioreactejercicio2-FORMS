import axios from 'axios';


const BASE_URL = 'http://127.0.0.1:5000';
const posts = "/posts";
const comments = "/comments";
const commentYpost = "/posts/comments";

export function get(path) {  
    return axios.get(BASE_URL + path, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    })
    .then((response) => response.data)
    .catch((error) => {
      // Puedes manejar los errores aquí
      console.error('Error en la solicitud GET:', error);
      throw error; // Esto puede ser opcional dependiendo de cómo quieras manejar los errores
    });
  }

  export function post(path, data) {  
    return axios.post(BASE_URL + path, data, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    })
    .then((response) => response.data)
    .catch((error) => {
      // Puedes manejar los errores aquí
      console.error('Error en la solicitud POST:', error);
      throw error; 
    });
  }

  export function borrar(path, id) {  
    return axios.delete(BASE_URL + path + "/" + id, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    })
    .then((response) => response.data)
    .catch((error) => {
      console.error('Error en la solicitud DELETE:', error);
      throw error;
    });
  }

  export function borrarComentariospost(id) {  
    console.log("FUNCIONA")
    console.log(BASE_URL + "/posts/" + id + "/comments" )
    return axios.delete(BASE_URL + "/posts/" + id + "/comments", {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    })
    .then((response) => response.data)
    .catch((error) => {
      console.error('Error en la solicitud DELETE:', error);
      console.log("test")
    });
  }

  export function modificar(path, data) {
    return axios.patch(`${BASE_URL}${path}`, data, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    })
    .then(response => response.data)
    .catch(error => {
      console.error('Error al modificar:', error);
      throw error; // Re-lanza el error para que pueda ser manejado en el código que llama a la función
    });
  }
  
export function getComentario(id){ //Funcion que atrae los comentarios
     return axios.get(BASE_URL + posts + "/" + id + comments  ,{
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
    })
    .then((response) => response.data)
    .catch((error) => {
        console.error('Error en la solicitud GET:', error);
        throw error;
    })

}


export function crearComentario(data) {
    return axios.post(`${BASE_URL}${commentYpost}`, data, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    })
    .then((response) => response.data)
    .catch((error) => {
      // Puedes manejar los errores aquí
      console.error('Error en la solicitud POST:', error);
      throw error; // Esto puede ser opcional dependiendo de cómo quieras manejar los errores
    });
  }

  export function borrarComentario(path, id) {
    console.log(BASE_URL + "" +path + "" +id)
    return axios.delete(`${BASE_URL}${path}${id}`, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    })
    .then((response) => response.data)
    .catch((error) => {
      console.error('Error en la solicitud DELETE:', error);
      throw error;
    });
  }

  export function editarComentario(path, data) {
    return axios.patch(`${BASE_URL}${path}`, data, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    })
    .then(response => response.data)
    .catch(error => {
      console.error('Error al editar comentario:', error);
      throw error;
    });
  }


export function postToken(path, data) {
    return axios.post(`${BASE_URL}${path}`, data)
      .catch(error => {
        console.error('Error during POST request:', error);
        throw error;  
      });
  }