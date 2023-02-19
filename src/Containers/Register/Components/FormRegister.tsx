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
import { userapi } from '../../../Utils/Api'

type Inputs = {
    email: string,
    username: string,
    password: string,
}

const FormRegister = () => {
    const navigate = useNavigate()
    const toast = useToast()
    const [show, setShow] = useState<boolean>(false)
    const { register, handleSubmit } = useForm<Inputs>()
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const handleClick = () => setShow(!show)
    const onSubmit: SubmitHandler<Inputs> = async data => {
        setIsLoading(true)
        axios.post(userapi + 'api/user/register', data).then((response) => {
            navigate('/otp/' + response.data.data.fullHash, { state: { data: response.data } });
        }
        ).catch((error) => {
            setIsLoading(false)
            toast({
                title: error.response.data.type.toUpperCase(),
                description: error.response.data.message,
                status: 'error',
                duration: 5000,
                isClosable: true,
                position: 'top-left'
            })
        }
        )
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <VStack spacing='4'>
                <FormControl>
                    <FormLabel>Email address</FormLabel>
                    <Input {...register('email', { required: true, minLength: 8, maxLength: 32 })}
                        type='email'
                        placeholder='Enter email'
                    />
                    <FormHelperText>We'll never share your email.</FormHelperText>
                </FormControl>
                <FormControl>
                    <FormLabel>Username</FormLabel>
                    <Input {...register('username', { required: true, minLength: 8, maxLength: 16 })}
                        type='text'
                        placeholder='Enter username'
                    />
                </FormControl>
                <FormControl>
                    <FormLabel>Password</FormLabel>
                    <InputGroup size='md'>
                        <Input {...register('password', { required: true, minLength: 8, maxLength: 16 })}
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
                </FormControl>
            </VStack>
            <Button type='submit' w='100%' my='20px' colorScheme='blue' isLoading={isLoading}>Submit</Button>
            <Divider mb='4' />
            <Button onClick={() => navigate('/')} w='100%' mb='10px' colorScheme='blue' variant='outline'>Login</Button>
        </form>
    )
}

export default FormRegister