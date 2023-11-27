import { PokemonItemProps } from '../types/types'
import './pokeItem.css'

const PokemonItem: React.FC<PokemonItemProps> = ({
    pokemon
}) => {
    const { image, name, types, abilities, user: userEmail } = pokemon;
    console.log('userEmail', userEmail);
    return (
        <div className="pokemon-card">
            <div className="pokemon-details">
                <img src={image} alt={name} className='pokemon-image' />
                <h3>{name}</h3>
                <p>
                    <span>Types:</span>{types.join(", ")}
                </p>
                <p>
                    <span>Abilities:</span>{abilities.join(", ")}
                </p>
            </div>
        </div>
    )
}

export default PokemonItem;