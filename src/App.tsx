import React, { useEffect, useState } from 'react';
import { Pokemon, PokemonType, Ability } from './types/types'
import AvailablePokemon from './pokemon/AvailablePokemon';
import Register from './auth/Register'
import { getAuth } from 'firebase/auth';

import './main.css';

function App() {

  const auth = getAuth();
  const [isRegistered, setIsRegistered] = useState<boolean>(false);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [user, setUser] = useState<string>('');
  const [availablePokemons, setAvailablePokemons] = useState<Pokemon[]>([]);

  useEffect(() => {
    //This is where we will fetch the available pokemon 
    const getAvailablePokeData = async () => {
      const apiUrl: string = "https://pokeapi.co/api/v2";
      const limit: number = 20;
      const offset: number = 0;
      const url: string = `${apiUrl}/pokemon?limit=${limit}&offset=${offset}`;

      try {

        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("Network response was not ok")
        }

        const data = await response.json();

        const pokemonList: {
          name: string;
          url: string;
          id: number;
          types: string[]
        }[] = data.results;

        const updatedPokemonList = await Promise.all(
          pokemonList.map(async (pokemon) => {
            const response = await fetch(pokemon.url);
            if (!response.ok) {
              throw new Error(`Error fetching data for ${pokemon.name}`);
            }
            const pokemonData = await response.json();
            const types = pokemonData.types.map(({ type }: PokemonType) => type.name);
            const abilities = pokemonData.abilities.map(({ ability }: Ability) => ability.name);

            const { sprites } = pokemonData;
            const image = sprites.front_shiny;

            return { ...pokemon, types, abilities, image }

          })
        )

        setAvailablePokemons(updatedPokemonList);

      } catch (error) {
        console.error("Error fetching data from the PokeApi:", error);
      }

    }

    getAvailablePokeData();
    // only fetch the data once
  }, [])

  return (
    <div className="App">
      <Register
        auth={auth}
        setIsLoggedIn={setIsLoggedIn}
        setIsRegistered={setIsRegistered}
        setUser={setUser}
      />
      <AvailablePokemon pokemons={availablePokemons} />
    </div>
  );
}

export default App;
