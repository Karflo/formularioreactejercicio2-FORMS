import React, { useState, useEffect } from "react";
import "./ApiCrud.css";
import { Container, Form, Button, Card, Row, Col } from "react-bootstrap";
import { get, post, borrar, modificar } from "../../api/requests/requests";

const ApiCrud = () => {
  const [usuarios, setUsuarios] = useState(null);
  const [editarUsuario, setEditarUsuario] = useState(null);
  const [nuevoUsuario, setNuevoUsuario] = useState({
    username: "",
    mail: "",
    password: "",
  });

  const PATH = "/users";
  const PATHPOST = "/post";
  const PATHCOMMENTS = "/comentarios";

  useEffect(() => {
    get(PATH)
      .then((usuario) => {
        setUsuarios(usuario);
      })
      .catch(console.log);
  }, []);

  const borrarUsuario = (userId) => {
    borrar(PATH, userId)
      .then(() => {
        const usuariosArray = get(PATH); //Obtengo la lista de usuarios
       //Filtro en la lista de los usuarios con la id extraida de usuariosArray y lo elimino
        const usuariosActualizados = usuariosArray.filter((usuario) => usuario.id !== userId);
        setUsuarios(usuariosActualizados) //Actualizo con mi nuevoi array la lista 

      }) //Realizo una petición al set para poder actualizar la lista
      .catch((error) => {
        console.log(error);
      });
  };

  const introducirUsuario = () => {
    post(PATH, nuevoUsuario)
      .then(() => {
        const newUser = [...usuarios] //Traigo el array desestructurado
        newUser.push(nuevoUsuario) //Pusheo el nuevo usuario al final
        setUsuarios(newUser) // Introduzco el usuario nuevo en el array
      })
      .catch((error) => {
        console.log(error);
      });
  };


  /* 
   Funcion que al mencionar el boton aplicará los datos al formulario de editar
  const editarUsuarioFormulario = (userId) => {
    Con la id del Usuario lo busco para poder modificarlo
    const usuarioEditar = usuarios.find((usuario) => usuario.id === userId);
    setEditarUsuario(usuarioEditar); Introduzco el usuario en setEditarUsuario
  };

  Funcion actualizar usuario que modificara el usuario solicitadoS
  const actualizarUsuario = (data) => {
    Al presiona actualizar, realizará la peticion PATCH
    modificar(PATH, data) 
    .then(() => { Al terminar la peticion hago un map de usuarios de nuevo, comparando las ids, si coincide muestro la lista con los datos
      usuarios.map((usuario) => usuario.id === data.userId ? { ...usuario, ...data } : usuario 
  );
      setEditarUsuario(null);
    })
      .catch((error) => {
        //
        console.error(error);
      });
      
  };*/ 


  return (
<Container fluid className="p-3 contenedorApi">
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
          <Card key={index} className="mt-3">
            <Card.Body>
              <Row>
                <Col>
                  <h5>Nombre: {usuario.username}</h5>
                  <p>Email: {usuario.mail}</p>
                  <Button
                    variant="danger"
                    className="mr-2"
                    onClick={() => borrarUsuario(usuario.id)}
                  >
                    Eliminar
                  </Button>
                </Col>
                <Col>
                  <Button variant="warning">
                    Agregar comentario
                  </Button>
                </Col>
              </Row>
              <Row className="mt-1">
                <Col>
                  {usuario.comentarios && usuario.comentarios.map((comentario, idx) => (
                    <div key={idx} className="mb-2">
                      <p><strong>Comentario {idx + 1}:</strong> {comentario}</p>
                    </div>
                  ))}
                </Col>
              </Row>
            </Card.Body>
          </Card>
        ))}
    </Container>
  );
};

export default ApiCrud;


/*     {editarUsuario && (
        <Card>
          <Card.Body>
            <h2>Editar Usuario</h2>
            <Form>
              <Form.Group controlId="formEditName">
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
              <Form.Group controlId="formEditUsername">
                <Form.Label>Email:</Form.Label>
                <Form.Control
                  type="text"
                  value={editarUsuario.mail}
                  onChange={(e) =>
                    setEditarUsuario({
                      ...editarUsuario,
                      mail: e.target.value,
                    })
                  }
                />
              </Form.Group>
              <Form.Group controlId="formEditEmail">
                <Form.Label>Contraseña:</Form.Label>
                <Form.Control
                  type="text"
                  value={editarUsuario.password}
                  onChange={(e) =>
                    setEditarUsuario({
                      ...editarUsuario,
                      password: e.target.value,
                    })
                  }
                />
              </Form.Group>
              <Button
                variant="primary"
                onClick={() =>
                  actualizarUsuario(editarUsuario, editarUsuario.id)
                }
              >
                Actualizar
              </Button>
            </Form>
          </Card.Body>
        </Card>
      )}*/ 