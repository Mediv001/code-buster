import { memo, useMemo } from "react"
import { Bubble } from "../../components/Bubble/Bubble"
import { LineBar } from "../../components/LineBar/LineBar"
import { useFetch } from "../../hooks/useFetch/useFetch"

const mapper = (({ name, ...other }) => ({ ...other, name: name.toUpperCase() }))

export const PokemonDetailWidget = memo(({ team, selectedPokemon, handlePokemonAdded, handlePokemonRemoved }) => {
    const [{ data }] = useFetch(selectedPokemon.url, {}, mapper)

    const {
        stats = [],
        name = "",
        sprites = {},
        weight,
        height,
        game_indices = [],
        types = [],
        abilities = []
    } = data

    const canRemoved = useMemo(() => {
        return team.length > 0 && team.includes(selectedPokemon.name)
    }, [team, selectedPokemon.name])

    const canAdd = useMemo(() => {
        return team.length < 6 && !team.includes(selectedPokemon.name)
    }, [team, selectedPokemon.name])

    const description = useMemo(() => {
        if (!game_indices.length) return `${name} cannot be found.`
        return `${name} can be found on ${game_indices.length} game${game_indices.length > 1 && "s"} which ${game_indices.length > 1 ? 'are' : 'is'} ${game_indices.map(({ version }) => version.name).join(', ')}.`

    }, [name, game_indices])

    if (!selectedPokemon.url) return "No Pokemon Selected"

    return (
        <div className="flex-vertical-with-gap">

            <Bubble title={name}>
                <div className="flex-vertical-with-gap">

                    <div className="flex-horizontal-with-gap spacing max">
                        <div className="flex-vertical-with-gap flex-center">
                            <div className="flex-center full-width small-font-size justify-text">
                                {description}
                            </div>
                        </div>


                        <div className="flex-center full-width flex-vertical-center">
                            <img alt="" src={sprites.front_default} />
                        </div>

                    </div>

                    <div className="flex-vertical-with-gap full-width">
                        <h3 className="no-margin">General Informations</h3>
                        <div className="flex-vertical-with-gap full-width small-font-size">
                            <span>height : {height} dm</span>
                            <span>weight : {weight} g</span>
                        </div>
                        <div className="flex-vertical-with-gap full-width">
                        </div>
                    </div>

                    <div className="flex-horizontal-with-gap full-height">
                        <div className="flex-vertical-with-gap quarter-width">
                            <h3 className="no-margin">Types</h3>
                            {
                                types.map(({ type }) => <span className="small-font-size">{type.name}</span>)
                            }
                        </div>
                        <div className="flex-vertical-with-gap quarter-width">
                            <h3 className="no-margin">Abilities</h3>
                            {
                                abilities.map(({ ability }) => <span className="small-font-size">{ability.name}</span>)
                            }
                        </div>
                        <div className="flex-vertical-with-gap full-width">
                            <h3 className="no-margin">Stats</h3>
                            {
                                stats.map(({ base_stat, stat }) => {
                                    const { name } = stat
                                    return <LineBar data={base_stat} label={name} />
                                })
                            }
                        </div>
                    </div>

                </div>
            </Bubble>
            <div className="flex-horizontal-with-gap flex-center">
                <button className={`button-base ${canRemoved && 'clickable bg-red font-black'}`} disabled={!canRemoved} onClick={() => handlePokemonRemoved(data)}>Remove {name}</button>
                <button className={`button-base ${canAdd && 'clickable bg-light-blue'}`} disabled={!canAdd} onClick={() => handlePokemonAdded(data)}>Add {name}</button>
            </div>



        </div>
    )
})