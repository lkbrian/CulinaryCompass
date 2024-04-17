import { Box, Flex, Image } from "@chakra-ui/react";
import logo from "../assets/logo.png"
import { NavLink } from "react-router-dom";
function Navbar() {
  return (
    <Flex px={10} bg={'none'} justify={"space-between"}color={"#0a303d"}>
      <Box w={"300px"}><Image src={logo} objectFit={"contain"} /></Box>
      <Flex gap={6} letterSpacing={1} fontWeight={600} align={"center"}>
    <NavLink>Home</NavLink>
    <NavLink>Recipies</NavLink>
    <NavLink>Collection</NavLink>
    <NavLink>Create recipe</NavLink>
    <NavLink>User</NavLink>
      </Flex>
    </Flex>
  );
}

export default Navbar;
