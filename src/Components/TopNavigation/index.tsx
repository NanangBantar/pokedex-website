import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useScroll, useMotionValueEvent } from 'framer-motion'
import { Flex, Box, Image, HStack, Button } from '@chakra-ui/react'
import styled from '@emotion/styled'
import Logo from '../../Assets/Image/612ce4761b9679000402af1c.png'

const ContainerFlex = styled(Flex)`
    height: 10vh;
    width: 100%;
    background-color: #E1EEDD;
    position: fixed;
    padding: 0px 40px;
`;

const ImageContainer = styled(Image)`
    height: 50px;
    margin-top: 5px;
`;

const ContainerHStack = styled(HStack)`
    width: 100%;
    display: flex;
    justify-content: flex-end;
    align-items: center;
`;

const ContainerBox = styled(Box)`
    cursor: pointer;
    font-weight: bold;
    color: rgba(0, 0, 0, 0.6);

    &:hover{
        color: rgba(0, 0, 0, 1);;
    }
`;

const TopNavigation = () => {
    const location = useLocation()
    const navigate = useNavigate()
    const { scrollY } = useScroll()
    const [isShadow, setIsShadow] = useState<boolean>(false)

    useMotionValueEvent(scrollY, "change", (latest) => {
        if (latest > 0) {
            setIsShadow(true)
            return
        }
        setIsShadow(false)
    })

    return (
        <ContainerFlex zIndex='1000' boxShadow={isShadow ? 'md' : 'none'}>
            <Box w='100%' display='flex' alignItems='center'>
                <ImageContainer src={Logo} />
            </Box>
            <ContainerHStack>
                <HStack spacing={6}>
                    {location.pathname !== '/dashboard' &&
                        <ContainerBox onClick={() => navigate('/dashboard')}>
                            Dashboard
                        </ContainerBox>
                    }
                    <ContainerBox onClick={() => navigate('/pokemon')}>
                        Pokemon
                    </ContainerBox>
                    <ContainerBox onClick={() => navigate('/profile')}>
                        Profile
                    </ContainerBox>
                </HStack>
                <Button onClick={() => {
                    localStorage.clear()
                    navigate('/')
                }} ml='30px !important' border='1px solid #EEEEEE'>Logout</Button>
            </ContainerHStack>
        </ContainerFlex>
    )
}

export default TopNavigation