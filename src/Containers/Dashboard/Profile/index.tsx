import { DashboardContainer } from '../../../Components/Container'
import ContentContainer from './ContentContainer'
import { PokemonContextProvider } from '../../../Context/Context'

const Profile = () => {
    return (
        <PokemonContextProvider>
            <DashboardContainer>
                <ContentContainer />
            </DashboardContainer>
        </PokemonContextProvider>
    )
}

export default Profile