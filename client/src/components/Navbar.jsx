import React from "react";
import {
  Box,
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
import {  NavLink } from "react-router-dom";
import { CgMenuRightAlt } from "react-icons/cg";
import UserProfile from "./UserProfile.jsx";

function Navbar() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();

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
        <NavLink className={"links"} to="/collections">
          Collection
        </NavLink>
        <NavLink className={"links"} to="/create">
          Create
        </NavLink>

        <UserProfile />
      </Flex>
      <Flex display={{ base: "flex", lg: "none" }}>
        <Box
          cursor={"pointer"}
          borderRadius={"8px"}
          bg={"none"}
          display={"flex"}
          justify={"center"}
          align={"center"}
          gap={8}
        >
          <UserProfile />
          <Box onClick={onOpen} ref={btnRef}>
            <CgMenuRightAlt color={"#0a303d"} fontSize={"2rem"} />
          </Box>
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

            <DrawerBody display={"flex"} flexDirection={"column"} gap={"8px"}>
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
                to={"/collections"}
                smooth="true"
                onClick={() => {
                  onClose();
                }}
              >
                Collection
              </NavLink>
            </DrawerBody>
            <DrawerFooter>
              <Text color={"#d4d4d4"} fontSize={".8rem"} textAlign={"center"}>
                &copy;2024 culinarycompass.All rights reserved.
              </Text>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </Flex>
    </Flex>
  );
}

export default Navbar;