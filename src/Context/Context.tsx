import { createContext, useState, useContext, ReactNode, useEffect, FC } from 'react'
import axios from 'axios'
import { pokeapi } from '../Utils/Api'

type Props = {
    children: ReactNode
}

type arrayType = {
    name: string,
    url: string
}

type PokemonDataType = {
    count?: number,
    next?: string,
    previous?: string,
    results?: arrayType[]
}

type PokemonDataDetailsTypes = {
    slot: number,
    type: arrayType
}

type PokemonDataDetailsStats = {
    base_stat: number,
    effort: number,
    stat: arrayType
}

type PokemonDataDetails = {
    name?: string,
    imge?: string,
    types?: PokemonDataDetailsTypes[]
    stats?: PokemonDataDetailsStats[]
}

type PokemonDataContext = {
    pokemon?: PokemonDataType,
    limitData?: number,
    myPokemon?: number[],
    pokemonDetails?: PokemonDataDetails,
    modalPokemonDetals?: boolean,
    modalChangePassword?: boolean,
    setLimit?: (limit: number) => void,
    setFilter?: (filter: string) => void,
    setMyPokemonData?: () => void,
    removeMyPokemonData?: (data: number) => void,
    releaseAllMyPokemonData?: () => void,
    pickPokemon?: (data: PokemonDataDetails) => void,
    openORcloseModalPokemonDetals?: () => void,
    saveMyPokemonData?: () => void,
    openORcloseModalChangePassword?: () => void
}

const PokemonContext = createContext<PokemonDataContext>({})

export const PokemonContextProvider: FC<Props> = (props) => {
    const [data, setData] = useState<PokemonDataType>({})
    const [filteredData, setFilteredData] = useState<PokemonDataType>({})
    const [limitData, setLimitData] = useState<number>(20)
    const [filterData, setFilterData] = useState<string>('')
    const [myPokemon, setMyPokemon] = useState<number[]>(
        localStorage.hasOwnProperty('myPokemon') ? JSON.parse(localStorage.getItem('myPokemon') || '[]') : []
    )
    const [pokemonDetails, setPokemonDetails] = useState<PokemonDataDetails>({})
    const [modalPokemonDetals, setModalPokemonDetals] = useState<boolean>(false)
    const [modalChangePassword, setModalChangePassword] = useState<boolean>(false)

    const getData = () => {
        axios.get(pokeapi + 'pokemon?limit=' + limitData + '&offset=0').then((response) => {
            setData(response.data)
        })
    }

    const setLimit = (limit: number) => {
        setLimitData(prev => prev + limit)
    }

    const setFilter = (filter: string) => {
        setFilterData(filter)
    }

    const setMyPokemonData = () => {
        setMyPokemon(Array.from(new Set([...myPokemon, Math.floor(Math.random() * (data!?.count! - 1 + 1)) + 1])))
    }

    const removeMyPokemonData = (data: number) => {
        setMyPokemon(myPokemon.filter(element => element !== data))
    }

    const releaseAllMyPokemonData = () => {
        setMyPokemon([])
    }

    const pickPokemon = (data: PokemonDataDetails) => {
        setPokemonDetails(data)
    }

    const openORcloseModalPokemonDetals = () => {
        setModalPokemonDetals(!modalPokemonDetals)
    }

    const openORcloseModalChangePassword = () => {
        setModalChangePassword(!modalChangePassword)
    }

    const saveMyPokemonData = () => {
        localStorage.setItem('myPokemon', JSON.stringify(myPokemon))
    }

    const SeachPokemon = () => {
        axios.get('https://pokeapi.co/api/v2/pokemon/' + filterData.toLowerCase() + '/').then(response => {
            setFilteredData({ ...data, results: [{ name: filterData.toLowerCase(), url: 'https://pokeapi.co/api/v2/pokemon/' + response.data.id + '/' }] })
        }).catch(() => {
            setFilteredData({ ...data, results: [] })
        })
    }

    useEffect(() => {
        getData()
    }, [limitData])

    useEffect(() => {
        SeachPokemon()
    }, [filterData])

    return <PokemonContext.Provider value={{
        setFilter,
        setLimit,
        setMyPokemonData,
        removeMyPokemonData,
        releaseAllMyPokemonData,
        pickPokemon,
        openORcloseModalPokemonDetals,
        saveMyPokemonData,
        openORcloseModalChangePassword,
        modalChangePassword,
        pokemonDetails,
        myPokemon,
        modalPokemonDetals,
        pokemon: filterData !== ''
            ?
            filteredData
            :
            data
    }}> {props.children}</PokemonContext.Provider >
}

export const usePokemon = () => useContext(PokemonContext);
