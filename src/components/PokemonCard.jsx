import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const PokemonCard = ({ poke }) => {

  const [pokemon, setPokemon] = useState([])


  useEffect(() => {
    axios
      .get(poke.url)
      .then(res => setPokemon(res.data))

  }, []);



  return (

    <Link to={`/pokedex/${pokemon.id}`} className='style_link-cards' >

      <div className='pokemon-card'>
        <img src={pokemon.sprites?.other.dream_world.front_default} alt={pokemon.name} />
        <h1 className='name-pokemon'>{pokemon.name}</h1>
        <ul className='detail-card'>
          <li>Type: {(pokemon.types)?.map(poke => poke.type.name).join(', ')} </li>
          <li>HP: {pokemon.stats?.[0].base_stat}</li>
          <li>Attack: {pokemon.stats?.[1].base_stat}</li>
          <li>Defense: {pokemon.stats?.[2].base_stat}</li>
          <li>Speed: {pokemon.stats?.[5].base_stat}</li>
        </ul>
      </div>

    </Link>
  );
};

export default PokemonCard;