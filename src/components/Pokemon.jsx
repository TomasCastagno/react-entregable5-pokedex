import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const Pokemon = () => {

  const { id } = useParams();

  const [pokemon, setPokemon] = useState({});

  useEffect(() => {
    axios
      .get(`https://pokeapi.co/api/v2/pokemon/${id}/`)
      .then(res => setPokemon(res.data))

  }, [id]);

  const navigate = useNavigate();

  return (
    <>
      <section className='pokemon-detail'>
        <button onClick={() => navigate(-1)}>Atrás</button>
        <article>
          <img src={pokemon.sprites?.other.dream_world.front_default} alt={pokemon.name} />
          <h1 className='name-pokemon'>{pokemon.name}</h1>
          <div className='weight-height'>
            <h2>{pokemon.weight} <br />
              Weight </h2>
            <h2>{pokemon.height} <br />
              Height </h2>
          </div>
          <hr />
          <h3> # {pokemon.id}</h3>

          <div>
            <div className='types_pokemon-detail'>
              <h1 className='title-type'>Type</h1>
              <div className='type-items_pokemon-detail'>

                {(pokemon.types)?.map(poke => (
                  <h2 key={poke.type.name}>
                    {poke.type.name}
                  </h2>))}

              </div>
            </div>
            <div className='types_pokemon-detail'>
              <h1 className='title-type'>Abilities</h1>
              <div className='type-items_pokemon-detail'>

                {(pokemon.abilities)?.map(poke => (

                  <h2 key={poke.ability.name}>
                    {poke.ability.name}
                  </h2>))}

              </div>
            </div>
          </div>

          <section className='base-stats-detail'>
            <h2>Base Stats</h2>
            <div>HP <div className='progress-bar' style={{ width: `${(pokemon.stats?.[0].base_stat) / 150 * 800}px` }}> {pokemon.stats?.[0].base_stat} / 150 </div> </div>
            <div>Attack <div className='progress-bar' style={{ width: `${(pokemon.stats?.[1].base_stat) / 150 * 800}px` }} > {pokemon.stats?.[1].base_stat} / 150 </div> </div>
            <div>Defense <div className='progress-bar' style={{ width: `${(pokemon.stats?.[2].base_stat) / 150 * 800}px` }}>{pokemon.stats?.[2].base_stat} / 150 </div> </div>
            <div>Speed <div className='progress-bar' style={{ width: `${(pokemon.stats?.[5].base_stat) / 150 * 800}px` }}> {pokemon.stats?.[5].base_stat} / 150 </div> </div>
          </section>

        </article>

        <aside>
          <h1>Movements</h1>
          <div className='aside-movements'>
            {(pokemon.moves)?.map(moves => (
              <ul key={moves.move.name}>
                <li>{moves.move.name}</li>
              </ul>)
            )}
          </div>

        </aside>

      </section>


    </>
  );
};

export default Pokemon;