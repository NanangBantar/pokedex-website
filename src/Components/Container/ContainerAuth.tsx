import { FC, ReactNode } from 'react';
import { Flex } from '@chakra-ui/react'
import styled from '@emotion/styled'
import ImageBackground from '../../Assets/Image/undraw_Login_re_4vu2.png'

type Props = {
    children: ReactNode
}

const Container = styled(Flex)`
  width: 100vw;
  height: 100vh;
  background-repeat: no-repeat;
  background-position: center right;
  justify-content: center;
  align-items: center;
`;

const ContainerAuth: FC<Props> = (props) => {
    return (
        <Container backgroundImage={ImageBackground}>
            {props.children}
        </Container>
    )
}

export default ContainerAuth