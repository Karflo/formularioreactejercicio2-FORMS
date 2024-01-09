import Barranavegacion from "../Barranavegacion/Barranavegacion";
import './Props.css';

function Props(){

    return(
        <>
        <Barranavegacion />
        </>
    )
}



//El props dentro de Usuario son los datos que le mando desde Hooks.jsx, esto puede ser cualquiercosa
export const Usuario = (props) => { //Esto lo mando a Hooks con su mismo nombre y le ponemos export para mandarlo a otro lado. Para poder importarlo debemos de usar el import en donde uqeremos usarlo
          
    
    return (
        <div>
            {/*Verifico con props.Valoresformulario si existen valores, en el caso de serlo renderiza el html*/props.valoresFormulario && (
        <>
            <div className="usuario-cyberpunk">
            <h1 className="titulo-cyberpunk">{props.valoresFormulario.tratamiento}</h1>
            <p className="texto-cyberpunk">{props.valoresFormulario.nombre}</p>
            <p className="texto-cyberpunk">{props.valoresFormulario.apellidos}</p>
            <p className="texto-cyberpunk">{props.valoresFormulario.dni}</p>
            <p className="texto-cyberpunk">{props.valoresFormulario.fecha}</p>
            <p className="texto-cyberpunk">{props.valoresFormulario.email}</p>
            <img
                src={props.valoresFormulario.imagen ? URL.createObjectURL(props.valoresFormulario.imagen) : ''}
                alt="Descripción de la imagen" /*Sobre esto, lo que hago es revisar si existe una imagen y si existe, me creará con URL una url destinada a la carpeta en cuestión de la imagen, si no existe no me muestra nada*/ 
                className="imagen-cyberpunk" 
            />    
        </div>
        </>
      )} 
    </div>
    )
}

export const Iniciar = (props) => { //Esto lo mando a Hooks con su mismo nombre y le ponemos export para mandarlo a otro lado. Para poder importarlo debemos de usar el import en donde uqeremos usarlo
          
    
    return (
        <div>
            {/*Verifico con props.Valoresformulario si existen valores, en el caso de serlo renderiza el html*/props.valoresFormulario && (
        <>
            <div className="usuario-cyberpunk">
            <h1 className="titulo-cyberpunk">{props.valoresFormulario.tratamiento}</h1>
            <p className="texto-cyberpunk">{props.valoresFormulario.nombre}</p>
            <p className="texto-cyberpunk">{props.valoresFormulario.apellidos}</p>
            <p className="texto-cyberpunk">{props.valoresFormulario.dni}</p>
            <p className="texto-cyberpunk">{props.valoresFormulario.fecha}</p>
            <p className="texto-cyberpunk">{props.valoresFormulario.email}</p>
            
        </div>
        </>
      )} 
    </div>
    )
}

export default Props;