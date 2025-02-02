import { Box, Button, Container, Heading, Input, useColorModeValue, useToast, VStack } from "@chakra-ui/react";
import { useState } from "react";
import { useProductStore } from "../store/product";
import { useNavigate } from "react-router-dom";

const PostPage = () => {
  const [ newProduct, setNewProduct ] = useState({
    name: "",
    price: "",  
    image: ""
  });
  const { postProduct } = useProductStore();
  const toast = useToast();
  const navigate = useNavigate();
  
  const handlePostProduct = async () => {
    const { success, message } = await postProduct(newProduct);

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
      navigate('/');
    }
  };

  return (
    <Container maxW={"container.sm"}>
      <VStack spacing={8}>
        <Heading
          as={"h1"}
          size={"2xl"}
          textAlign={"center"}
          mb={8}>
          Create new product
        </Heading>
        <Box
          w={"full"}
          bg={useColorModeValue("gray.200", "gray.700")}
          p={6}
          rounded={"lg"}
          boxShadow={"md"}>
          <VStack spacing={4}>
            <Input
              boxShadow={"md"}
              placeholder="Name"
              name="name"
              value={newProduct.name}
              onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })} />

            <Input
              boxShadow={"md"}
              placeholder="Price"
              name="price"
              type="number"
              value={newProduct.price}
              onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })} />
              
            <Input
              boxShadow={"md"}
              placeholder="Image"
              name="image"
              value={newProduct.image}
              onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })} />
            <Button w={"full"} colorScheme="blue" onClick={handlePostProduct}>
              Save
            </Button>
          </VStack>
        </Box>
      </VStack>
    </Container>
  );
};

export default PostPage;
