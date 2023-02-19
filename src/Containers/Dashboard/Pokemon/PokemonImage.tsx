import { FC, useState, useEffect } from 'react'
import { Image, Spinner, Flex, Text, Button } from '@chakra-ui/react'
import axios from 'axios'
import { usePokemon } from '../../../Context/Context'

type Props = {
    url: string
}

type arrayType = {
    name: string,
    url: string
}

type typesPokemon = {
    slot: number,
    type: arrayType
}

type statsPokemon = {
    base_stat: number,
    effort: number,
    stat: arrayType
}

const ImageComponent: FC<Props> = (props) => {
    return (
        <Image fallback={<Flex justifyContent='center' alignItems='center' mb='4'><Spinner size='xl' /></Flex>} mx='auto' src={props.url} />
    )
}

const PokemonImage: FC<Props> = (props) => {
    const { removeMyPokemonData, pickPokemon, openORcloseModalPokemonDetals } = usePokemon()
    const [image, setImage] = useState<string>('')
    const [name, setName] = useState<string>('')
    const [typesPokemon, setTypesPokemon] = useState<typesPokemon[]>([])
    const [statsPokemon, setStatsPokemon] = useState<statsPokemon[]>([])

    const getData = () => {
        axios.get(props.url).then(response => {
            setName(response.data.name)
            setImage(response.data.sprites.front_default)
            setTypesPokemon(response.data.types)
            setStatsPokemon(response.data.stats)
        }).catch(() => {
            removeMyPokemonData!(parseInt(props.url.split('/').slice(-1)[0]))
        })
    }

    useEffect(() => {
        getData()
    }, [props.url])


    return (
        <Flex flexDirection='column'>
            <ImageComponent url={image} />
            <Text textAlign='center' fontWeight='bold'>
                {name.toUpperCase()}
            </Text>
            <Button my='1' onClick={() => {
                pickPokemon!({
                    name: name, imge: image, types: typesPokemon, stats: statsPokemon
                })
                openORcloseModalPokemonDetals!()
            }}>Details</Button>
        </Flex>
    )
}

export default PokemonImage