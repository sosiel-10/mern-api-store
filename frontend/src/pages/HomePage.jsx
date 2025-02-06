import { Box, Container, HStack, SimpleGrid, Text, VStack } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { LiaStoreAltSolid } from "react-icons/lia";
import { useStore } from '../store/product';
import { useEffect } from 'react';
import ProductCard from '../components/ProductCard';

const HomePage = () => {
    /* useStore is a custom React Hook */
    const { getProducts, products } = useStore();

    /* useEffect is a React Hook that runs 'side effects' in functional
    components. getProducts() ensures products are fetched and updated
    in the component state. The second argument is a dependency array,
    ensures getProducts remains the same reference across renders. */
    useEffect(() => {
        getProducts();
    }, [getProducts]);
    
    return (
        <Container maxW='container.xl' py={6}>
            <VStack spacing={8}>
                <HStack spacing={3}>
                    <Text
                        fontSize={"30px"}
                        fontWeight={"bold"}
                        bgGradient={"linear(to-r, cyan.400, blue.400)"}
                        bgClip={"text"}
                        textAlign={"center"}>
                        Current Products
                    </Text>
                    <Box
                        as="span"
                        color="blue.400"
                        fontSize="40px">
                        <LiaStoreAltSolid />
                    </Box>
                </HStack>

                <SimpleGrid
                    columns={{
                        base: 1,
                        md: 2,
                        lg: 3
                    }}
                    spacing={10} w={"full"}>
                    {products.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </SimpleGrid>
                <HStack>
                    {products.length === 0 && (
                        <Text
                            fontSize='xl'
                            textAlign={"center"}
                            fontWeight={"bold"}
                            color="gray.500">
                            No products found |{" "}                        
                        </Text>
                    )}
                    <Text>
                        <Link to={'/add'}>
                            <Text
                                as="span"
                                fontSize='xl'
                                color="blue.500"
                                _hover={{ textDecoration: "underline" }}>
                                Add a Product
                            </Text>
                        </Link>
                    </Text>
                </HStack>
            </VStack>
        </Container>
    )
}
export default HomePage;