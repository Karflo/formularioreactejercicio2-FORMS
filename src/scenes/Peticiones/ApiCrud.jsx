import React, { useState, useEffect } from "react";
import "./ApiCrud.css";
import { Container, Form, Button, Card, Row, Col } from "react-bootstrap";
import { get, post, borrar, modificar, borrarComentariospost } from "../../api/requests/requests";
import Comments from "./Comments";

const ApiCrud = () => {
  const [posts, setPost] = useState(null);
  const [editarPost, setEditarPost] = useState(null);
  const [nuevoPost, setNuevoPost] = useState({
    title: "",
    text: "",
    user_id: 239,

  });

//  const PATH = "/users";
  const PATH = "/posts";
  const PATHCOMMENT = "/posts/comment/";

  useEffect(() => {
    get(PATH)
      .then((posts) => {
        setPost(posts);
      })
      .catch(console.log);
  }, []);

  const borrarPost = (postId) => {
    borrarComentariospost(PATHCOMMENT,postId)
    borrar(PATH, postId)
    get(PATH)
    .then((postArray) => {
      // Now you can use postArray as an array
      const postActualizados = postArray.filter((post) => post.id !== postId);
      setPost(postActualizados);
    })
    .catch((error) => {
      console.log(error);
    });
  };

  const introducirUsuario = () => {
    if (editarPost) {
      modificar(PATH, editarPost)
        .then(() => {
          setNuevoPost({ title: '', text: '' , id: ''});
          setEditarPost(null);
          // Realizar la lógica de recarga de datos o actualización de la lista de posts
        })
        .catch((error) => console.error('Error al editar el post:', error));
    } else{
      post(PATH, nuevoPost)
      .then(() => {
        const newPost = [...posts] //Traigo el array desestructurado
        newPost.push(nuevoPost) //Pusheo el nuevo usuario al final
        setPost(newPost) // Introduzco el usuario nuevo en el array
      })
      .catch((error) => {
        console.log(error);
      });
  };
}

  


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
<Container fluid className="p-3 contenedorApi" style={{ maxWidth: "800px" }}>
      <Card>
        <Card.Body>
          <Form>
            <Form.Group controlId="formName">
              <Form.Label>Title:</Form.Label>
              <Form.Control
                type="text"
                value={editarPost ? editarPost.title : nuevoPost.title}
                onChange={(e) => {
                  if (editarPost) {
                    setEditarPost({ ...editarPost, title: e.target.value });
                  } else {
                    setNuevoPost({ ...nuevoPost, title: e.target.value });
                  }
                }}
              />
            </Form.Group>
            <Form.Group controlId="formUsername">
              <Form.Label>Text</Form.Label>
              <Form.Control
                type="text"
                value={editarPost ? editarPost.text : nuevoPost.text}
                onChange={(e) => {
                  if (editarPost) {
                    setEditarPost({ ...editarPost, text: e.target.value });
                  } else {
                    setNuevoPost({ ...nuevoPost, text: e.target.value });
                  }
                }}
              />
            </Form.Group>
            <Button variant="primary" style={{ width: "120px" }} onClick={introducirUsuario}>
              {editarPost ? 'Guardar Cambios' : 'Agregar Post'}
            </Button>
          </Form>
        </Card.Body>
      </Card>

      <br />

      {posts &&
        posts.map((post, index) => (
          <Card key={index} className="mt-3">
            <Card.Body>
              <h5>Titulo: {post.title}</h5>
              <p>Cuerpo: {post.text}</p>
              <Button
                variant="danger"
                style={{ width: "120px" }}
                className="mr-2"
                onClick={() => borrarPost(post.id)}
              >
                Borrar Post
              </Button>
              <Button
                variant="warning"
                style={{ width: "120px", height: "60px" }}
                className="mr-2"
                onClick={() => setEditarPost({ id: post.id, title: post.title, text: post.text })}
              >
                modificar Post
              </Button>
              <Comments postId={post.id} userId={nuevoPost.user_id} pathPost={PATH} />
            </Card.Body>
          </Card>
        ))}
    </Container>
  );
};

export default ApiCrud;
