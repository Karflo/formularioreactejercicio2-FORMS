import axios from 'axios';


const BASE_URL = 'http://127.0.0.1:5000';

export function get(path){ //Función que permite traer a todos los usuarios desde PyCharm
    console.log("pasa por aqui getPost")
 
    return fetch(BASE_URL +  path,{
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        }
    })
    .then((response) => response.json())

}


export function post(path,data){ //Funcion que permite postear el nuevo usuario
    console.log("pasa por aqui crearPost")

    return fetch(BASE_URL + path,{
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        'body':  JSON.stringify(data), //Tomo la data siendo el nuevo usuario y lo paso como BODY
    })
    .then((response) => response.json())
    

}

export function borrarComentariospost(path,id){
    console.log("pasa por aqui borrarComentsPost")

    return fetch(BASE_URL + path + id,{
        method: 'DELETE',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
    })
    .then((response) => response.json())
}

export function borrar(path, id){
    console.log("pasa por aqui borrarPOst")

    return fetch(BASE_URL + path + "/" + id,{
        method: 'DELETE',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
    })
    .then((response) => response.json())

}

export function modificar(path, data){ //Funcion modificar que modificara el usuario en cuestion
    console.log("pasa por aqui modificarPost")

    return fetch(BASE_URL + path + "/" + data.id, { //Tomo la data del usuario que traigo
        method: 'PATCH',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),  //Realizo el metodo PATCH mandando el body mediante json y actuaulizo
      })
      .then((response) => {
        response.json()
    })
}

export function getComentario(path, id){ //Funcion que atrae los comentarios
    console.log("pasa por aqui tomarComentario")
     return fetch(BASE_URL + path + id ,{
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
    })
    .then((response) => response.json()       
    )

}

export function crearComentario(path, data){ //Funcion que crea los comentarios
    console.log("pasa por aqui crearComentario")

    return fetch(BASE_URL + path,{
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        'body':  JSON.stringify(data), 
        })
        .then((response) => response.json())
}

export function borrarComentario(path, id){ //Funcion que borra los comentarios
    console.log("pasa por aqui borrarComentario")

    return fetch(BASE_URL + path +  id,{
        method: 'DELETE',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
    })
    .then((response) => response.json())

}

export function editarComentario(path, data){ //Funcion que editará el comentario
    console.log("pasa por aqui editarComentario")

    return fetch(BASE_URL + path +  data.id, { //Tomo la data del comentario que traigo
        method: 'PATCH',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),  //Realizo el metodo PATCH mandando el body mediante json y actuaulizo
      })
      .then((response) => {
        response.json()
    })
}


export function postToken(path, data) {
    return axios.post(`${BASE_URL}${path}`, data)
      .then(response => response.data)
      .catch(error => {
        console.error('Error during POST request:', error);
        throw error;  // You might want to handle errors differently
      });
  }