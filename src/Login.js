/*

import React, { useState } from 'react';
import axios from 'axios';
import './Login.css';

const Login = ({ onLoginSuccess }) => {
  const [isRegistering, setIsRegistering] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [email, setEmail] = useState('');


  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = isRegistering
      ? 'http://localhost:8000/api/register/'
      : 'http://localhost:8000/api/login/';

    try {
      const response = await axios.post(url, { username, password });
      if (isRegistering) {
        setMessage('Registro exitoso. Ahora puedes iniciar sesión.');
        setIsRegistering(false);
      } else {
        localStorage.setItem('access_token', response.data.access);
        localStorage.setItem('refresh_token', response.data.refresh);
        setMessage('Inicio de sesión exitoso.');
        onLoginSuccess(); // Redirige al catálogo o dashboard
      }
    } catch {
      setMessage('Hubo un error. Verifica tus datos.');
    }
  };

  return (
    <div className="login-container">
      <h1 className="cecyflix-logo">CECYFLIX</h1>
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>{isRegistering ? 'Crear cuenta' : 'Iniciar sesión'}</h2>
        <input
          type="text"
          placeholder="Usuario"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">{isRegistering ? 'Registrarse' : 'Ingresar'}</button>
        <p>{message}</p>
        <p>
          {isRegistering ? '¿Ya tienes cuenta?' : '¿No tienes cuenta?'}{' '}
          <span
            onClick={() => setIsRegistering(!isRegistering)}
            style={{ color: '#e50914', cursor: 'pointer' }}
          >
            {isRegistering ? 'Inicia sesión' : 'Regístrate'}
          </span>
        </p>
      </form>
    </div>
  );
};

export default Login;
*/

// src/Login.js
import React, { useState } from 'react';
import axios from 'axios';
import './Login.css';

const Login = ({ onLoginSuccess }) => {
  const [isRegistering, setIsRegistering] = useState(false);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = isRegistering
      ? 'http://localhost:8000/api/register/'
      : 'http://localhost:8000/api/login/';

    const data = isRegistering
      ? { username, email, password }
      : { username, password };

    try {
      const response = await axios.post(url, data);
      if (isRegistering) {
        setMessage('Registro exitoso. Ahora puedes iniciar sesión.');
        setIsRegistering(false);
        setUsername('');
        setEmail('');
        setPassword('');
      } else {
        localStorage.setItem('access_token', response.data.access);
        localStorage.setItem('refresh_token', response.data.refresh);
        setMessage('Inicio de sesión exitoso.');
        onLoginSuccess();
      }
    } catch {
      setMessage('Hubo un error. Verifica tus datos.');
    }
  };

  return (
    <div className="login-container">
      <h1 className="cecyflix-logo">CECYFLIX</h1>
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>{isRegistering ? 'Crear cuenta' : 'Iniciar sesión'}</h2>

        <input
          type="text"
          placeholder="Usuario"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />

        {isRegistering && (
          <input
            type="email"
            placeholder="Correo electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        )}

        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit">{isRegistering ? 'Registrarse' : 'Ingresar'}</button>

        <p>{message}</p>

        <p>
          {isRegistering ? '¿Ya tienes cuenta?' : '¿No tienes cuenta?'}{' '}
          <span
            onClick={() => setIsRegistering(!isRegistering)}
            style={{ color: '#e50914', cursor: 'pointer' }}
          >
            {isRegistering ? 'Inicia sesión' : 'Regístrate'}
          </span>
        </p>
      </form>
    </div>
  );
};

export default Login;
