import React, { useState, useEffect } from 'react';
import './ApiCrud.css';
import { Container, Form, Button, Card } from 'react-bootstrap';
import { get, post, borrar } from '../../api/requests/requests'

const ApiCrud = () => {
  const urlJSON = 'http://localhost:3000/users';
  const [usuarios, setUsuarios] = useState(null);
  const [editarUsuario, setEditarUsuario] = useState(null);
  const [nuevoUsuario, setNuevoUsuario] = useState({
    username: '',
    mail: '',
    password: '',
  });

  const PATH = "/users";

  useEffect(() => {
    get(PATH)
      .then((usuario) => {
        setUsuarios(usuario);
      })
      .catch(console.log);
  }, []);

  const borrarUsuario = (userId) => {
    borrar(PATH, userId)
      .then(() => { //En el caso de que el metodo borrar funcione devolverá el PATH
        return get(PATH);
      }) //Realizo una petición al set para poder actualizar la lista
      .then((usuarios) => {
        setUsuarios(usuarios);
      })
      .catch((error) => {
        console.log(error);
      });
      
  };

  const introducirUsuario = () => {
    post(PATH, nuevoUsuario)
      .catch((error) => {
        console.log(error);
      });
  };

  const editarUsuarioFormulario = (userId) => { //Con la id del Usuario lo busco para poder modificarlo
    const usuarioEditar = usuarios.find((usuario) => usuario.id === userId);
    setEditarUsuario(usuarioEditar); //Introduzco el usuario en setEditarUsuario
  };

  const actualizarUsuario = () => { /*Al presiona actualizar, realizará la peticion PATCH*/
    fetch(`PATH/${editarUsuario.id}`, {
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
    <Container fluid className="p-3 my-5 contenedorApi">
      <Card>
        <Card.Body>
          <Form>
            <Form.Group controlId="formName">
              <Form.Label>Username:</Form.Label>
              <Form.Control
                type="text"
                value={nuevoUsuario.username}
                onChange={(e) =>
                  setNuevoUsuario({ ...nuevoUsuario, username: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group controlId="formUsername">
              <Form.Label>Mail</Form.Label>
              <Form.Control
                type="text"
                value={nuevoUsuario.mail}
                onChange={(e) =>
                  setNuevoUsuario({ ...nuevoUsuario, mail: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group controlId="formEmail">
              <Form.Label>Password:</Form.Label>
              <Form.Control
                type="text"
                value={nuevoUsuario.password}
                onChange={(e) =>
                  setNuevoUsuario({ ...nuevoUsuario, password: e.target.value })
                }
              />
            </Form.Group>
            <Button variant="primary" onClick={introducirUsuario}>
              Agregar
            </Button>
          </Form>
        </Card.Body>
      </Card>

      <br />

      {usuarios &&
        usuarios.map((usuario, index) => (
          <Card key={index}>
            <Card.Body>
              <p>Nombre: {usuario.username} </p>
              <p>Email: {usuario.mail}</p>
              <Button
                variant="danger"
                onClick={() => borrarUsuario(usuario.id)}
              >
                Eliminar
              </Button>
              <Button
                variant="primary"
                onClick={() => editarUsuarioFormulario(usuario.id)}
              >
                Editar
              </Button>
            </Card.Body>
          </Card>
        ))}

      {editarUsuario && (
        <Card>
          <Card.Body>
            <h2>Editar Usuario</h2>
            <Form>
              <Form.Group controlId="formEditName">
                <Form.Label>Nombre:</Form.Label>
                <Form.Control
                  type="text"
                  value={editarUsuario.name}
                  onChange={(e) =>
                    setEditarUsuario({
                      ...editarUsuario,
                      name: e.target.value,
                    })
                  }
                />
              </Form.Group>
              <Form.Group controlId="formEditUsername">
                <Form.Label>Usuario:</Form.Label>
                <Form.Control
                  type="text"
                  value={editarUsuario.username}
                  onChange={(e) =>
                    setEditarUsuario({
                      ...editarUsuario,
                      username: e.target.value,
                    })
                  }
                />
              </Form.Group>
              <Form.Group controlId="formEditEmail">
                <Form.Label>Email:</Form.Label>
                <Form.Control
                  type="text"
                  value={editarUsuario.email}
                  onChange={(e) =>
                    setEditarUsuario({
                      ...editarUsuario,
                      email: e.target.value,
                    })
                  }
                />
              </Form.Group>
              <Button variant="primary" onClick={actualizarUsuario}>
                Actualizar
              </Button>
            </Form>
          </Card.Body>
        </Card>
      )}
    </Container>
  );
};

export default ApiCrud;
