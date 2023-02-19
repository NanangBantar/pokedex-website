import { FC, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useForm, SubmitHandler } from 'react-hook-form'
import axios from 'axios'
import {
    FormControl,
    FormLabel,
    FormHelperText,
    Divider,
    Button,
    VStack,
    HStack,
    Alert,
    AlertIcon,
    PinInput,
    PinInputField,
    useToast
} from '@chakra-ui/react'
import styled from '@emotion/styled'
import { userapi } from '../../../Utils/Api'

type Props = {
    message: string,
}

type Inputs = {
    otp1: string,
    otp2: string,
    otp3: string,
    otp4: string,
    otp5: string,
    otp6: string,
}

type Payload = {
    otp: string,
    email: string
}

const FormHelperTextStyled = styled(FormHelperText)`
    text-align: right;
    cursor: pointer;
    color: blue;
    font-weight: bold;
`;

const FormOtp: FC<Props> = (props) => {
    const toast = useToast()
    const { fullHash } = useParams<string>();
    const { register, handleSubmit } = useForm<Inputs>()
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const getEmailFromMessage: string = props.message.split(':')[1].replace(/\s/g, '')

    const resendOtp = async (email: string) => {
        setIsLoading(true)
        axios.post(userapi + 'api/user/otp/resend', {
            usernameORemail: email
        }).then((response) => {
            setIsLoading(false)
            navigate('/otp/' + response.data.data.fullHash, { state: { data: response.data } });
        }).catch(error => {
            setIsLoading(false)
        })
    }

    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        setIsLoading(true)
        const uData = Object.entries(data).map(element => (element[1])).join("")
        const fData: Payload = {
            otp: uData,
            email: getEmailFromMessage
        }
        axios.post(userapi + 'api/user/otp/verify-otp/' + fullHash, fData).then(response => {
            setIsLoading(false)
            toast({
                title: response.data.type.toUpperCase(),
                description: response.data.message,
                status: 'success',
                duration: 5000,
                isClosable: true,
                position: 'top-left',
                onCloseComplete() {
                    navigate('/')
                },
            })
        }).catch(error => {
            setIsLoading(false)
            toast({
                title: error.response.data.type.toUpperCase(),
                description: error.response.data.message,
                status: 'error',
                duration: 5000,
                isClosable: true,
                position: 'top-left'
            })
        })

    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Alert mb='3' status='info'>
                <AlertIcon />
                {props.message}
            </Alert>
            <VStack spacing='4'>
                <FormControl>
                    <FormLabel>OTP Code</FormLabel>
                    <HStack>
                        <PinInput type='alphanumeric'>
                            <PinInputField w='100%' {...register('otp1', { required: true, minLength: 1, maxLength: 1 })} />
                            <PinInputField w='100%' {...register('otp2', { required: true, minLength: 1, maxLength: 1 })} />
                            <PinInputField w='100%' {...register('otp3', { required: true, minLength: 1, maxLength: 1 })} />
                            <PinInputField w='100%' {...register('otp4', { required: true, minLength: 1, maxLength: 1 })} />
                            <PinInputField w='100%' {...register('otp5', { required: true, minLength: 1, maxLength: 1 })} />
                            <PinInputField w='100%' {...register('otp6', { required: true, minLength: 1, maxLength: 1 })} />
                        </PinInput>
                    </HStack>
                    <FormHelperTextStyled>
                        <Button
                            onClick={() => resendOtp(getEmailFromMessage)}
                            colorScheme='blue'
                            size='xs'
                            variant='outline'
                            fontWeight='bold'
                            fontSize='14px'
                            borderColor='transparent'
                            isLoading={isLoading}
                        >
                            Resend OTP.!
                        </Button>
                    </FormHelperTextStyled>
                </FormControl>
            </VStack>
            <Button type='submit' w='100%' my='20px' colorScheme='blue' isLoading={isLoading}>Submit</Button>
            <Divider mb='4' />
            <Button onClick={() => navigate('/')} w='100%' mb='10px' colorScheme='blue' variant='outline'>Login</Button>
        </form>
    )
}

export default FormOtp