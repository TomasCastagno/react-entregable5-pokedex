import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const SelectedPokemon = ({pokemonSelected}) => {

  const [ pokemon, setPokemon ] = useState({})

  useEffect(() => {
    axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonSelected}`)
      .then(res => setPokemon(res.data))
  }, [pokemonSelected]);



  return (
      <Link to={`/pokedex/${pokemon.id}`} className='style_link-cards' >
        <div className='pokemon-card'>
          <img src={pokemon.sprites?.other.dream_world.front_default} alt={pokemon.name} />
          <h1 className='name-pokemon'>{pokemon.name}</h1>
          <ul className='detail-card'>
            <li>Type: {(pokemon.types)?.map(type => type.type.name).join(', ')} </li>
            <li>HP: {pokemon.stats?.[0].base_stat}</li>
            <li>Attack: {pokemon.stats?.[1].base_stat}</li>
            <li>Defense: {pokemon.stats?.[2].base_stat}</li>
            <li>Speed: {pokemon.stats?.[5].base_stat}</li>
          </ul>
        </div>
      </Link>
  );
};

export default SelectedPokemon;