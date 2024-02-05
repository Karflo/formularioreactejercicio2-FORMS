import React, { useState, useEffect } from "react";
import "./ApiCrud.css";
import { Container, Form, Button, Card } from "react-bootstrap";
import { get, post, borrar, modificar, borrarComentariospost } from "../../api/requests/requests";
import Comments from "./Comments";
import { connect } from 'react-redux';  
import { getActionRequestStarted, getActionRequestSuccess, postActionRequestFailed, postActionRequestStarted, postActionRequestSuccess } from "../../redux/actions/post.action";

const ApiCrud = ( props ) => {
  const userID = 57;
  const [posts, setPost] = useState(null);
  const [editarPost, setEditarPost] = useState(null);
  const [nuevoPost, setNuevoPost] = useState({
    title: "",
    text: "",
    user_id: userID,

  });

  const PATH = "/posts";
  const PATHCOMMENT = "/posts/comment/";



  useEffect(() => {
    props.onLoadGetStarted(PATH); // Dispara la acción de solicitud GET

  },[])

  const actualizarDatos = () => { //Actualizo los datos de los posts
    get(PATH)
      .then((posts) => {
        setPost(posts);
      })
      .catch(console.log);
  };

  const borrarPost = (postId) => { //Borramos el post a traves de la id del Post
    borrarComentariospost(postId)
    .then(() => borrar(PATH, postId))
    .then(() => actualizarDatos());
    
  };



  const introducirUsuario = () => {
    if (editarPost) {
      modificar(PATH, editarPost)
      .then(() => actualizarDatos())
      .then((postArray) => { //Tomo el array proviente del get para poder introducirlo en post
        setPost(postArray);
        setNuevoPost({ title: '', text: '', user_id: userID }); //Se establece el nuevopost en vacio
        setEditarPost(null); //Se pone en nulo para poder salir del modo edit de nuestros botonee
      })
        .catch((error) => console.error('Error al editar el post:', error));
    } else{
      props
      .onLoadPostStarted(nuevoPost)
      /*.then(() => actualizarDatos())
      .then(() => {
        const newPost = [...posts] //Traigo el array desestructurado
        newPost.push(nuevoPost) //Pusheo el nuevo usuario al final
        setPost(newPost) // Introduzco el usuario nuevo en el array
      })*/
  };
}



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
                value={editarPost ? editarPost.TEXT : nuevoPost.TEXT}
                onChange={(e) => {
                  if (editarPost) {
                    setEditarPost({ ...editarPost, text: e.target.value });
                  } else {
                    setNuevoPost({ ...nuevoPost, text: e.target.value });
                  }
                }}
              />
            </Form.Group>
            <Button className="agregarPost" variant="primary" style={{ width: "120px" }} onClick={introducirUsuario}>
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
              <h5>ID: {post.id}</h5>
              <p>Cuerpo: {post.text} {post.TEXT}</p>
              <div className="botones">
              <Button
                variant="danger"
                style={{ width: "120px" }}
                className="mr-2"
                onClick={() => borrarPost(post.id)}
              >
                Borrar 
              </Button>
              <Button
                variant="warning"
                style={{ width: "120px"}}
                className="mr-2"
                onClick={() => setEditarPost({ id: post.id, title: post.title, text: post.TEXT })}
              >
                modificar 
              </Button>
              </div>

              <div>
              <Comments postId={post.id} userId={nuevoPost.user_id} pathPost={PATH} />

              </div>
            </Card.Body>
          </Card>
        ))}
    </Container>
  );
};

const mapStateToProps = (state) => ({
  loading: state.postState.loading,
  error: state.postState.error,
  post: state.postState.post
});

const mapDispatchToProps = (dispatch) => ({
  onLoadPostStarted: (nuevoPost) => dispatch(postActionRequestStarted(nuevoPost)),
  onLoadPostSuccess: (post) => dispatch(postActionRequestSuccess(post)),
  onLoadPostFailed: (error) => dispatch(postActionRequestFailed(error)),
  onLoadGetStarted: (url) => dispatch(getActionRequestStarted(url)), // Nueva acción para solicitudes GET

})

export default connect(mapStateToProps, mapDispatchToProps)(ApiCrud);
