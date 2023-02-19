import { Heading, Card, CardBody, Text, Badge } from '@chakra-ui/react'
import { usePokemon } from '../../../Context/Context'

const InfoTop = () => {
    const { pokemon } = usePokemon()

    return (
        <Card>
            <CardBody>
                <Heading mb='4'>Pokemon</Heading>
                <Text mb='2' fontSize='18px'>Pokémon are mysterious creatures filled with many secrets. Some Pokémon live alongside humans and some live in the wild in grassy fields, caves, or the sea, but much about their ecology that remains unknown. One of their main features is that they can be caught using a Poké Ball, which allows them to be carried around.
                </Text>
                <Text mb='2' fontSize='18px'> There is total
                    <Badge fontSize='20px' mx='2' variant='subtle' colorScheme='green'>
                        {pokemon!.count}
                    </Badge>
                    Pokemon that exist in this word.!
                </Text>
            </CardBody>
        </Card>
    )
}

export default InfoTop