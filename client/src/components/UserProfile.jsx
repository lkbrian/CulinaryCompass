import React, { useState } from "react";
import { SessionContext } from "./SessionContext";
import { useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { TbLogout2 } from "react-icons/tb";
import {
  Box,
  Flex,
  Heading,
  Input,
  Button,
  Textarea,
  Avatar,
  Text,
  ButtonGroup,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  WrapItem,
  AvatarBadge,
} from "@chakra-ui/react";
import NotFound from "./NotFound";
import DeleteAccount from "./DeleteAccount";

function UserProfile() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();
  const navigate = useNavigate();
  const { user, logged, setUser } = useContext(SessionContext);
  const api = import.meta.env.VITE_API_URL;

  const [formData, setFormData] = useState({
    username: user?.username || "",
    email: user?.email || "",
    img_url: user?.img_url || "",
    bio: user?.bio || "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedData = {};
    for (const key in updatedData) {
      if (formData[key] !== user[key]) {
        updatedData[key] = formData[key];
      }
    }
    fetch(`${api}/users/${user.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedData),
    })
      .then((response) => {
        if (response.ok) {
          // Handle successful update
          console.log("Profile updated successfully");
          setUser((prevUser) => ({ ...prevUser, ...formData }));
        } else {
          // Handle errors
          console.error("Failed to update profile");
        }
        
      })
      .catch((error) => {
        console.error("Error updating profile:", error);
      });
  };

  function handleLogoutClick() {
    fetch(`${api}/logout`, { method: "DELETE" }).then((r) => {
      if (r.ok) {
        navigate("/");
        setUser(null);
      }
    });
  }

  const handleDeleteConfirmed = () => {
    fetch(`${api}/users/${user.id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.ok) {
          console.log("Account deleted successfully");
          navigate("/");
          setUser(null);
        } else {
          console.error("Failed to delete account");
        }
      })
      .catch((error) => {
        console.error("Error deleting account:", error);
      });
  };
  console.log(user);
  return (
    <>
      {logged ? (
        <>
          <WrapItem ref={btnRef} onClick={onOpen} cursor={"pointer"}>
            <Avatar size={"sm"} src={user.img_url} bg="#0a303d">
              <AvatarBadge boxSize="1.25em" bg="green.500" />
            </Avatar>
          </WrapItem>
          <Drawer
            isOpen={isOpen}
            placement="left"
            onClose={onClose}
            finalFocusRef={btnRef}
            size={{ base: "xs", md: "md" }}
          >
            <DrawerOverlay />
            <DrawerContent>
              <DrawerCloseButton />
              <DrawerHeader>Profile</DrawerHeader>

              <DrawerBody>
                <Flex flexDir={"column"} gap={6} p={2} m={2}>
                  {/* Current User Information */}
                  <Box mr={8}>
                    <Avatar
                      src={user.img_url}
                      name={user.username}
                      size="xl"
                      mb={4}
                    />
                    <Heading size="md" mb={2}>
                      {user.username}
                    </Heading>
                    <Text mb={2}>{user.email}</Text>
                    <Text mb={4}>{user.bio}</Text>
                    <Link
                      to="/favorites"
                      style={{ textDecoration: "underline" }}
                    >
                      Favorite Recipes
                    </Link>
                    <br />
                    <Flex gap={6} mt={4}>
                      <Button
                        bg="#0a303d"
                        color="#fff"
                        onClick={handleLogoutClick}
                        _hover={{bg:"#0a303d"}}
                      >
                        <TbLogout2 fontSize={'1.5rem'}/>
                      </Button>
                      <DeleteAccount onDeleteAccount={handleDeleteConfirmed} />
                    </Flex>
                  </Box>
                  {/* Profile Update Form */}
                  <Box>
                    <Heading size="md" mb={4}>
                      Edit
                    </Heading>
                    <form onSubmit={handleSubmit}>
                      <Input
                        type="text"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        placeholder="Username"
                        mb={4}
                      />
                      <Input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Email"
                        mb={4}
                      />
                      <Input
                        type="text"
                        name="img_url"
                        value={formData.img_url}
                        onChange={handleChange}
                        placeholder="Image URL"
                        mb={4}
                      />
                      <Textarea
                        name="bio"
                        value={formData.bio}
                        onChange={handleChange}
                        placeholder="Bio"
                        mb={4}
                      />
                      <Button type="submit" bg="#FFCA3A">
                        Update Profile
                      </Button>
                    </form>
                  </Box>
                </Flex>
              </DrawerBody>
            </DrawerContent>
          </Drawer>
        </>
      ) : (
        <Text>User not Found</Text>
      )}
    </>
  );
}

export default UserProfile;
