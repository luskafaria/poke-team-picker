import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

import PokemonCard from '../PokemonCard';
import PokeTeam from '../PokeTeam';
import DetailsModal from '../DetailsModal';
import Navbar from '../Navbar';

import './styles.css';

export default function PokemonsList() {
  const [prevUrl, setPrevUrl] = useState('');
  const [nextUrl, setNextUrl] = useState('');
  const [loading, setLoading] = useState(true);
  const [favorite, setFavorite] = useState([]);
  const [dropdownId, setDropdownId] = useState(1);
  const [dropdown, setDropdown] = useState('');
  const [search, setSearch] = useState('');

  const modalRef = useRef(null);

  const [pokemonsList, setPokemonsList] = useState([]);

  const url = 'https://pokeapi.co/api/v2/pokemon/';

  async function loadPokemonData(data) {
    let _pokemonData = await Promise.all(
      data.map(pokemon => {
        return axios
          .get(`${url}${pokemon.name}`)
          .then(response => {
            return response.data;
          })
          .catch(error => console.log(error));
      })
    );

    setPokemonsList(_pokemonData);
    setLoading(false);

    return;
  }

  function handleSearch(search) {
    setSearch(search);
  }

  function getSearchData(event) {
    event.preventDefault();

    axios.get(`${url}${search}`).then(response => {
      setPokemonsList([response.data, ...pokemonsList].flat())   
      console.log(response);
       
    });
  }  

  function handleTeam(pokemon) {
    const favoriteIds = favorite.map(pokemon => {
      return pokemon.id;
    });

    if (favorite.length >= 6 && !favoriteIds.includes(pokemon.id)) {
      alert('Treinadxr, escolha no máximo 6 pokemons.');
    } else if (favoriteIds.includes(pokemon.id)) {
      setFavorite(
        favorite.filter(item => {
          return pokemon.id !== item.id;
        })
      );
    } else {
      setFavorite([...favorite, pokemon]);
    }
  }

  function getPokemonsList() {
    axios.get(`${url}`).then(response => {
      loadPokemonData(response.data.results);
      
      setNextUrl(response.data.next);
      setPrevUrl(response.data.previous);
    });
  }

  function getLocalTeam() {
    const localPokeTeam = JSON.parse(localStorage.getItem('pokeTeam'));

    function checkLocalStorage(localPokeTeam) {
      return localPokeTeam ? true : false;
    }

    if (checkLocalStorage(localPokeTeam) && localPokeTeam.length > 0) {
      setFavorite(localPokeTeam);
    } else {
      return localStorage.removeItem('pokeTeam');
    }
  }

  function closeDropdown(event) {
    event.stopPropagation(); //impede de executar listeners dos filhos
    const contain = modalRef.current.contains(event.target);
    if (!contain) {
      //se clicar fora do modal, ele DESaparece
      console.log('hidden');
      setDropdown('');
      setDropdownId(0);
      document.body.removeEventListener('click', closeDropdown);
    }
  }

  function toggleDropdown(id) {
    setDropdownId(id);
    setDropdown('show');

    document.body.addEventListener('click', closeDropdown);
  }

  async function next() {
    const response = await axios.get(nextUrl);

    loadPokemonData(response.data.results);

    setNextUrl(response.data.next);
    setPrevUrl(response.data.previous);
  }

  async function prev() {
    if (!prevUrl) return;

    const response = await axios.get(prevUrl);

    loadPokemonData(response.data.results);

    setNextUrl(response.data.next);
    setPrevUrl(response.data.previous);
  }

  useEffect(() => {
    getLocalTeam();
    getPokemonsList();
  }, []);

  useEffect(() => {
    localStorage.setItem('pokeTeam', JSON.stringify(favorite));
  }, [favorite]);

  return (
    <>
      <div>
        {loading ? (
          <h1 style={{textAlign: "center", fontSize: 60, marginTop: 300}}>Carregando aventura...</h1>
        ) : (
          <div className="main-container">
            <header className="list-heade">
              <h1>Poke | Team Picker</h1>
              <h3>Escolha até 6 pokemons para iniciar a sua aventura.</h3>
            </header>
            <PokeTeam favorite={favorite} handleTeam={handleTeam} />

            <Navbar prev={prev} next={next} handleSearch={handleSearch} getSearchData={getSearchData}/>

            <div className="grid-container">
              {pokemonsList.map(pokemon => (
                <div key={pokemon.id}>
                  <PokemonCard
                    pokemon={pokemon}
                    handleTeam={handleTeam}
                    toggleDropdown={toggleDropdown}
                    favorite={favorite}
                  />
                  <DetailsModal
                    className={dropdown}
                    dropdownId={dropdownId}
                    modalRef={modalRef}
                    pokemon={pokemon}
                  />
                </div>
              ))}
              <div></div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
