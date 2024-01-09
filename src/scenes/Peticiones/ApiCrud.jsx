import React, { useState, useEffect } from 'react';

const ApiCrud = () => {
  const urlJSON = 'http://localhost:3000/users';
  const [usuarios, setUsuarios] = useState(null); //Creo un setState para la lista de los usuarios
  const [editarUsuario, setUsuarioeditar] = useState(null); // Creo un setState para el usuario a editar
  const [nuevoUsuario, setNuevoUsuario] = useState({ //Creo un nuevoUsuario para poder gestionar con el metodo POST
    name: '',
    username: '',
    email: '',
  });



  useEffect(() => { //Al cargar, realizará el GET del JSON
    fetch(urlJSON)
      .then((response) => response.json())
      .then((usuario) => {
        setUsuarios(usuario);
      })
      .catch(console.log);
  }, []);

//--------------------------------------------

  const borrarUsuario = (userId) => {
    fetch(`${urlJSON}/${userId}`, {
      method: 'DELETE',
    })
      .then((response) => {
        if (response.ok) { //En el caso de que el metodo sea aceptado, retornara un fetch con el JSON designado para seguir operando, si no lanzará error
          return fetch(urlJSON);
        }
      })
      .then((response) => response.json())
      .then((usuariosRestantes) => {  
        setUsuarios(usuariosRestantes); //Esta peticion que sigue realizará de que tome el nuevo JSON borrado y lo actualice
        console.log('Usuario eliminado con éxito');
      })
      .catch((error) => {
        console.error(error);
      });
  };
//----------------------------------------------------
  const introducirUsuario = () => { //Metodo post vinculado al formulario que realiza la peticion al JSON
    fetch(urlJSON, { 
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(nuevoUsuario),
    })
      .then((response) => {
        if (response.ok) { //Si es correcta, creará el usuario y retornará el JSON realizando el fectch correspondiente para el response actualizandolo
          return fetch(urlJSON);
        }
      })
      .then((response) => response.json()) //Actualizo con la respuesta del JSON
      .then((nuevosUsuarios) => {
        setUsuarios(nuevosUsuarios);
        setNuevoUsuario({ //Agrego al useState los valores designados que quiero agregar
          name: '',
          username: '',
          email: '',
        });
        console.log('Usuario creado con éxito');
      })
      .catch((error) => {
        console.error(error);
      });
  };

  //-------------------------------------


  //-------------------------------------

  return (
    <>

<div>
        <label>
          Nombre:
          <input
            type="text"
            value={nuevoUsuario.name}
            onChange={(e) =>
              setNuevoUsuario({ ...nuevoUsuario, name: e.target.value })
            }
          />
        </label>
        <label>
          Usuario:
          <input
            type="text"
            value={nuevoUsuario.username}
            onChange={(e) =>
              setNuevoUsuario({ ...nuevoUsuario, username: e.target.value })
            }
          />
        </label>
        <label>
          Email:
          <input
            type="text"
            value={nuevoUsuario.email}
            onChange={(e) =>
              setNuevoUsuario({ ...nuevoUsuario, email: e.target.value })
            }
          />
        </label>
        <button onClick={introducirUsuario}>Agregar</button>
      </div>
      <br />

      {usuarios &&
        usuarios.map((usuario, index) => (
          <div key={index}> 
            <p>Nombre: {usuario.name} </p>
            <p>Usuario: {usuario.username}</p>
            <p>Email: {usuario.email}</p>
            <button onClick={() => borrarUsuario(usuario.id)}>Eliminar</button>

            <p>-----------</p>
          </div>
        ))}


    </>
  );
};

export default ApiCrud;
