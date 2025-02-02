import { Box, Button, Heading, HStack, IconButton, Image, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, useColorModeValue, useDisclosure, useToast, VStack } from "@chakra-ui/react"
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { useProductStore } from "../store/product";
import { useState } from "react";

const ProductCard = ({ product }) => {
  const textColor = useColorModeValue("gray.700", "gray.200");
  const bg = useColorModeValue("gray.200", "gray.700");
  const { putProduct, deleteProduct } = useProductStore();
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [ updateProduct, setUpdateProduct ] = useState(product);

  const handlePutProduct = async (id, updateProduct) => {
    const { success, message } = await putProduct(id, updateProduct);

    if (!success) {
      toast({
        title: "Error!",
        description: message,
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top"
      });
    }
    else {
      toast({
        title: "Success!",
        description: message,
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "top"
      });
      onClose();
    }
  }

  const handleDeleteProduct = async (id) => {
    const { success, message } = await deleteProduct(id);

    if (!success) {
      toast({
        title: "Error!",
        description: message,
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top"
      });
    }
    else {
      toast({
        title: "Success!",
        description: message,
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "top"
      });
    }
  };

  return (
    <Box
      shadow={"lg"}
      rounded={"lg"}
      overflow={"hidden"}
      transition={"all 0.3s"}
      _hover={{ transform: "translateY(-5px)", shadow: "xl"}}
      bg={bg}>
      <Image src={product.image} alt={product.name} h={48} w={"full"} objectFit={"cover"} />

      <Box p={4}>
        <Heading as={"h3"} size={"md"} mb={2}>
          {product.name}
        </Heading>

        <Text fontWeight={"bold"} fontSize={"xl"} color={textColor} mb={4}>
          ${product.price}
        </Text>

        <HStack spacing={2}>
        <IconButton icon={<FaEdit />} onClick={onOpen} colorScheme="blue" />

        <IconButton icon={<MdDelete />} onClick={() => handleDeleteProduct(product._id)} colorScheme="red" />
      </HStack>
      </Box>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />

        <ModalContent>
          <ModalHeader>Update product</ModalHeader>
          
          <ModalCloseButton />

          <ModalBody>
            <VStack spacing={4}>
              <Input
                placeholder="Name"
                name="name"
                value={updateProduct.name}
                onChange={(e) => setUpdateProduct({ ...updateProduct, name: e.target.value })} />
              
              <Input
                placeholder="Price"
                name="price"
                value={updateProduct.price}
                onChange={(e) => setUpdateProduct({ ...updateProduct, price: e.target.value })} />

              <Input
                placeholder="Image"
                name="image"
                value={updateProduct.image}
                onChange={(e) => setUpdateProduct({ ...updateProduct, image: e.target.value })} />
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button mr={3} onClick={onClose}>Close</Button>

            <Button colorScheme="blue" onClick={() => handlePutProduct(product._id, updateProduct)}>Save</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default ProductCard;