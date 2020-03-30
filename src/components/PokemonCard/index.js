import React from 'react';
import { FiCrosshair } from 'react-icons/fi';

import './styles.css';

export default function PokemonCard({
  pokemon,
  handleTeam,
  toggleDropdown,
  favorite
}) {
  
  return (
    <>
      <div
        className={
           favorite.some(item => item.id === pokemon.id) ? 'card-container catched' : 'card-container'
        }
      >
        <div>
          {favorite.some(item => item.id === pokemon.id) ? (
            <FiCrosshair className="catched-icon" size={25} color="333" />
          ) : null}
        </div>

        <figure className="card-image-container">
          <img src={pokemon.sprites.front_default} alt={pokemon.name} />
          <figcaption>{pokemon.name}</figcaption>
        </figure>
        <div className="types-container">
          {pokemon.types.map(item => {
            return (
              <span
                key={pokemon.id + item.type.name}
                className={item.type.name}
              >
                {item.type.name}
              </span>
            );
          })}
        </div>
        <div className="abilities-container">
          <p>Habilidades:</p>
          {pokemon.abilities.map(item => {
            return (
              <span key={pokemon.id + item.ability.name}>
                {item.ability.name}
              </span>
            );
          })}
        </div>
        <button
          className={
            favorite.some(item => item.id === pokemon.id)
              ? 'button button-details button-free'
              : 'button button-details'
          }
          onClick={() => handleTeam(pokemon)}
        >
          {favorite.some(item => item.id === pokemon.id) ? <span>Liberar</span> : <span>Capturar</span>}
        </button>
        <button className="button" onClick={() => {toggleDropdown(pokemon.id)}}>
          detalhes
        </button>
      </div>
    </>
  );
}
