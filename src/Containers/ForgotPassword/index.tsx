import { ContainerAuth, CardAuthContainer } from '../../Components/Container'
import FormForgotPassword from './Components/FormForgotPassword'

const ForgotPassword = () => {
    return (
        <ContainerAuth>
            <CardAuthContainer title="Forgot Password">
                <FormForgotPassword />
            </CardAuthContainer>
        </ContainerAuth>
    )
}

export default ForgotPassword