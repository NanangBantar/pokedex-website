import { useNavigate } from 'react-router-dom'
import { Flex, Divider, Button } from '@chakra-ui/react'
import { DashboardContainer } from '../../../Components/Container'
import CarouselComponent from './CarouselComponent'
import CardInfo from './CardInfo'
import Generation from './Generation'
import MyPokemon from './MyPokemon'
import { PokemonContextProvider } from '../../../Context/Context'

const Home = () => {
    const navigate = useNavigate()

    return (
        <PokemonContextProvider>
            <DashboardContainer>
                <CarouselComponent />
                <Button onClick={() => navigate('/pokemon')} colorScheme='blue' variant='outline' my='4' fontWeight='bold'>Click here to pokemon page</Button>
                <MyPokemon />
                <Divider mt='20px' mb='30px' />
                <Flex gap='20px'>
                    <CardInfo />
                </Flex>
                <Divider mt='40px' />
                <Generation />
            </DashboardContainer>
        </PokemonContextProvider>
    )
}

export default Home