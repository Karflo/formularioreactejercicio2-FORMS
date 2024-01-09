import Barranavegacion from "../Barranavegacion/Barranavegacion";
import ApiCrud from "./ApiCrud";

 function Peticiones(){

    return(
        <>
        <Barranavegacion />
        <h3>API de Crud</h3>
        <ApiCrud />
        </>
    )
 }


 
 export default Peticiones;

 //https://jsonplaceholder.typicode.com/users