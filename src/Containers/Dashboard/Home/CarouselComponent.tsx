import { useState, useEffect } from 'react'
import { Box, Image, Slide, Button, Flex, useDisclosure } from '@chakra-ui/react'
import SlideOneImage from '../../../Assets/Image/20161101_pokemon_mobile@2x.jpg'
import SliderTwoImage from '../../../Assets/Image/pokemon+trivia+banner.png'
import SliderThreeImage from '../../../Assets/Image/Pokemon-851x315-a38a34e2.png'

const CarouselComponent = () => {
    const [position, setPosition] = useState<number>(1)
    const { onToggle } = useDisclosure()

    useEffect(() => {
        onToggle()
    }, [position])

    return (
        <Flex w='100%' flexDirection='column'>
            <Box h='50vh' w='100%' borderRadius='10px' position='relative' overflow='hidden'>
                <Slide style={{ height: '50vh', position: 'absolute', display: position === 1 ? 'block' : 'none' }} in={position === 1 ? true : false}>
                    <Image borderRadius='10px' boxSize='100%' src={SlideOneImage} />
                </Slide>
                <Slide style={{ height: '50vh', position: 'absolute', display: position === 2 ? 'block' : 'none' }} in={position === 2 ? true : false}>
                    <Image borderRadius='10px' boxSize='100%' src={SliderTwoImage} />
                </Slide>
                <Slide style={{ height: '50vh', position: 'absolute', display: position === 3 ? 'block' : 'none' }} in={position === 3 ? true : false}>
                    <Image borderRadius='10px' boxSize='100%' src={SliderThreeImage} />
                </Slide>
            </Box>
            <Flex my='3' justifyContent='center' gap='10px'>
                <Button shadow='md' size='xs' bg='#E1EEDD' onClick={() => {
                    if (position !== 1) {
                        setPosition(prev => prev - 1)
                        return
                    }
                    setPosition(3)
                }}>Prev</Button>
                <Button shadow='md' size='xs' bg='#E1EEDD' onClick={() => {
                    if (position === 3) {
                        setPosition(1)
                        return
                    }
                    setPosition(prev => prev + 1)
                }}>Next</Button>
            </Flex>
        </Flex >
    )
}

export default CarouselComponent