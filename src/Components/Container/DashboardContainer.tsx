import { FC, ReactNode } from 'react'
import { Flex } from '@chakra-ui/react'
import TopNavigation from '../TopNavigation'

type Props = {
    children: ReactNode
}

const DashboardContainer: FC<Props> = (props) => {
    return (
        <Flex flexDirection='column'>
            <TopNavigation />
            <Flex mt='90px' px='40px' flexDirection='column'>
                {props.children}
            </Flex>
        </Flex>
    )
}

export default DashboardContainer