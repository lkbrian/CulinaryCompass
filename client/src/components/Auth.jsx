import { Box, Flex, Image } from "@chakra-ui/react";
import PropTypes  from "prop-types";
import logo from "../assets/logo.png";
import UserAuth from "./UserAuth";

function Auth() {
  return (
    <Flex justify={"space-between"}align={'center'} px={{base:'1',md: '10'}}>
      <Box w={{ base: "150px", md: "300px" }}>
        <Image src={logo} objectFit={"contain"} />
      </Box>
      <UserAuth/>
    </Flex>
  );
}

export default Auth;
Auth.propTypes = {
    user: PropTypes.object,
    setUser: PropTypes.func, 
  };