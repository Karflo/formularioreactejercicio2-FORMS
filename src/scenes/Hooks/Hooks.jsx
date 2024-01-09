import { useEffect, useState } from "react";
import Barranavegacion from "../Barranavegacion/Barranavegacion";
import { Usuario } from "../Props/Props";


function Hooks(){


    const [num, setNum] = useState(0);
    const [numEffect, setNumEffect] = useState(0);

    const [mostrarTexto, setMostrar] = useState("Mostrar loading");
    const [primeraCarga, setPrimeracarga] = useState(true);
//El useEffect se va a ejecutar siempre como minimo una vez, y le podemos pasar un segundo parametro opcional. Si este parametro se modifica
//Se renderizará otra vez por cada vez que se cambie el parametro mandado



useEffect( () => {
    setNumEffect(numEffect + 1)
},[numEffect])

useEffect( () => { //Ejecuta esto en la primera carga mostrando el texto "primera vez" una vez le da al boton pondrá segunda vez

    if(!primeraCarga){
        setMostrar("Cargado por segunda vez")
    }else{
        setMostrar("Cargado por primera vez")

    }
},[primeraCarga]) //Al modificar carga, pues realiza lo pertinente

const aumentarNum = () =>{
    setNum(num + 1);
}
    return (
            <>
                <Barranavegacion />
                
                <p>Prueba de Hooks</p>
                <button onClick={() => {setPrimeracarga(!primeraCarga) }}>Cambiame</button>
                <p>{mostrarTexto}</p>
                <button onClick={aumentarNum}> Hazme un click</button>
                <p>{num}</p>
                <p>{numEffect}</p>
            </>
    )
}

export default Hooks;