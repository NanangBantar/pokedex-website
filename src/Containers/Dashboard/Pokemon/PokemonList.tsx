import { useRef, useEffect } from 'react'
import {
    FormControl,
    FormLabel,
    FormHelperText,
    Input,
    SimpleGrid,
    Text,
    Flex,
    Divider,
    Card,
    CardBody,
    InputGroup,
    InputRightElement,
    Button
} from '@chakra-ui/react'
import { usePokemon } from '../../../Context/Context'
import PokemonImage from './PokemonImage'

const PokemonList = () => {
    const scrollRef = useRef<HTMLDivElement>(null)
    const inputRef = useRef<HTMLInputElement>(null)
    const { pokemon, setLimit, setFilter } = usePokemon()

    useEffect(() => {
        const handleScroll = () => {
            if (scrollRef.current!.scrollHeight - scrollRef.current!.clientHeight === scrollRef.current!.scrollTop) {
                setLimit!(20)
            }
        }

        scrollRef.current!.addEventListener('scroll', handleScroll)

        return () => scrollRef.current!?.removeEventListener('scroll', handleScroll)
    }, [])

    return (
        <Flex flexDirection='column'>
            <FormControl>
                <FormLabel>Search pokemon</FormLabel>
                <InputGroup size='md'>
                    <Input
                        pr='4.5rem'
                        type='text'
                        placeholder='Enter keyword'
                        ref={inputRef}
                        onChange={(e) => {
                            e.target.value === '' && setFilter!('')
                        }}
                    />
                    <InputRightElement width='6rem'>
                        <Button h='1.75rem' size='sm' onClick={() => {
                            setFilter!(inputRef!?.current!?.value)
                        }}>
                            Click Here
                        </Button>
                    </InputRightElement>
                </InputGroup>
                <FormHelperText>Using keyword to find a pokemon.!</FormHelperText>
            </FormControl>
            <Divider my='20px' />
            <SimpleGrid ref={scrollRef} height='50vh' columns={[2, null, 3]} spacing='40px' overflowY='auto'>
                {pokemon!.results!?.map((element, index) =>
                    <Card key={index + 1} height='fit-content'>
                        <CardBody>
                            <PokemonImage url={element.url} />
                        </CardBody>
                    </Card>
                )}
            </SimpleGrid>
        </Flex>
    )
}

export default PokemonList