
import { useState } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import axios from "axios"
import {
    FormControl,
    FormLabel,
    FormHelperText,
    Input,
    Divider,
    Button,
    VStack,
    useToast
} from '@chakra-ui/react'
import { userapi } from '../../../Utils/Api'

type Inputs = {
    email: string
}

const FormForgotPassword = () => {
    const navigate = useNavigate()
    const toast = useToast()
    const { register, handleSubmit } = useForm<Inputs>()
    const [isLoading, setIsLoading] = useState<boolean>(false)


    const onSubmit: SubmitHandler<Inputs> = async data => {
        setIsLoading(true)
        axios.post(userapi + 'api/user/password/forgot', data).then((response) => {
            setIsLoading(false)
            toast({
                title: response.data.type.toUpperCase(),
                description: response.data.message,
                status: 'success',
                duration: 5000,
                isClosable: true,
                position: 'top-left'
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
            <VStack spacing='4'>
                <FormControl>
                    <FormLabel>Email address</FormLabel>
                    <Input {...register('email', { required: true, minLength: 8, maxLength: 32 })}
                        type='email'
                        placeholder='Enter email'
                    />
                    <FormHelperText>We'll never share your email.</FormHelperText>
                </FormControl>
            </VStack>
            <Button type='submit' w='100%' my='20px' colorScheme='blue' isLoading={isLoading}>Submit</Button>
            <Divider mb='4' />
            <Button onClick={() => navigate('/')} w='100%' mb='10px' colorScheme='blue' variant='outline'>Login</Button>
        </form>
    )
}

export default FormForgotPassword