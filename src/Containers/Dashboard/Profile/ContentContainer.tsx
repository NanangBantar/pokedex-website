import { useState, useEffect } from 'react'
import axios from 'axios'
import {
    Card,
    CardBody,
    Flex,
    Box,
    Heading,
    SimpleGrid,
    Divider,
} from '@chakra-ui/react'
import MyPokemon from '../Home/MyPokemon'
import UserData from './UserData'
import { userapi } from '../../../Utils/Api'
import { usePokemon } from '../../../Context/Context'

type userDataType = {
    _id: string,
    email: string,
    username: string,
    isVerified: boolean
}

const ContentContainer = () => {
    const [data, setData] = useState<userDataType>()
    const { myPokemon } = usePokemon()

    const getData = () => {
        axios.get(userapi + 'api/user', {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        }).then((response) => {
            setData(response.data.data.user)
        })
    }

    useEffect(() => {
        getData()
    }, [])

    return (
        <Card my='30px'>
            <CardBody>
                <Heading mb='4'>My Profile</Heading>
                <Flex gap='20px'>
                    <Box w='30%'>
                        <UserData data={data!} />
                    </Box>
                    <Box w='70%'>
                        <MyPokemon />
                    </Box>
                </Flex>
            </CardBody>
        </Card >
    )
}

export default ContentContainer