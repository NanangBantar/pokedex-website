import { useEffect, useState } from 'react'
import { Flex, Card, CardBody, CardHeader, Heading, Image, SimpleGrid } from '@chakra-ui/react'
import axios from 'axios'
import { pokeapi } from '../../../Utils/Api'
import Region from './Region'

import KantoMap from '../../../Assets/Image/kanto.png'
import JohtoMap from '../../../Assets/Image/johto.png'
import HoennMap from '../../../Assets/Image/hoenn.png'
import SinnohMap from '../../../Assets/Image/sinnoh.png'
import UnovaMap from '../../../Assets/Image/unova.png'
import KalosMap from '../../../Assets/Image/kalos.png'
import AlolaMap from '../../../Assets/Image/alola.png'
import GalarMap from '../../../Assets/Image/galar.png'
import PaldeaMap from '../../../Assets/Image/paldea.png'


type dataType = {
    name: string,
    url: string
}

const Generation = () => {
    const [data, setData] = useState<dataType[]>([])

    const getData = () => {
        axios.get(pokeapi + 'generation').then(response => {
            setData(response.data.results)
        })
    }

    const renderImage = (region: string) => {
        switch (true) {
            case region === 'generation-i':
                return KantoMap
            case region === 'generation-ii':
                return JohtoMap
            case region === 'generation-iii':
                return HoennMap
            case region === 'generation-iv':
                return SinnohMap
            case region === 'generation-v':
                return UnovaMap
            case region === 'generation-vi':
                return KalosMap
            case region === 'generation-vii':
                return AlolaMap
            case region === 'generation-viii':
                return GalarMap
            default:
                return PaldeaMap
        }
    }

    useEffect(() => {
        getData()
    }, [])

    return (
        <SimpleGrid my='40px' w='100%' columns={3} spacing={10}>
            {
                data.map((element, index) =>
                    <Card
                        _hover={{
                            borderColor: 'green.500',
                            '& .chakra-heading': {
                                color: 'green.500'
                            }
                        }}
                        cursor='pointer'
                        border='4px'
                        borderColor='blue.500'
                        borderRight='none'
                        borderTop='none'
                        borderBottom='none'
                        key={index + 1} >
                        <CardHeader pb='0px'>
                            <Heading textAlign='center' fontSize='3xl'>{element.name.split('-').join(' ').toUpperCase()}</Heading>
                        </CardHeader>
                        <CardBody>
                            <Flex justify='center' flexDirection='column'>
                                <Image h='100px' w='50%' mx='auto' src={renderImage(element.name)} />
                                <Region url={element.url} />
                            </Flex>
                        </CardBody>
                    </Card>
                )
            }
        </SimpleGrid  >
    )
}

export default Generation