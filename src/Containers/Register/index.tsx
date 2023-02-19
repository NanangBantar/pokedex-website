import FormRegister from './Components/FormRegister'
import { ContainerAuth, CardAuthContainer } from '../../Components/Container'

const Register = () => {
    return (
        <ContainerAuth>
            <CardAuthContainer title="Register">
                <FormRegister />
            </CardAuthContainer>
        </ContainerAuth>
    )
}

export default Register