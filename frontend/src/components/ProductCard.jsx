/**
 * The ProductCard component.
 * Defines how each product will be shown on the
 * HomePage. Has edit and delete buttons to update
 * the product and database accordingly.
 * 
 * @author Sebastian Villagomez
 */

import {
    Box, Button,
    Heading, HStack,
    IconButton, Image, Input,
    Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay,
    Spacer,
    Text,
    useColorModeValue, useDisclosure, useToast,
    VStack
} from '@chakra-ui/react';
import { EditIcon, DeleteIcon } from '@chakra-ui/icons';
import { useStore } from '../store/product';
import { useState } from 'react';

const ProductCard = ({ product }) => {
    /* useState is a React hook, allowing components to have a state
    updatedProduct is a state variable holding the current state value
    setProduct updates the state and triggers a re-render */
    const [updatedProduct, setProduct] = useState(product);

    const textColor = useColorModeValue("gray.600", "gray.200");
    const bgColor = useColorModeValue("white", "gray.800");

    /* useStore is a custom React Hook */
    const { deleteProduct, updateProduct } = useStore();
    const toast = useToast();
    /* Two separate useDisclosure hooks from ChakraUI for two different modals */
    const { isOpen: editIsOpen, onOpen: editOnOpen, onClose: editOnClose } = useDisclosure();
    const { isOpen: deleteIsOpen, onOpen: deleteOnOpen, onClose: deleteOnClose } = useDisclosure();

    /**
     * Handles the logic for deleting a product. The user
     * will receive a toast message indicating the success,
     * or lack thereof, of the operation.
     * 
     * @param {*} pid the product id.
     */
    const handleDelete = async (pid) => {
        const { success, message } = await deleteProduct(pid)
        deleteOnClose();
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
    }

    /**
     * Ensures all fields are cleared and reset anytime the edit
     * modal opens.
     */
    const handleOpen = () => {
        setProduct({ ...product });
        editOnOpen();
    }

    /**
     * Handles the logic for updating a product. The user
     * will receive a toast message indicating the success,
     * or lack thereof, of the operation.
     * 
     * @param {*} pid the product id.
     * @param {*} updatedProduct the product object.
     */
    const handleUpdate = async (pid, updatedProduct) => {
        const { success, message } = await updateProduct(pid, updatedProduct);

        editOnClose();
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
                description: "Product Updated Successfully",
                status: "success",
                duration: 5000,
                isClosable: true
            })
        }
    }

    return (
        <Box
            shadow='lg' rounded='lg' bg={bgColor}
            overflow = 'hidden'
            transition='all 0.3s ease-in-out'
            _hover={{ transform: "translateY(-5px)", shadow: "xl" }}
            display={'flex'} flexDirection={'column'}>
            
            <Image src={product.image} alt={product.name} h={48} w='full' objectFit='cover' />

            <Box p={4}>
                <Heading as='h3' size='md'>
                    {product.name}
                </Heading>
                <Text fontSize='lg' color={textColor} mb={2}>
                    {product.description}
                </Text>
            </Box>

            <Spacer />

            <Box mb={4} ml={4}>
                <Text fontWeight='bold' fontSize='xl' color={textColor}>
                    ${product.cost}
                </Text>
                <Text fontSize='lg' color={textColor} mb={2}>
                    Stock: {product.stock}
                </Text>
                <HStack spacing={2}>
                    <IconButton icon={<EditIcon />} onClick={handleOpen} colorScheme='blue' />
                    <IconButton icon={<DeleteIcon />} onClick={deleteOnOpen} colorScheme='red' />
                </HStack>
            </Box>

            {/* Edit Modal */}
            <Modal isOpen={editIsOpen} onClose={editOnClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Update Product</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <VStack spacing={4}>
                            <Input 
                                placeholder="Product Name"
                                name="name"
                                value={updatedProduct.name}
                                onChange={(e) => setProduct({ ...updatedProduct, name: e.target.value})} />
                            <Input
                                placeholder="Cost of Product"
                                name="cost"
                                type="number" step="0.01"
                                value={updatedProduct.cost}
                                onChange={(e) => setProduct({ ...updatedProduct, cost: e.target.value})} />
                            <Input
                                placeholder="Product Stock"
                                name="stock"
                                type="number"
                                value={updatedProduct.stock}
                                onChange={(e) => setProduct({ ...updatedProduct, stock: parseInt(e.target.value, 10)})} />
                            <Input
                                placeholder="Product Description"
                                name="description"
                                value={updatedProduct.description}
                                onChange={(e) => setProduct({ ...updatedProduct, description: e.target.value})} />
                            <Input
                                placeholder="Image URL"
                                name="image"
                                value={updatedProduct.image}
                                onChange={(e) => setProduct({ ...updatedProduct, image: e.target.value})} />
                        </VStack>
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme='blue' mr={3} onClick={() => handleUpdate(product.id, updatedProduct)}>
                            Update
                        </Button>
                        <Button variant='ghost' onClick={editOnClose}>Cancel</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>

            {/* Delete Modal */}
            <Modal isOpen={deleteIsOpen} onClose={deleteOnClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Delete Product</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Text fontSize='xl' color={textColor}>
                            Are you sure you want to delete {" "}
                            <Text as={'span'} fontWeight='bold' fontSize='xl' color={textColor} textDecoration={'underline'}>
                                {product.name}
                            </Text>
                        </Text>
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme='blue' mr={3} onClick={() => handleDelete(product.id)}>
                            Delete
                        </Button>
                        <Button variant='ghost' onClick={deleteOnClose}>Cancel</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </Box>
    )
}

export default ProductCard;