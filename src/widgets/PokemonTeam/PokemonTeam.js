import { useCallback, useMemo } from "react"
import { LineBar } from "../../components/LineBar/LineBar"
import { useFetch } from "../../hooks/useFetch/useFetch"
import { averageValue, medianValue } from "../../utils/maths"

export const PokemonTeam = ({ team = [], handlePokemonSelected }) => {

    const [{ data: dataStat }] = useFetch("https://pokeapi.co/api/v2/stat", [])
    const [{ data: dataType }] = useFetch("https://pokeapi.co/api/v2/type", [])

    const onImgPokemonClickHandler = useCallback(({name, url}) => {
        handlePokemonSelected({ name, url })
    }, [handlePokemonSelected])

    const subData = useMemo(() => {
        return team.map(({ name, sprites, types, stats, url }) => {
            return {
                name,
                url,
                sprite: sprites.front_default,
                types: types.map(({ type }) => type.name),
                stats: stats.map(({ base_stat, stat }) => ({ name: stat.name, value: base_stat }))
            }
        })
    }, [team])

    const filled = useMemo(() => {
        return [...subData, ...new Array(6 - subData.length).fill({})]
            .map(({ name, ...other }) => ({...other, name: name ? name : crypto.randomUUID()}))
    }, [subData])

    const countType = useMemo(() => {
        const base = dataType.map((data, index) => {
            const { name } = data

            const count = subData.filter(({ types }) => types.includes(name)).length

            return {
                name,
                value: count
            }
        })

        return base.filter(({ value }) => value > 0)

    }, [subData, dataType])

    const averageStats = useMemo(() => {
        return dataStat.map((data, index) => {
            const { name } = data

            const stats = subData
                .map(({ stats }) => stats)
                .reduce((accu, current) => {
                    const statsFiltered = current.filter(s => s.name === name)
                    const statValue = statsFiltered.length ? statsFiltered[0].value : 0
                    return { ...accu, [name]: [...(accu[name] || []), statValue] }
                }, {})
            return {
                name,
                value: averageValue(stats[name])
            }
        })
    }, [dataStat, subData])

    const medianStats = useMemo(() => {
        return dataStat.map((data, index) => {
            const { name } = data

            const stats = subData
                .map(({ stats }) => stats)
                .reduce((accu, current) => {
                    const statsFiltered = current.filter(s => s.name === name)
                    const statValue = statsFiltered.length ? statsFiltered[0].value : 0
                    return { ...accu, [name]: [...(accu[name] || []), statValue] }
                }, {})
            return {
                name,
                value: medianValue(stats[name])
            }
        })
    }, [subData, dataStat])

    return (
        <div className="flex-vertical-with-gap min-width-team">
            <div className="flex-center full-height">
                <h2>My Team</h2>
            </div>

            <div className="flex-horizontal-with-gap spacing-around">

                {filled.slice(0, 3).map(({ sprite, name, url }) => <div key={name} className="border flex-center circle size-sprite bg-white">
                    {sprite && <img className="clickable" alt="" onClick={() => onImgPokemonClickHandler({url, name})} width={96} height={96} src={sprite} />}
                </div>)}

            </div>

            <div className="flex-horizontal-with-gap spacing-around">
                {filled.slice(3, 6).map(({ sprite, name, url }) => <div key={name} className="border flex-center circle size-sprite bg-white">
                    {sprite && <img className="clickable" onClick={() => onImgPokemonClickHandler({url, name})} alt="" width={96} height={96} src={sprite} />}
                </div>)}

            </div>

            <div className="flex-vertical-with-gap spacing-max">
                <div className="flex-vertical">
                    <h3>General Stats</h3>
                    {
                        countType.map(({ name, value }) => {
                            return <span key={name}>{value} {value > 1 ? "pokemons" : "pokemon"} of type {name}</span>
                        })
                    }
                </div>
                <div className="flex-horizontal-with-gap gap-base-x2 spacing-max">

                    <div className="flex-vertical-with-gap full-width">
                        <h3>Median Stats</h3>
                        {
                            medianStats.map(({ name, value }) => {
                                return <LineBar key={`med_${name}`} data={value} label={name} />
                            })
                        }
                    </div>
                    <div className="flex-vertical-with-gap full-width">
                        <h3>Average Stats</h3>
                        {
                            averageStats.map(({ name, value }) => {
                                return <LineBar key={`avg_${name}`} data={value} label={name} />
                            })
                        }
                    </div>
                </div>
            </div>

        </div>
    )
}