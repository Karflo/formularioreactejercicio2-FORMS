const BASE_URL = 'http://127.0.0.1:5000';

export function get(path){ //Función que permite traer a todos los usuarios desde PyCharm 
    return fetch(BASE_URL + path,{
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        }
    })
    .then((response) => response.json())

}

export function post(path,data){ //Funcion que permite postear el nuevo usuario

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

export function borrar(path, id){
    return fetch(BASE_URL + path + "/"+ id,{
        method: 'DELETE',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
    })
    .then((response) => response.json())

}

export function modificar(path, data){
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