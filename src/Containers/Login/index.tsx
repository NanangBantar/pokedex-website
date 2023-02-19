import { useState } from 'react'
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    Text,
    Link
} from '@chakra-ui/react'
import FormLogin from './Components/FormLogin'
import { ContainerAuth, CardAuthContainer } from '../../Components/Container'

const Login = () => {
    const [isOpen, setIsOpen] = useState<boolean>(true)

    const onClose = () => setIsOpen(!isOpen)

    return (
        <>
            <ContainerAuth>
                <CardAuthContainer title="Login">
                    <FormLogin />
                </CardAuthContainer>
            </ContainerAuth>
            <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Info</ModalHeader>
                    <ModalBody>
                        This webapp using
                        <Text my='4' fontWeight='bold'>https://free-sharing-api.cyclic.app</Text>
                        for login and register functionality, please kindly check for the documentation
                        <Text my='4' fontWeight='bold' textAlign='center' color='blue'>
                            <Link href='https://free-sharing-api.cyclic.app/api-docs/'>https://free-sharing-api.cyclic.app</Link>
                        </Text>
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme='blue' mr={3} onClick={onClose}>
                            Close
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

export default Login