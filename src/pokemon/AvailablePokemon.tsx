import { PokemonProps } from '../types/types.ts'
import PokemonItem from './PokemonItem.tsx'
import './pokemon_container.css'

const AvailablePokemon: React.FC<PokemonProps> = ({
    pokemons
}) => {
    return (
        <div className="outer-container">
            <h1>Available Pokemon</h1>
            <div className="pokemon-container">
                {
                    pokemons.map((pokemon, index) => {
                        return (
                            <PokemonItem pokemon={pokemon} key={index} />
                        )
                    })
                }
            </div>
        </div>
    )
}

export default AvailablePokemon