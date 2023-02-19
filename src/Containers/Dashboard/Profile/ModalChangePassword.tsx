import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    FormControl,
    Input,
    FormLabel,
    Flex,
    useToast
} from '@chakra-ui/react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { usePokemon } from '../../../Context/Context'
import axios from 'axios'
import { userapi } from '../../../Utils/Api'

type Inputs = {
    password: string,
    confirmPassword: string
}

const ModalChangePassword = () => {
    const { openORcloseModalChangePassword, modalChangePassword } = usePokemon()
    const toast = useToast()
    const navigate = useNavigate()
    const { register, handleSubmit } = useForm<Inputs>()
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const onSubmit: SubmitHandler<Inputs> = async data => {
        setIsLoading(true)
        axios.post(userapi + 'api/user/password/renew', data, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        }).then((response => {
            setIsLoading(false)
            localStorage.clear()
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
        })).catch(error => {
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
        <Modal isOpen={modalChangePassword!} onClose={() => openORcloseModalChangePassword!()}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Ganti Password</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Flex flexDirection='column' gap='4'>
                            <FormControl>
                                <FormLabel>New Password</FormLabel>
                                <Input
                                    {...register('password', { required: true, minLength: 8, maxLength: 16 })}
                                    placeholder='Enter new password'
                                    type='password'
                                />
                            </FormControl>
                            <FormControl>
                                <FormLabel>Confirm Password</FormLabel>
                                <Input
                                    {...register('confirmPassword', { required: true, minLength: 8, maxLength: 16 })}
                                    placeholder='Enter confirm password'
                                    type='password'
                                />
                            </FormControl>
                            <Button type='submit' isLoading={isLoading}>Submit</Button>
                        </Flex>
                    </form>
                </ModalBody>
                <ModalFooter>
                    <Button onClick={() => openORcloseModalChangePassword!()}>
                        Close
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}

export default ModalChangePassword