import './Formulario.css';
import { useState } from 'react';
import { Usuario } from '../Props/Props';

function Formulario(){

    const [valores, setValores] = useState({
        tratamiento: "",
        imagen: "",
        nombre: "",
        apellidos: "",
        dni: "",
        fecha: "",
        email: "",
    }); //Seteo un objeto llamado valores gracias a useState donde cada uno de los elementos del formulario es introducido en un inicio a vacio. Recordatorio de usar name en el html para hacer referencia a los datos.
        //Puesto de no ponerlo, no se actualizará en el campo
    const [errorMostrar, setMensajeError] = useState('');
    const [mostrarDatos, setMostrarDatos] = useState(null);

    const manejarValores = (e) =>{ //Funcion que va cambiando los valores de los values según se va rellenando
          
        if (e.target.name === "imagen") { //Si el target llega a imagen, inicializará la imagen  para luego dar paso a todo lo demas
            setValores({
                ...valores,
                imagen: e.target.files[0], // Guardo el archivo en el estado de la imagen
            });
        } else {
            setValores({
                ...valores,
                [e.target.name]: e.target.value,  //Si lo denominamos mediante corchetes, cuando estemos seleccionando un label será el indicado, por lo tanto no hará falta agregaar todos los demas valores y modificará los mismos campos
            });//Traigo los valores (objeto) y replico lo que tengo para que al estar en el target, me guarde el valor, es decir, replicamos lo guardado y le introduzco las propiedades
        }
      
    }

    const manejarSubmit = (e) => { //Creo una funcion que me prevee el movimiento por defecto
        e.preventDefault();
        const mensajeError = mostrarError(valores); //Guardo en mensajeError el return de mi mostrarError de funcion
        setMensajeError(mensajeError);// Seteo el mensaje con el useState en setMensajeError y con errorMostrar muestro el return pertinente en un p
        if (!mensajeError) { //Si no hay mensaje de error muestro los datos
            setMostrarDatos(true);
        }
    }

    const mostrarError = (valores) => { //Creo una funcion que me revisa el array de valores, si encuentra alguno con vvacio me mandará el string
        for (const key in valores){
            if(valores[key] === ""){
                return  <p>Error, te faltan campos por rellenar, revisalos</p>
            }
        }
        return null; 

    }

    return (
        <>

<container>
<form onSubmit={manejarSubmit} id="formulario-cyberpunk">
                <div className="mb-3">
                    <label htmlFor="tratamiento">Tratamiento</label>
                    <select
                    id="tratamiento"
                    name="tratamiento"
                    value={valores.tratamiento}
                    onChange={manejarValores}
                    className="input-cyberpunk"
                    >
                    <option value="sr">Sr</option>
                    <option value="sra">Sra</option>
                    </select>
                </div>

                <div className="mb-3">
                    <label htmlFor="imagen">Imagen de Usuario</label>
                    <input
                    type="file"
                    id="imagen"
                    accept="image/*"
                    name="imagen"
                    onChange={manejarValores}
                    className="input-cyberpunk"
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="nombre">Nombre</label>
                    <input
                    type="text"
                    id="nombre"
                    placeholder="Introduce el nombre"
                    name="nombre"
                    onChange={manejarValores}
                    value={valores.nombre}
                    className="input-cyberpunk"
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="apellidos">Apellidos</label>
                    <input
                    type="text"
                    id="apellidos"
                    placeholder="Introduce los apellidos"
                    name="apellidos"
                    onChange={manejarValores}
                    value={valores.apellidos}
                    className="input-cyberpunk"
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="dni">DNI</label>
                    <input
                    type="text"
                    id="dni"
                    placeholder="Introduce el DNI"
                    name="dni"
                    onChange={manejarValores}
                    value={valores.dni}
                    className="input-cyberpunk"
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="fecha">Fecha de Nacimiento</label>
                    <input
                    type="date"
                    id="fecha"
                    onChange={manejarValores}
                    name="fecha"
                    value={valores.fecha}
                    className="input-cyberpunk"
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="email">Correo Electrónico</label>
                    <input
                    type="email"
                    id="email"
                    placeholder="Introduce el correo electrónico"
                    name="email"
                    onChange={manejarValores}
                    value={valores.email}
                    className="input-cyberpunk"
                    />
                </div>

                <button type="submit" className="button-cyberpunk">
                    Registrar
                </button>

                <p id="mensaje-error" className="mensaje-error-cyberpunk">
                    {errorMostrar}
                </p>
                </form>

              
</container>
             
                {
                /*Genero un booleano que al darle al submit me cambia a true, como esto hace
                que si mmostrarDatos es true y hay datos, si no los hay no lois mostrara*/ 
                mostrarDatos && <Usuario valoresFormulario={valores} />}

        </>

       
    )
}


//{mostrarDatos && (
//    <div>
//        <h2>Formulario Enviado:</h2>
//        <pre>{JSON.stringify(mostrarDatos, null, 2)}</pre>
//    </div>  
//)}

export default Formulario;