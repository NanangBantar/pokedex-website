import {
    SimpleGrid,
    Card,
    CardBody,
    CloseButton,
} from '@chakra-ui/react'
import { usePokemon } from '../../../Context/Context'
import PokemonImage from './PokemonImage'
import ModalMyPokemon from './ModalMyPokemon'

const MyPokemon = () => {
    const { myPokemon, removeMyPokemonData, modalPokemonDetals, openORcloseModalPokemonDetals, pokemonDetails } = usePokemon()

    return (
        <>
            <SimpleGrid height='62vh' columns={[2, null, 2]} spacing='20px' overflowY='auto'>
                {myPokemon!?.map((element, index) =>
                    <Card key={index + 1} height='fit-content'>
                        <CardBody>
                            <CloseButton onClick={() => removeMyPokemonData!(element)} />
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