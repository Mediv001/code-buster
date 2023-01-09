import { useCallback, useMemo, useState } from 'react';
import './App.css';
import "./bg.css"
import "./size.css"
import "./layout.css"
import { PokedexListWidget } from './widgets/PokedexList/PokedexListWidget';
import { PokemonDetailWidget } from './widgets/PokemonDetail/PokemonDetail';
import { PokemonTeam } from './widgets/PokemonTeam/PokemonTeam';
import pokeballLogo from "./assets/pokeball.png"

function App() {

  const [pokemonSelected, setPokemonSelected] = useState({})
  const [pokemonTeam, setPokemonTeam] = useState([])

  const pokemonSelectedHandler = useCallback(({ url, name, _ID }) => {
    setPokemonSelected({ name, url, _ID })
  }, [])

  const pokemonAddedHandler = useCallback((data) => {
    setPokemonTeam(state => [...state, {...data, url: pokemonSelected.url }])
  }, [pokemonSelected])

  const pokemonRemovedHandler = useCallback(data => {
    setPokemonTeam(state => state.filter(({name}) => name !== data.name))
  }, [])

  const teamName = useMemo(() => {
    return pokemonTeam.map(({ name}) => name)
  }, [pokemonTeam])

  return (
    <div className="page">
      <div className="header spacing-max small-font-size bg-base">
      <img alt='' src={pokeballLogo} /> <h2> MY ASSISTANT POKEDEX </h2> <img width={60} height={60} alt='' src={pokeballLogo} /> 
      </div>

      <div className="content">
        <div className='content-left'>
          <PokedexListWidget selectedName={pokemonSelected.name} handlePokemonSelected={pokemonSelectedHandler} />
        </div>
        <div className='content-main'>
          <PokemonDetailWidget team={teamName} handlePokemonAdded={pokemonAddedHandler} handlePokemonRemoved={pokemonRemovedHandler}  selectedPokemon={pokemonSelected} />
        </div>
        <div className='content-right'>
          <PokemonTeam handlePokemonSelected={pokemonSelectedHandler} team={pokemonTeam} />
        </div>
      </div>

      {/* <div className="footer flex-center bg-red">Welcome to this new platform</div> */}
    </div>
  );
}

export default App;
