import React, { useState, useEffect } from "react";
import {getComentario, crearComentario, borrarComentario, editarComentario} from "../../api/requests/requests";
import {Form, Button, Card } from "react-bootstrap";
import './Comment.css';
import Likes from "./Likes";

function Comments(props) {

    const [comentarios, setComentarios] = useState([]);
    const [newComment, setNewComment] = useState("");
    const [comentarioEditado, setEditarComentario] = useState(null);

    const PATH = props.pathPost + "/comment/";
    
    useEffect(() => {
      if (props.postId === undefined) {
        // En el caso de no recibir la id del post no realiza la peticon
        return;
      }
  
      getComentario(PATH, props.postId)
        .then((comentariosData) => {
          setComentarios(comentariosData); //Una vez finalizado el get, lo introduzco en set la data para actualizar
        })
        .catch(console.log);
  
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [comentarios]); // Agrega comentarios como dependencia
  

      const postComentario = () => {
        const data = {
            text: newComment,
            user_id: props.userId,
            post_id: props.postId,
          };
        crearComentario(PATH, data)
        .then(() => {
          const nuevosComentarios = [...comentarios]
          nuevosComentarios.push(newComment)
          setComentarios(nuevosComentarios)
        })
        .catch((error )=> {
            console.log(error)
        })
      }

      const quitarComentario = (commentId) => {
        borrarComentario(PATH, commentId)
          .then(() => {
            // Filtrar los comentarios para quitar el comentario con commentId
            const comentariosActualizados = comentarios.filter(comentarios => comentarios.id !== commentId);
            setComentarios(comentariosActualizados);
          })
          .catch((error) => {
            console.log(error);
          });
      };
      
      //Metodo que previene el evento por defecto de submit
      const manejarComment = (e) => {
        e.preventDefault();
     //Si el comentario es Editado mostrará lo primero
        if (comentarioEditado) {
          // Si hay un comentario editado, guardamos los cambios
          const updatedCommentario = { ...comentarioEditado, text: newComment };
    
          editarComentario(PATH, updatedCommentario)
            .then(() => {
              const comentariosActualizados = comentarios.map(comment =>
                comment.id === updatedCommentario.id ? updatedCommentario : comment
              );
              setComentarios(comentariosActualizados);
              setEditarComentario(null); //Seteo a nulo para poder volver al boton
              setNewComment("");
            })
            .catch((error) => {
              console.log('Error al editar comentario:', error);
            });
        } else {
          // Si no hay un comentario en edición, es decir, no contiene datos, agregamos un nuevo comentario
          postComentario();
        }
      };
    
//En este return si la longitud de comentarios es mayor a cero mostrará un apartado para agregar los comentarios
//En el caso de que no mostrar aquen o hay comentarios
//Por otro lado agregará un booleano de que si hay un comentario editandose cambiará el boton y su
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
   //Si hay comentarioEditado (es decir que se edita ) mostrará el boton de cancelar
    );
        
}
  export default Comments;
  