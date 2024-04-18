import React from "react";
import {
  Box,
  Button,
  Flex,
  Text,
  Image,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerFooter,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
} from "@chakra-ui/react";
import logo from "../assets/logo.png";
import { NavLink } from "react-router-dom";
import { CgMenuRightAlt } from "react-icons/cg";
import UserAuth from "./UserAuth";
import PropTypes  from "prop-types";
function Navbar({user,setUser}) {
  
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();

   function handleLogoutClick() {
    fetch("/api/logout", { method: "DELETE" }).then((r) => {
      if (r.ok) {
        setUser(null);
      }
    });
  }
  

  return (
    <Flex
      px={{ base: 4, lg: 10 }}
      bg={"none"}
      align={"center"}
      justify={"space-between"}
      color={"#0a303d"}
    >
      <Box w={{ base: "190px", md: "300px" }}>

        <Image src={logo} objectFit={"contain"} />
      </Box>

      {user ?  (
        <UserAuth />
      ):(
        <>
          <Flex
            letterSpacing={1}
            align={"center"}
            as="nav"
            gap={{ base: "12px", md: "30px" }}
            display={{ base: "none", lg: "flex" }}
            pr={"10px"}
          >
            <NavLink className={"links"} to="/home">
              Home
            </NavLink>
            <NavLink className={"links"} to="/all_recipes">
              Recipes
            </NavLink>
            <NavLink className={"links"} to="/collection">
              Collection
            </NavLink>
            <NavLink className={"links"} to="/create">
              Create
            </NavLink>
                    <Button
                      alignSelf={"center"}
                      w={"150px"}
                      bg={"#FFCA3A"}
                      type="submit"
                      variant={"ghost"}
                      _hover={{ background: "#FFCA3A" }}
                      onClick={handleLogoutClick}
                      // isLoading={isSubmitting}
                    >
                      Logout
                    </Button>
          </Flex>
          <Flex display={{ base: "flex", lg: "none" }}>
            <Box
              cursor={"pointer"}
              borderRadius={"8px"}
              ref={btnRef}
              bg={"none"}
              onClick={onOpen}
            >
              <CgMenuRightAlt color={"#0a303d"} fontSize={"2rem"} />
            </Box>
            <Drawer
              isOpen={isOpen}
              placement="right"
              onClose={onClose}
              finalFocusRef={btnRef}
            >
              <DrawerOverlay />
              <DrawerContent bg={"#fff"}>
                <DrawerCloseButton />
                <DrawerHeader></DrawerHeader>

                <DrawerBody
                  display={"flex"}
                  flexDirection={"column"}
                  gap={"8px"}
                >
                  <NavLink
                    className={"drawer-link"}
                    to={"/home"}
                    smooth="true"
                    onClick={() => {
                      onClose();
                    }}
                  >
                    Home
                  </NavLink>
                  <NavLink
                    className={"drawer-link"}
                    to={"/all_recipes"}
                    smooth="true"
                    onClick={() => {
                      onClose();
                    }}
                  >
                    Recipe
                  </NavLink>
                  <NavLink
                    className={"drawer-link"}
                    to={"/create"}
                    smooth="true"
                    onClick={() => {
                      onClose();
                    }}
                  >
                    Create
                  </NavLink>
                  <NavLink
                    className={"drawer-link"}
                    to={"/collection"}
                    smooth="true"
                    onClick={() => {
                      onClose();
                    }}
                  >
                    Collection
                  </NavLink>
                </DrawerBody>
                <DrawerFooter>
                  <Text
                    color={"#d4d4d4"}
                    fontSize={".8rem"}
                    textAlign={"center"}
                  >
                    &copy;2024 culinarycompass.All rights reserved.
                  </Text>
                </DrawerFooter>
              </DrawerContent>
            </Drawer>
          </Flex>
        </>
      ) }

    </Flex>
  );
}

export default Navbar;
Navbar.propTypes = {
  user: PropTypes.object,
  setUser: PropTypes.func, 
};