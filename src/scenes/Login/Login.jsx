import React, { useState } from 'react'
import { MDBContainer, MDBCol, MDBRow, MDBBtn, MDBRadio, MDBInput } from 'mdb-react-ui-kit';
import './Login.css';
import { Iniciar } from '../Props/Props';

//https://mdbootstrap.com/docs/react/components/buttons/ -> 
//Los MDB son componentes de Bootstrap siendo cada uno una forma de ellos, como Row filas, Col que son columnas...
function Login() {

  const [valoresLogin, setValoresLogin] = useState({
    tratamiento: "",
    imagen: "",
    nombre: "",
    apellidos: "",
    dni: "",
    fecha: "",
    email: "",
  })

  const [mostrarData, setMostrarData] = useState(false); //Realizará la funcion de mostrar los datos de lform

  const manejarValoreslogin = (e) =>{
    setValoresLogin({
      ...valoresLogin,
      [e.target.name]: e.target.value
    })
  }

  
  const manejarSubmitlogin = (e) =>{
    e.preventDefault();
    setMostrarData(true); //Seteo el booleano para true mostrar

  }


  return (
    <div>
<MDBContainer fluid className="p-3 my-5">

<MDBRow>

  <MDBCol col='10' md='6'>
    <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg" className="img-fluid" alt="Phone image" />
  </MDBCol>

  <MDBCol col='4' md='6'>
    <form onSubmit={manejarSubmitlogin}>
    <MDBInput wrapperClass='mb-4' label='' id='imagen' type='file' size="lg"  onChange={manejarValoreslogin} name='imagen'/>
    <MDBInput wrapperClass='mb-4' label='Nombre' id='nombre' type='text' size="lg" value={valoresLogin.nombre} onChange={manejarValoreslogin} name='nombre'/>
    <MDBInput wrapperClass='mb-4' label='Apellidos' id='apellidos' type='text' size="lg" value={valoresLogin.apellidos} onChange={manejarValoreslogin} name='apellidos'/>
    <MDBInput wrapperClass='mb-4' label='DNI' id='dni' type='text' size="lg" value={valoresLogin.dni} onChange={manejarValoreslogin} name='dni'/>
    <MDBInput wrapperClass='mb-4' label='Fecha de nacimiento' id='fecha' type='date' size="lg" value={valoresLogin.fecha} onChange={manejarValoreslogin} name='fecha'/>
    <MDBInput wrapperClass='mb-4' label='Correo electrónico' id='correo' type='email' size="lg" value={valoresLogin.email} onChange={manejarValoreslogin} name='email'/>
    <div>
      <p>¿Como quiere ser llamado?</p>
      <MDBRadio name='inlineRadio' id='inlineRadio1' label='Sr' inline  onChange={manejarValoreslogin} value={valoresLogin.tratamiento}/>
      <MDBRadio name='inlineRadio' id='inlineRadio2' label='Sra'  inline  onChange={manejarValoreslogin} value={valoresLogin.tratamiento} /> 
    </div>
    <MDBBtn className="mb-4 w-100" size="lg" type='submit'>Registrate</MDBBtn>

    </form>

   

  </MDBCol>

  {
        /*Genero un booleano que al darle al submit me cambia a true, como esto hace
                que si mmostrarDatos es true y hay datos, si no los hay no lois mostrara*/ 
                mostrarData && <Iniciar valoresFormulario={valoresLogin} />}
</MDBRow>

</MDBContainer>
    </div>
    
  )
}


export default Login;

