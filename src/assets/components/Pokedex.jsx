import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import CharacterPokemon from './CharacterPokemon'
import { useNavigate } from 'react-router-dom'
import ChangePagination from './ChangePagination'


const Pokedex = () => {
  const userName = useSelector((state) => state.name)
  const [pokemon, setPokemon] = useState([])
  const [pokemonName, setPokemonName] = useState('')
  const [tiposPokemon, setTiposPokemon] = useState([])

  const navigate = useNavigate()

  useEffect(() => {
    axios
      .get('https://pokeapi.co/api/v2/pokemon/?offset=0&limit=754')
      .then((res) => setPokemon(res.data.results))

    axios
      .get(`https://pokeapi.co/api/v2/type/`)
      .then((res) => setTiposPokemon(res.data.results))
  }, [])

  const changePokemonName = () => {
    navigate(`/pokedex/${pokemonName.toLowerCase()}`)
  }
  const filterType = (e) => {
    axios.get(e.target.value).then((res) => setPokemon(res.data.pokemon))
  }

  // paginacion
  const [page, setPage] = useState(1)

  const pokemonItemPage = 20
  const lastIndex = page * pokemonItemPage
  const firtIndex = lastIndex - pokemonItemPage
  const pokemonPagination = pokemon.slice(firtIndex, lastIndex)
  const totalPage = Math.ceil(pokemon.length / pokemonItemPage)

  const array = []
  for (let i = 1; i <= totalPage; i++) {
    array.push(i)
  }
  console.log(pokemon)
  return (
    <div className='flex flex-col items-center justify-center'>
      <h1 className='text-6xl'>POKEDEX</h1>
      <p className='text-6xl'>Welcome ! {userName}</p>
      <input
        className='h-10 rounded-xl text-center'
        list='pokemon'
        name='pokemon'
        placeholder='search pokemon'
        value={pokemonName}
        onChange={(e) => setPokemonName(e.target.value)}
      />
      <datalist id='pokemon'>
        {pokemon.map((pok) => (
          <option value={pok.name} key={pok.name}></option>
        ))}
      </datalist>
      <button
        className='btn btn-outline dark:text-white '
        onClick={changePokemonName}
      >
        shearch
      </button>
      <select
        className='input input-bordered input-info w-40 max-w-xs dark:text-white "'
        onChange={filterType}
        name=''
        id='select'
      >
        {tiposPokemon.map((tipos) => (
          <option value={tipos.url} key={tipos.name}>
            {tipos.name}
          </option>
        ))}
      </select>
      <div className='btn-group'>
        <ul>
          <button
            onClick={() => setPage(page - 1)}
            disabled={page === 1}
            className='btn btn-outline btn-success'
          >
            prev
          </button>
          {array.map((number) => (

            <button
              className='btn'
              key={number}
              onClick={() => setPage(number)}
            >
              {number}
            </button>
          ))}
          <button
            onClick={() => setPage(page + 1)}
            disabled={page === totalPage}
            className='btn btn-outline btn-success'
          >
            next
          </button>
        </ul>
      </div>

      <div className='botones'>

        <div className="btn-group">
          <button className="btn">1</button>
          <button className="btn">2</button>
          <button className="btn btn-disabled">...</button>
          <button className="btn">99</button>
          <button className="btn">100</button>
        </div>
      </div>


      <section>
        <ul className='text-4xl w-50 h-50 md:grid grid-cols-4 gap-5'>
          {pokemonPagination.map((pokemon) => (
            <CharacterPokemon
              url={pokemon.url ? pokemon.url : pokemon.pokemon.url}
              key={pokemon.url ? pokemon.url : pokemon.pokemon.url}
            />
          ))}
        </ul>
      </section>
      <div className='btn-group'>
        <ul>
          <button
            onClick={() => setPage(page - 1)}
            disabled={page === 1}
            className='btn btn-outline btn-success'
          >
            prev
          </button>
          {array.map((number) => (
            <button
              className='btn'
              key={number}
              onClick={() => setPage(number)}
            >
              {number}
            </button>
          ))}
          <button
            onClick={() => setPage(page + 1)}
            disabled={page === totalPage}
            className='btn btn-outline btn-success'
          >
            next
          </button>
        </ul>
      </div>
    </div>
  )
}

export default Pokedex
