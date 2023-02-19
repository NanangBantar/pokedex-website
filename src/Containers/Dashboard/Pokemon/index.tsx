import { DashboardContainer } from '../../../Components/Container'
import InfoTop from './InfoTop'
import ContentContainer from './ContentContainer'
import { PokemonContextProvider } from '../../../Context/Context'

const Home = () => {
    return (
        <PokemonContextProvider>
            <DashboardContainer>
                <InfoTop />
                <ContentContainer />
            </DashboardContainer>
        </PokemonContextProvider>
    )
}

export default Home