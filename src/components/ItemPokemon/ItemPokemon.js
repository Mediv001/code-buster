import "./itemPokemon.css"
import pokemonLogo from "../../assets/pokeball.png"

export const ItemPokemon = ({ onClick, name, selected }) => {
    return (
        <div className="container-flex min-width-at-icon-size">
            <button className={`clickable padding-vertical item-pokemon-container container-flex full-width ${selected ? "button-selected" : "bg-light"}`} onClick={onClick}>
                <img
                    width={32}
                    height={32}
                    alt=""
                    src={pokemonLogo}
                />
                <div className="center-all">{name}</div>
            </button>
        </div>
    )
}