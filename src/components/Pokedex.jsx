import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import PokemonCard from './PokemonCard';
import SelectedPokemon from './SelectedPokemon';
import PokemonCardTypes from './PokemonCardTypes';


const Pokedex = () => {

  const userName = useSelector(state => state.name);

  const [listUrlPoke, setListUrlPoke] = useState([]);

  const [listUrlTypes, setListUrlTypes] = useState([]);

  const [typeSelected, setTypeSelected] = useState(false);


  useEffect(() => {

    axios
      .get('https://pokeapi.co/api/v2/type/')
      .then(res => setListUrlTypes(res.data.results))



  }, [typeSelected]);


  useEffect(() => {


    axios
      .get('https://pokeapi.co/api/v2/pokemon?limit=1156&offset=0')
      .then(res => setListUrlPoke(res.data.results))


  }, []);


  //PAGINACIÓN

  const [currentPage, setCurrentPage] = useState(1);
  const pokemonsPerPage = 15;
  const lastIndex = pokemonsPerPage * currentPage;
  const firstIndex = lastIndex - pokemonsPerPage;
  const pokemonPaginated = listUrlPoke.slice(firstIndex, lastIndex);
  const totalPokemons = listUrlPoke.length;
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


  //CAJA DE BÚSQUEDA


  const [boxSearch, setBoxSearch] = useState(false);


  const [inputSearch, setInputSearch] = useState("");



  //FILTRO BÚSQUEDA



  const [pokemonSelected, setPokemonSelected] = useState("");

  const [typeName, setTypeName] = useState("");

  const [disabledPaginated, setDisablePaginated] = useState(false)

  const filterSelected = (name) => {
    if (typeSelected) {
      setTypeName(name);
    } else {
      setPokemonSelected(name)
      setDisablePaginated(true);
    }

    setBoxSearch(false);
    setInputSearch(name);
  };




  return (
    <div className='pokedex'>

      <h1>Pokedex</h1>

      <h2>Welcome {userName}, here you cand find your favorite pokemon</h2>

      <div className='buttons_filter-search'>


        <button onClick={() => {
          setTypeSelected(false);
          setInputSearch("");
          setPokemonSelected("");
          setDisablePaginated(false);
        }}>
          Pokemons
        </button>


        <button onClick={() => { setTypeSelected(true); setBoxSearch(false); setPokemonSelected("") }}>
          Types
        </button>

      </div>

      <div className='search'>

        {typeSelected ?

          (<select name="type-selected" id="search-input">
            <option disabled selected value="default">select a type of pokemon</option>
            <option value="AllPokemons"
              onClick={() => {
                setTypeSelected(false);
                setInputSearch("");
                setPokemonSelected("");
                setDisablePaginated(false);
              }}>
              All Pokemons
            </option>

            {listUrlTypes.map(type => (
              <option
                value={type.name}
                key={type.name}
                onClick={() => filterSelected(type.name)}>
                {type.name}
              </option>
            ))}

          </select>
          ) : (
            <div className='form-input'>
              <input
                type="text"
                name="search"
                id="search-input"
                value={inputSearch}
                placeholder='search here pokemon'
                onClick={() => setBoxSearch(!boxSearch)}
                onChange={(e) => {
                  setInputSearch(e.target.value);
                  (
                    (e.target.value) ?
                      (setBoxSearch(true))
                      :
                      (setBoxSearch(false),
                        setPokemonSelected(''),
                        setDisablePaginated(false))
                  )
                }}
              />
              <button
                onClick={() => {
                  setPokemonSelected(inputSearch);
                  setBoxSearch(false)
                }}
                className="material-symbols-outlined"
                >
                search
              </button>
            </div>
          )
        }
      </div>


      {boxSearch &&
        <div className='box-search'>

          {listUrlPoke.map(poke => (
            <div key={poke.name}>

              {poke.name.includes(inputSearch) &&
                <button className='results-button'
                  onClick={() => filterSelected(poke.name)}>
                  {poke.name}
                </button>}
            </div>
          ))}
        </div>

      }

      <section className='list_pokedex'>

        {pokemonSelected ?
          (<SelectedPokemon
            pokemonSelected={pokemonSelected}
            setPokemonSelected={setPokemonSelected}
          />)
          :

          typeSelected ?
            (<PokemonCardTypes typeName={typeName} setPokemonSelected={setPokemonSelected} />)
            :
            (pokemonPaginated.map(poke => (
              <div key={poke.url}>
                <PokemonCard poke={poke} />
              </div>))
            )
        }

        {((disabledPaginated === false)) &&
          (<div className='paginated'>
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

          </div>)}


      </section>


    </div>
  );
};

export default Pokedex;