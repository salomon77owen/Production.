// src/RecomendacionIA.js
import React, { useState } from 'react';
import peliculas from './data/peliculas.json';

const RecomendacionIA = () => {
  const [input, setInput] = useState('');
  const [recomendacion, setRecomendacion] = useState('');
  const [peliculasRecomendadas, setPeliculasRecomendadas] = useState([]);

  const handleBuscarDescripcion = async () => {
    setRecomendacion('🔄 Pensando...');
    setPeliculasRecomendadas([]);

    try {
    /*  const response = await fetch('http://localhost:8000/api/recomendaciones/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt: `Tengo esta base de datos: ${peliculas.map(p => p.titulo).join(', ')}. 
Quiero que me digas los títulos que coincidan con: "${input}". Devuélveme solo los títulos separados por comas.`,
        }),
      });
      */
     //const response = await fetch('/api/recomendaciones', {
     const response = await fetch('http://localhost:8000/api/recomendaciones/', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    prompt: `Tengo esta base de datos: ${peliculas.map(p => p.titulo).join(', ')}. 
Quiero que me digas los títulos que coincidan con: "${input}". Devuélveme solo los títulos separados por comas.`,
  }),
});


      const data = await response.json();
      const textoIA = data.recomendacion.toLowerCase();
      setRecomendacion(data.recomendacion);

      const coincidencias = peliculas.filter((peli) =>
        textoIA.includes(peli.titulo.toLowerCase())
      );

      setPeliculasRecomendadas(coincidencias);
    } catch (error) {
      setRecomendacion('❌ Error al obtener recomendación IA.');
    }
  };

  return (
    <div>
      <div className="buscador">
        <input
          type="text"
          placeholder="Describe qué te gustaría ver"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button className="btn-ia" onClick={handleBuscarDescripcion}>
          Buscar por descripción
        </button>
      </div>

      {recomendacion && (
        <div className="bloque-recomendaciones">
          <h2>✨ Recomendación IA</h2>
          <p>{recomendacion}</p>
        </div>
      )}

      {peliculasRecomendadas.length > 0 && (
        <div className="galeria">
          <h2>🎞 Películas recomendadas</h2>
          <div className="grid">
            {peliculasRecomendadas.map((peli) => (
              <div className="tarjeta" key={peli.id}>
                <img src={peli.poster} alt={peli.titulo} />
                <div className="info">
                  <h3>{peli.titulo}</h3>
                  <p>{peli.descripcion}</p>
                  <span>{peli.genero}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default RecomendacionIA;
