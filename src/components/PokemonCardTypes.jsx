import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import PokemonCard from './PokemonCard';

const PokemonCardTypes = ({ typeName, setPokemonSelected, setDisablePaginated }) => {

  const [types, setTypes] = useState([]);



  useEffect(() => {
    axios
      .get(`https://pokeapi.co/api/v2/type/${typeName}`)
      .then(res => setTypes(res.data.pokemon))
    setPokemonSelected("")

 
      setDisablePaginated(true)

  }, [typeName]);


  //PAGINACIÓN 
  const [currentPage, setCurrentPage] = useState(1);
  const pokemonsPerPage = 15;
  const lastIndex = pokemonsPerPage * currentPage;
  const firstIndex = lastIndex - pokemonsPerPage;
  const pokemonPaginated = types?.slice(firstIndex, lastIndex);
  const totalPokemons = types?.length;
  const totalPages = Math.ceil(totalPokemons / pokemonsPerPage);

  let numberPages = [];

  for (let i = 1; i <= totalPages; i++) {
    numberPages.push(i)
  }

  const [currentSectionPages, setCurrentSectionPages] = useState(1);
  const pagesPerSection = 9;
  const lastIndexPages = pagesPerSection * currentSectionPages;
  const firstIndexPages = lastIndexPages - pagesPerSection;
  const filterPaginated = numberPages.slice(firstIndexPages, lastIndexPages);
  const totalSections = Math.ceil(totalPages / pagesPerSection)




  return (
    <div className='list_pokedex'>
      {pokemonPaginated?.map(type => (
        <div key={type.pokemon.name}>
          <PokemonCard poke={type.pokemon} typeName={typeName} />
        </div>
      ))
      }

      <div className='paginated'>
        <button
          onClick={
            () => setCurrentSectionPages(currentSectionPages - 1)
          }
          disabled={currentSectionPages === 1}
        >{"<"}</button>
        {filterPaginated.map(number => (
          <button
            key={number}
            onClick={() => setCurrentPage(number)}>
            {number}
          </button>
        ))}
        <button
          onClick={() => setCurrentSectionPages(currentSectionPages + 1)}
          disabled={currentSectionPages === totalSections}  >
          {">"}
        </button>

      </div>
    </div>

  );
};

export default PokemonCardTypes;