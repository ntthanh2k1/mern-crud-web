import { Button, Container, Flex, HStack, Text, useColorMode, useColorModeValue } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { FaRegMoon, FaRegPlusSquare, FaSun } from "react-icons/fa";

const Navbar = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Container minW={"100vw"} px={4} boxShadow={"md"} bg={useColorModeValue("gray.200", "gray.700")}>
      <Flex
        h={16}
        alignItems={"center"}
        justifyContent={"space-between"}
        flexDir={{
          base: "column",
          sm: "row"
        }}>
        <Text
          bgGradient={"linear(to-r, cyan.400, blue.500)"}
          bgClip={"text"}
          fontSize={{ base: 22, sm: 28 }}
          fontWeight={"bold"}
          textTransform={"uppercase"}
          textAlign={"center"}>
          <Link to={"/"}>MERN CRUD WEB</Link>
        </Text>

        <HStack spacing={2} alignItems={"center"}>
          <Link to={"/post"}>
            <Button>
              <FaRegPlusSquare fontSize={20} />
            </Button>
          </Link>
          
          <Button onClick={toggleColorMode}>
            {colorMode === "light"? <FaRegMoon /> : <FaSun />}
          </Button>
        </HStack>
      </Flex>
    </Container>
  );
};

export default Navbar;
