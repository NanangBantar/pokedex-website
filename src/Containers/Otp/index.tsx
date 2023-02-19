import { useLocation } from 'react-router-dom'
import FormOtp from './Components/FormOtp'
import { ContainerAuth, CardAuthContainer } from '../../Components/Container'


const Otp = () => {
    const { state: { data: { message } } } = useLocation()
    return (
        <ContainerAuth>
            <CardAuthContainer title='OTP'>
                <FormOtp message={message} />
            </CardAuthContainer>
        </ContainerAuth>
    )
}

export default Otp