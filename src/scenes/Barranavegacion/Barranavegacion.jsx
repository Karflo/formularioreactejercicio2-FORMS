import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';

function Barranavegacion() { // Genero una barra de navegacion gracias a Boostrap y boostrap-react-dom, con {Link redirijo a /registro que me manda a formulario}
  console.log("Renderizando contenido")
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand as={Link} to="/">Test</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/registro">Registro</Nav.Link> 
            <Nav.Link as={Link} to="/login">Iniciar sesión</Nav.Link>
            <Nav.Link as={Link} to="/hooks">Hooks</Nav.Link>
            <Nav.Link as={Link} to="/props">Props</Nav.Link>
            <Nav.Link as={Link} to="/custom">CustomHooks</Nav.Link>
            <Nav.Link as={Link} to="/api">API</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Barranavegacion;
