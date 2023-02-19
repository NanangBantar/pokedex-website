import { FC, ReactNode } from 'react'
import { Card, CardBody, Heading, Divider } from '@chakra-ui/react'

type Props = {
    children: ReactNode,
    title: string;
}

const CardAuthContainer: FC<Props> = (props) => {
    return (
        <Card w={['100%', '100%', '100%', '30%']} h={['100%', '100%', '100%', 'fit-content']}>
            <CardBody>
                <Heading fontSize='3xl' mb='4'>{props.title}</Heading>
                <Divider mb='4' />
                {props.children}
            </CardBody>
        </Card>
    )
}

export default CardAuthContainer