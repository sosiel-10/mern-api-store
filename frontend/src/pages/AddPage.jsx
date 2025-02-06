import { Box, Button, Container, Heading, Input, Text, useToast, useColorModeValue, VStack } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useStore } from '../store/product';

const AddPage = () => {
    /* useState is a React hook, allowing components to have a state
    newProduct is a state variable holding the current state value
    setNewProduct updates the state and triggers a re-render */
    const [newProduct, setNewProduct] = useState({
        name: "",
        cost: "",
        stock: "",
        description: "",
        image: "",
    });

    const toast = useToast();

    /* useStore is a custom React Hook */
    const { createProduct } = useStore();

    /**
     * Handles adding a new product to the store. 
     * User receives feedback on whether or not the operation
     * was successful.
     */
    const handleAddProduct = async () => {
        console.log(newProduct);
        const { success,message } = await createProduct(newProduct);

        if(!success){
            toast({
                title: "Error",
                description: message,
                status: "error",
                duration: 5000,
                isClosable: true
            })
        }
        else{
            toast({
                title: "Success",
                description: message,
                status: "success",
                duration: 5000,
                isClosable: true
            })
        }
        setNewProduct({ name:'', cost:'', stock:'', description:'', image:'' })
    };

    return (
        <Container maxW={"container.sm"}>
            <VStack spacing={8}>
                <Heading
                    as={"h1"}
                    fontSize={"30px"}
                    bgGradient={"linear(to-r, cyan.400, blue.400)"}
                    bgClip={"text"}
                    textAlign={"center"}
                    mb={4} mt={4}>
                    Add New Product
                </Heading>

                <Box 
                    w={"full"} p={6} rounded={"lg"} shadow={"md"}
                    bg={useColorModeValue("white", "gray.800")} >
                    <VStack spacing={4}>        
                        <Input 
                            placeholder="Product Name"
                            name="name"
                            value={newProduct.name}
                            onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value})} />
                        <Input
                            placeholder="Cost of Product"
                            name="cost"
                            type="text" inputMode="numeric"
                            value={newProduct.cost}
                            step="0.01"
                            onChange={(e) => setNewProduct({ ...newProduct, cost: e.target.value })} />
                        <Input
                            placeholder="Product Stock"
                            name="stock"
                            type="text" inputMode="numeric"
                            value={newProduct.stock}
                            onChange={(e) => setNewProduct({ ...newProduct, stock: e.target.value })} />
                        <Input
                            placeholder="Product Description"
                            name="description"
                            value={newProduct.description}
                            onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value})} />
                        <Input
                            placeholder="Image URL"
                            name="image"
                            value={newProduct.image}
                            onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value})} />
                        <Button colorScheme="blue" onClick={handleAddProduct} w="full">
                            Add Product
                        </Button>
                    </VStack>
                </Box>

                <Text>
                    <Link to={'/'}>
                        <Text
                            as="span"
                            fontSize='xl'
                            color="blue.500"
                            _hover={{ textDecoration: "underline" }}>
                            Back to Home
                        </Text>
                    </Link>
                </Text>
            </VStack>
        </Container>
    );
};

export default AddPage;