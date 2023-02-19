import { FC } from 'react'
import {
    Card,
    CardBody,
    Flex,
    Button,
    Heading,
    Divider,
    ListItem,
    UnorderedList,
    Badge
} from '@chakra-ui/react'
import ModalChangePassword from './ModalChangePassword'
import { usePokemon } from '../../../Context/Context'

type userDataType = {
    _id: string,
    email: string,
    username: string,
    isVerified: boolean
}

type Props = {
    data: userDataType
}

const UserData: FC<Props> = (props) => {
    const { openORcloseModalChangePassword } = usePokemon()

    return (
        <>
            <Card>
                <CardBody>
                    <Flex flexDirection='column'>
                        <Heading mb='4' fontSize='2xl'>User Data</Heading>
                        <Divider mb='4' />
                        <UnorderedList spacing='10px' fontSize='18px'>
                            <ListItem>Username : {props.data?.username}</ListItem>
                            <ListItem>Email : {props.data?.email}</ListItem>
                            <ListItem>Is Verified :
                                {props.data?.isVerified ?
                                    <Badge mx='2' variant='subtle' colorScheme='green'>
                                        Verified
                                    </Badge>
                                    :
                                    <Badge mx='2' variant='subtle' colorScheme='gray'>
                                        Not Verified
                                    </Badge>
                                }
                            </ListItem>
                        </UnorderedList>
                        <Button onClick={() => openORcloseModalChangePassword!()} my='4'>Change Password</Button>
                    </Flex>
                </CardBody>
            </Card>
            <ModalChangePassword />
        </>
    )
}

export default UserData