import React, { useState, useEffect } from "react";
import { getComentario, crearComentario, borrarComentario, editarComentario } from "../../api/requests/requests";
import { Form, Button, Card } from "react-bootstrap";
import './Comment.css';
import Likes from "./Likes";

function Comments(props) {
  const [comentarios, setComentarios] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [comentarioEditado, setEditarComentario] = useState(null);

  const PATH = props.pathPost + "/comments/";
  const PATHEDIT = props.pathPost + "/comments"
  useEffect(() => {
    if (props.postId === undefined) { //Si la id que me pasan es indefinida, saldra del useEffect y no hara sus funciones
      return;
    }

    getComentario(props.postId)
      .then((comentariosData) => {
        setComentarios(comentariosData);
      })
      .catch(console.error);

  }, [props.postId]);

  const postComentario = () => {
    const data = {
      text: newComment,
      user_id: props.userId,
      post_id: props.postId,
    };
    crearComentario(data)
      .then(() => {
      return getComentario(props.postId); //Traigo los comentarios de nuevo para actualizarlo
      })
      .then((comentariosData) => {
        setComentarios(comentariosData);
        setNewComment(""); 
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const quitarComentario = (commentId) => {
    borrarComentario(PATH, commentId)
      .then(() => {
        return getComentario(props.postId); //Traigo los comentarios de nuevo una vez borrados
      })
      .then((comentariosData) => {
        setComentarios(comentariosData);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const modificarComentarios = () => {
    const updatedCommentario = { ...comentarioEditado, text: newComment }; //Le mando el comentario editado con el nuevo texto

    editarComentario(PATHEDIT, updatedCommentario)
      .then(() => {
        return getComentario(props.postId); //Traigo de nuevo los comentarios editados
      })
      .then((comentariosData) => {
        setComentarios(comentariosData);
        setEditarComentario(null);
        setNewComment("");
      })
      .catch((error) => {
        console.log('Error al editar comentario:', error);
      });
  }

  const manejarComment = (e) => { //Manejo el estado del submit
    e.preventDefault();

    if (comentarioEditado) {
      modificarComentarios();
    } else {
      postComentario();
    }
  };

  return (
    <>
      <h4>Comentarios</h4>
      {comentarios.length > 0 ? (
        comentarios.map((comentario, index) => (
          <Card key={index} className="mt-3">
            <Card.Body>
              <p>{comentario.TEXT}</p>
              <p><Likes /></p>

              <Button
                variant="danger"
                size="sm"
                style={{ width: "80px" }}
                className="mr-2"
                onClick={() => quitarComentario(comentario.id)}
              >
                Eliminar
              </Button>
              <Button
                variant="warning"
                size="sm"
                style={{ width: "80px" }}
                onClick={() => {
                  setEditarComentario(comentario);
                  setNewComment(comentario.TEXT);
                }}
              >
                Editar
              </Button>
            </Card.Body>
          </Card>
        ))
      ) : (
        <p>No hay comentarios.</p>
      )}
      <Form onSubmit={manejarComment}>
        <Form.Group controlId="formComment">
          <Form.Label className="nuevoComment">{comentarioEditado ? 'Editar comentario' : 'Nuevo comentario'}</Form.Label>
          <Form.Control
            type="text"
            placeholder="Escribe tu comentario aquí"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          />
        </Form.Group>
        <Button
          className="botonAgregar"
          type="submit"
          variant={comentarioEditado ? 'warning' : 'primary'}
          size="sm"
          style={{ width: "120px" }}
        >
          {comentarioEditado ? 'Guardar Cambios' : 'Agregar Comentario'}
        </Button>
        {comentarioEditado && (
          <Button
            variant="secondary"
            size="sm"
            style={{ width: "90px", marginLeft: "10px" }}
            onClick={() => {
              setEditarComentario(null);
              setNewComment("");
            }}
          >
            Cancelar
          </Button>
        )}
      </Form>
    </>
  );
}

export default Comments;
