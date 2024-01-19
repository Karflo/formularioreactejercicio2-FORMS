import React, { useState, useEffect } from "react";
import {getComentario, crearComentario, borrarComentario} from "../../api/requests/requests";
import {Form, Button, Card } from "react-bootstrap";


function Comments(props) {

    const [comments, setComment] = useState([]);
    const [newComment, setNewComment] = useState("");

    const PATH = props.pathPost + "/comment/";

    const userId = props.userId;
  
    useEffect(() => {
        getComentario(PATH, props.postId) // Asumiendo que la función getPost espera solo dos argumentos
          .then((comments) => {
            setComment(comments);
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
          const nuevosComentarios = [...comments]
          nuevosComentarios.push(newComment)
          setComment(nuevosComentarios)
        })
        .catch((error )=> {
            console.log(error)
        })
      }

      const quitarComentario = (commentId) =>{
        borrarComentario(PATH, commentId)
        .catch((error) => {
        console.log(error);
    })};
  



    return (
        <>
     <h4>Comentarios</h4>
      {comments.length > 0 ? (
        comments.map((comment, index) => (
          <Card key={index} className="mt-3">
            <Card.Body>
              <p>{comment.text}</p>
              <Button
                variant="danger"
                size="sm"
                style={{ width: "80px" }}
                className="mr-2"
                onClick={() => quitarComentario(comment.id)}
              >
                Eliminar
              </Button>
            </Card.Body>
          </Card>
        ))
      ) : (
        <p>No hay comentarios.</p>
      )}
      <Form>
        <Form.Group controlId="formComment">
          <Form.Label>Nuevo Comentario</Form.Label>
          <Form.Control
            type="text"
            placeholder="Escribe tu comentario aquí"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          />
        </Form.Group>
        <Button variant="primary" size="sm" style={{ width: "120px" }} onClick={postComentario}>
          Agregar Comentario
        </Button>
      </Form>
      </>
  
    );
        
}
  export default Comments;
  