import { FC, useState, useEffect } from 'react'
import { Text, Flex, UnorderedList, ListItem } from '@chakra-ui/react'
import axios from 'axios'

type Props = {
    url: string
}

type RegionNameType = {
    name: string,
    url: string
}

const RegionName: FC<Props> = (props) => {
    const [data, setData] = useState<RegionNameType>({ name: '', url: '' })

    const getData = () => {
        axios.get(props.url).then((response) => {
            setData(response.data.main_region)
        })
    }

    useEffect(() => {
        getData()
    }, [])

    return (
        <Flex flexDirection='column' mt='4'>
            <Text fontSize='24px' textAlign='center' fontWeight='bold' mb='4'>{data!.name.toUpperCase()}</Text>
        </Flex>
    )
}

const Region: FC<Props> = (props) => {
    return (
        <RegionName url={props.url} />
    )
}

export default Region