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

    const userId = props.userId;
  
    useEffect(() => {
        getComentario(PATH, props.postId) // Asumiendo que la función getPost espera solo dos argumentos
          .then((comentarios) => {
            setComentarios(comentarios);
          })
          .catch(console.log);
      }, []); // Agrega props.pathPost y props.postId como dependencias del useEffect
      

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
    
        if (comentarioEditado) {
          // Si hay un comentario editado, guardamos los cambios
          const updatedComment = { ...comentarioEditado, text: newComment };
    
          editarComentario(PATH, updatedComment)
            .then(() => {
              const comentariosActualizados = comentarios.map(comment =>
                comment.id === updatedComment.id ? updatedComment : comment
              );
      
              setComentarios(comentariosActualizados);
              setEditarComentario(null);
              setNewComment("");
            })
            .catch((error) => {
              console.log('Error al editar comentario:', error);
            });
        } else {
          // Si no hay un comentario en edición, agregamos un nuevo comentario
          postComentario();
        }
      };
    

    return (
      <>
      <h4>Comentarios</h4>
      {comentarios.length > 0 ? (
        comentarios.map((comentarios, index) => (
          <Card key={index} className="mt-3">
            <Card.Body>
              <p>{comentarios.text}</p>
              <p><Likes /></p>
              
              <Button
                variant="danger"
                size="sm"
                style={{ width: "80px" }}
                className="mr-2"
                onClick={() => quitarComentario(comentarios.id)}
              >
                Eliminar
              </Button>
              <Button
                variant="warning"
                size="sm"
                style={{ width: "80px" }}
                onClick={() => {
                  setEditarComentario(comentarios);
                  setNewComment(comentarios.text);
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
  