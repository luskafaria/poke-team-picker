import React from 'react';

import './styles.css';

export default function DetailsModal({
  modalRef,
  className,
  pokemon,
  dropdownId
}) {

  return (
    <div className='modal-background'>
      {dropdownId === pokemon.id ? (
        <div ref={modalRef} className={`${className} modal`}>
          <div className="general-details">
            <figure className="sprite">
              <img src={pokemon.sprites.front_default} alt={pokemon.name} />
              <figcaption>{pokemon.name}</figcaption>
            </figure>
            <div className="types">
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
            <div className="weight">
              <span>Peso:</span>
              <span>{pokemon.weight / 10} kg</span>
            </div>
            <div className="height">
              <span>Altura:</span>
            <span>{pokemon.height / 10} {pokemon.height / 10 >= 1 ? 'm' : 'cm'}</span>
            </div>
          </div>
          <div className="stats-details">
            <div className="abilities">
              <p>Habilidades:</p>
              {pokemon.abilities.map(item => {
                return (
                  <span key={pokemon.id + item.ability.name}>
                    {item.ability.name}
                  </span>
                );
              })}
            </div>
            <div className="stats">
              <p>Status:</p>
              <div>
                {pokemon.stats.map((item, i) => (
                  <div key={i}>
                    <span>{item.stat.name}:</span>
                    <span> {item.base_stat}</span>
                  </div> 
                ))}
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
