import { Card, CardBody, Flex, Box, Button } from '@chakra-ui/react'
import PokemonList from './PokemonList'
import { usePokemon } from '../../../Context/Context'
import MyPokemon from './MyPokemon'

const ContentContainer = () => {
    const { setMyPokemonData, releaseAllMyPokemonData, saveMyPokemonData, myPokemon } = usePokemon()

    return (
        <Card my='30px'>
            <CardBody>
                <Flex>
                    <Box w='40%' px='10px'>
                        <Card p='10px' shadow='lg'>
                            <Button mb='2' onClick={setMyPokemonData}>Get My Pokemon</Button>
                            <Flex gap='2'>
                                {myPokemon!.length !== 0 &&
                                    <Button width='100%' onClick={releaseAllMyPokemonData}>Release All My Pokemon</Button>
                                }
                                <Button width='100%' onClick={saveMyPokemonData}>Save My Current Pokemon</Button>
                            </Flex>
                            <CardBody>
                                <MyPokemon />
                            </CardBody>
                        </Card>
                    </Box>
                    <Box w='60%'>
                        <Card shadow='lg'>
                            <CardBody>
                                <PokemonList />
                            </CardBody>
                        </Card>
                    </Box>
                </Flex>
            </CardBody>
        </Card >
    )
}

export default ContentContainer