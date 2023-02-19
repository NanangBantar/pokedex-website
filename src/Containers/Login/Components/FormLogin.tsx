import { useState } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import {
    FormControl,
    FormLabel,
    FormHelperText,
    Input,
    Divider,
    Button,
    VStack,
    InputGroup,
    InputRightElement,
    useToast
} from '@chakra-ui/react'
import styled from '@emotion/styled'
import { userapi } from '../../../Utils/Api'

type Inputs = {
    usernameORemail: string,
    password: string,
}

const FormHelperTextStyled = styled(FormHelperText)`
    text-align: right;
    cursor: pointer;
    color: blue;
    font-weight: bold;
`;

const FormLogin = () => {
    const navigate = useNavigate()
    const toast = useToast()
    const { register, handleSubmit } = useForm<Inputs>()
    const [show, setShow] = useState<boolean>(false)
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const handleClick = () => setShow(!show)
    const onSubmit: SubmitHandler<Inputs> = async data => {
        setIsLoading(true)
        axios.post(userapi + 'api/user', data).then((response) => {
            setIsLoading(false)
            localStorage.setItem('token', response.data.data.token)
            navigate('/dashboard')
        }
        ).catch((error) => {
            setIsLoading(false)
            if (!error.response.data.data) {
                return toast({
                    title: error.response.data.type.toUpperCase(),
                    description: error.response.data.message,
                    status: 'error',
                    duration: 5000,
                    isClosable: true,
                    position: 'top-left'
                })
            }
            navigate('/otp/' + error.response.data.data.fullHash, { state: { data: error.response.data } });
        }
        )
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <VStack spacing='4'>
                <FormControl>
                    <FormLabel>Email address</FormLabel>
                    <Input {...register('usernameORemail', { required: true, minLength: 8, maxLength: 32 })}
                        type='email'
                        placeholder='Enter email'
                    />
                    <FormHelperText>We'll never share your email.</FormHelperText>
                </FormControl>
                <FormControl>
                    <FormLabel>Password</FormLabel>
                    <InputGroup size='md'>
                        <Input
                            {...register('password', { required: true, minLength: 8, maxLength: 16 })}
                            pr='4.5rem'
                            type={show ? 'text' : 'password'}
                            placeholder='Enter password'
                        />
                        <InputRightElement width='4.5rem'>
                            <Button h='1.75rem' size='sm' onClick={handleClick}>
                                {show ? 'Hide' : 'Show'}
                            </Button>
                        </InputRightElement>
                    </InputGroup>
                    <FormHelperTextStyled onClick={() => navigate('/forgot-password')}>Forgot password.!</FormHelperTextStyled>
                </FormControl>
            </VStack>
            <Button type='submit' w='100%' my='20px' colorScheme='blue' isLoading={isLoading}>Submit</Button>
            <Divider mb='4' />
            <Button onClick={() => navigate('/register')} w='100%' mb='10px' colorScheme='blue' variant='outline'>Register</Button>
        </form>
    )
}

export default FormLogin