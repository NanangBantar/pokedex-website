import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    Flex,
    Image,
    Text,
    Badge,
    Tag,
    SimpleGrid
} from '@chakra-ui/react'
import { usePokemon } from '../../../Context/Context'

const ModalMyPokemon = () => {
    const { modalPokemonDetals, openORcloseModalPokemonDetals, pokemonDetails } = usePokemon()

    return (
        <Modal isOpen={modalPokemonDetals!} onClose={() => openORcloseModalPokemonDetals!()}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>{pokemonDetails!?.name?.toUpperCase()}</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Flex justifyContent='center' flexDirection='column'>
                        <Flex >
                            {pokemonDetails!?.types!?.map((element, index) =>
                                <Tag mr='2' colorScheme='blue' key={index + 1}>#{element.type.name}</Tag>
                            )}
                        </Flex>
                        <Image mx='auto' height='150px' width='150px' src={pokemonDetails!?.imge} />
                        <SimpleGrid columns={[2, null, 2]} spacing='15px'>
                            {pokemonDetails!?.stats?.map((element, index) =>
                                <Flex key={index + 1} justifyContent='space-between'>
                                    <Text fontWeight='bold' fontSize='14px'>
                                        {element.stat.name.toUpperCase()}
                                    </Text>
                                    <Text>
                                        <Badge fontSize='16px' colorScheme='green'>{element.base_stat}</Badge>
                                    </Text>
                                </Flex>
                            )}
                        </SimpleGrid>
                    </Flex>
                </ModalBody>
                <ModalFooter py='20px'>
                    <Button onClick={() => {
                        openORcloseModalPokemonDetals!()
                    }}>
                        Close
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}

export default ModalMyPokemon