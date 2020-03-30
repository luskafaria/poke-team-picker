import React from 'react';

import './styles.css';

import pokeLogo from '../../assets/pokeball.png';

export default function PokeTeam({ favorite, handleTeam }) {
  return (
    <div className="team-container">
      {favorite.map(pokemon => (
        <div key={pokemon.id} className="team-pokemon-container">
          <figure className="team-image-container">
            <img className="pokeball-logo" src={pokeLogo} alt="pokeball" />
            <img src={pokemon.sprites.front_default} alt={pokemon.name} />
            <figcaption>{pokemon.name}</figcaption>
          </figure>
          <button
            onClick={() => {
              handleTeam(pokemon);
            }} className='team-pokemon-button'
          >
            Liberar
          </button>
        </div>
      ))}
    </div>
  );
}
