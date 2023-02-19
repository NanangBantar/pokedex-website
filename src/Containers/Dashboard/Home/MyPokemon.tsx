import { SimpleGrid, Card, CardBody } from '@chakra-ui/react'
import PokemonImage from '../Pokemon/PokemonImage'
import ModalMyPokemon from '../Pokemon/ModalMyPokemon'
import { usePokemon } from '../../../Context/Context'

const MyPokemon = () => {
    const { myPokemon } = usePokemon()

    return (
        <>
            <SimpleGrid columns={[2, null, 3]} spacing='40px'>
                {myPokemon!?.map((element, index) =>
                    <Card key={index + 1} height='fit-content'>
                        <CardBody>
                            <PokemonImage url={'https://pokeapi.co/api/v2/pokemon/' + element} />
                        </CardBody>
                    </Card>
                )}
            </SimpleGrid>
            <ModalMyPokemon />
        </>
    )
}

export default MyPokemon