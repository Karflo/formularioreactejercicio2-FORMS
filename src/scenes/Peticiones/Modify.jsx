import React from 'react';

const EditarUsuario = ({ usuarioEditado, onSubmit, onChange }) => {
  return (
    <form onSubmit={onSubmit}>
      <label>
        Nombre:
        <input
          type="text"
          name="name"
          value={usuarioEditado.name}
          onChange={onChange}
        />
      </label>
      <label>
        Usuario:
        <input
          type="text"
          name="username"
          value={usuarioEditado.username}
          onChange={onChange}
        />
      </label>
      <label>
        Email:
        <input
          type="text"
          name="email"
          value={usuarioEditado.email}
          onChange={onChange}
        />
      </label>
      <button type="submit">Actualizar</button>
    </form>
  );
};

export default EditarUsuario;
