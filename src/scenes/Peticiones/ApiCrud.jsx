import React, { useState, useEffect } from 'react';
import './ApiCrud.css';

const ApiCrud = () => {
  const urlJSON = 'http://localhost:3000/users';
  const [usuarios, setUsuarios] = useState(null);
  const [editarUsuario, setEditarUsuario] = useState(null);
  const [nuevoUsuario, setNuevoUsuario] = useState({
    name: '',
    username: '',
    email: '',
  });

  useEffect(() => {
    fetch(urlJSON)
      .then((response) => response.json())
      .then((usuario) => {
        setUsuarios(usuario);
      })
      .catch(console.log);
  }, []);

  const borrarUsuario = (userId) => {
    fetch(`${urlJSON}/${userId}`, {
      method: 'DELETE',
    })
      .then((response) => {
        if (response.ok) {
          return fetch(urlJSON);
        }
      })
      .then((response) => response.json())
      .then((usuariosRestantes) => {
        setUsuarios(usuariosRestantes);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const introducirUsuario = () => {
    fetch(urlJSON, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(nuevoUsuario),
    })
      .then((response) => {
        if (response.ok) {
          return fetch(urlJSON);
        }
      })
      .then((response) => response.json())
      .then((nuevosUsuarios) => {
        setUsuarios(nuevosUsuarios);
        setNuevoUsuario({
          name: '',
          username: '',
          email: '',
        });
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const editarUsuarioFormulario = (userId) => { //Con la id del Usuario lo busco para poder modificarlo
    const usuarioEditar = usuarios.find((usuario) => usuario.id === userId);
    setEditarUsuario(usuarioEditar);
  };

  const actualizarUsuario = () => { /*Al presiona actualizar, realizará la peticion PATCH*/ 
    fetch(`${urlJSON}/${editarUsuario.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(editarUsuario),
    })
      .then((response) => {
        if (response.ok) { // Si la respuesta es correcta, retomo el JSON
          return fetch(urlJSON);
        }
      })
      .then((response) => response.json())
      .then((usuariosActualizados) => {
        setUsuarios(usuariosActualizados);
        setEditarUsuario(null); //Seteo a null para que desaparezca del set y asi poder cargar otro
      })
      .catch((error) => {
        console.error(error);
      });
  };

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
            <button onClick={() => editarUsuarioFormulario(usuario.id)}>Editar</button>

            <p>-----------</p>
          </div>
        ))}
{/** En el caso de que tenga un usuario para editar, muestro el otro formulario */}
      {editarUsuario && ( 
        <div>
          <h2>Editar Usuario</h2>
          <label>
            Nombre:
            <input
              type="text"
              value={editarUsuario.name}
              onChange={(e) =>
                setEditarUsuario({ ...editarUsuario, name: e.target.value })
              }
            />
          </label>
          <label>
            Usuario:
            <input
              type="text"
              value={editarUsuario.username}
              onChange={(e) =>
                setEditarUsuario({
                  ...editarUsuario,
                  username: e.target.value,
                })
              }
            />
          </label>
          <label>
            Email:
            <input
              type="text"
              value={editarUsuario.email}
              onChange={(e) =>
                setEditarUsuario({ ...editarUsuario, email: e.target.value })
              }
            />
          </label>
          <button onClick={actualizarUsuario}>Actualizar</button>
        </div>
      )}
    </>
  );
};

export default ApiCrud;
