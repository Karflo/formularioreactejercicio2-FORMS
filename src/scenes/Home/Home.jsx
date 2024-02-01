import React from 'react';
import { FaReact } from 'react-icons/fa';
import './Home.css'; // Asegúrate de tener un archivo de estilos para el componente

const Home = () => {
  return (
    <div className="home-container">
      <div className="home-card">
        
        <FaReact className="react-icon" size={130} color="#61dafb" />
        <h3>¡Bienvenido al Home de React!</h3>
        <p>Este home de prueba sirve para la formación de React. Por lo que está en construcción aún.</p>
      </div>
    </div>
  );
};

export default Home;
