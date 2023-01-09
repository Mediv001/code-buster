import { memo, useCallback, useMemo, useState } from "react"
import { ItemPokemon } from "../../components/ItemPokemon/ItemPokemon"
import { Search } from "../../components/Search/Search"
import { useFetch } from "../../hooks/useFetch/useFetch"

const mapper = (arr) => arr.map(({ name, ...other}) => ({...other, name: name.toUpperCase()}))

export const PokedexListWidget = memo(({ handlePokemonSelected, selectedName }) => {
    const [{ data }] = useFetch("https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0", [], mapper)

    const [searchValue, setSearchValue] = useState("")

    const onPokemonSelected = useCallback((e) => handlePokemonSelected(e), [handlePokemonSelected])


    const onPokemonSearch = useCallback(({target}) => {
        const { value } = target
        setSearchValue(value)
    }, [])

    const filteredList = useMemo(() => {
        return data.filter(({ name }) => name.toLowerCase().match(searchValue.toLowerCase()))
    }, [searchValue, data])

    return (
        <div className="flex-vertical">
            <div>
                <Search handleClickSearch={onPokemonSearch} handleSearch={onPokemonSearch} placeholder='Search your pokemon 😏' />
            </div>
            <div className="flex-vertical-with-gap">
                {filteredList.map(({ name, ...props }) => <ItemPokemon key={name} selected={selectedName === name} name={name} onClick={() => onPokemonSelected({ name, ...props })} />)}
            </div>
        </div>
    )
})