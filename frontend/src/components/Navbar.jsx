/**
 * Navbar component.
 * The Navbar should be present on every page and
 * can route to the HomePage and AddPage.
 * 
 * @author Sebastian Villagomez
 */

import { Button, Container, Flex, HStack, Text, useColorMode } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

/* The three icons used for the buttons. */
import { PlusSquareIcon } from '@chakra-ui/icons';
import { IoMoon } from 'react-icons/io5';
import { LuSun } from 'react-icons/lu';

const Navbar = () => {
    const { colorMode, toggleColorMode } = useColorMode();

    return  (
        <Container maxW={'1140px'} px={4}>
            <Flex
                h={16}
                alignItems={'center'}
                justifyContent={'space-between'}
                flexDir={{base:'column', sm:'row'}}>
                <Text
                    fontSize={{ base: "22", sm: "28" }}
                    fontWeight={"bold"}
                    textTransform={"uppercase"}
                    textAlign={"center"}
                    bgGradient="linear(to-r, red.400, blue.500)"
                    bgClip={"text"}>
                    <Link to={'/'}>Product Inventory 🛒</Link>
                </Text>

                <HStack spacing={2} alignItems={'center'}>
                    <Link to={'/add'}>
                        <Button>
                            <PlusSquareIcon fontSize={20} />
                        </Button>
                    </Link>
                    <Button
                        onClick={toggleColorMode}>
                        {colorMode === "light" ? <IoMoon /> : <LuSun size='20' /> }
                    </Button>
                </HStack>

            </Flex>
        </Container>
    );
}
export default Navbar;