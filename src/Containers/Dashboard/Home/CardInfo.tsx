import { useState, useEffect, FC } from 'react'
import axios from 'axios'
import { Card, CardBody, Text, CardHeader, Heading } from '@chakra-ui/react'
import { pokeapi } from '../../../Utils/Api'

type Data = {
    pokemon: number,
    types: number,
    ability: number,
    berry: number,
}

type Props = {
    data: number,
    title: string,
    description: string
}

const CardContainer: FC<Props> = (props) => {
    return (
        <Card
            _hover={{
                borderColor: 'blue.500',
                '& .chakra-heading': {
                    color: 'blue.500'
                }
            }}
            cursor='pointer'
            w='30%'
            border='4px'
            borderColor='green.500'
            borderRight='none'
            borderTop='none'
            borderBottom='none'>
            <CardHeader>
                <Heading size='md' color='green.500' > {props.title} ({props.data})</Heading>
            </CardHeader>
            <CardBody>
                <Text>{props.description}</Text>
            </CardBody>
        </Card >
    )
}

const CardInfo = () => {
    const [data, setData] = useState<Data>({
        pokemon: 0,
        types: 0,
        ability: 0,
        berry: 0,
    });

    const getPokemon = async () => {
        const pokemon = await axios.get(pokeapi + 'pokemon?limit=100000&offset=0')
        const types = await axios.get(pokeapi + 'type')
        const ability = await axios.get(pokeapi + 'ability')
        const berry = await axios.get(pokeapi + 'berry')

        setData({
            pokemon: pokemon.data.count,
            types: types.data.count,
            ability: ability.data.count,
            berry: berry.data.count,
        });
    }

    useEffect(() => {
        getPokemon()
    }, [])

    return (
        <>
            <CardContainer data={data.pokemon} title='Total Pokemon' description='Pokémon are mysterious creatures filled with many secrets.' />
            <CardContainer data={data.berry} title='Total Berries' description='Berries are small fruits that can provide HP and status condition restoration.' />
            <CardContainer data={data.types} title='Total Type Pokemon' description='Types are properties for Pokémon and their moves.' />
            <CardContainer data={data.ability} title='Total Abilities' description='Abilities provide passive effects for Pokémon in battle or in the overworld.' />
        </>
    )
}

export default CardInfo