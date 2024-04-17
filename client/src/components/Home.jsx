import Navbar from "./Navbar";
import UserAuth from "./UserAuth";
import { useState, useEffect } from "react";
import {
  Box,
  Heading,
  Text,
  Button,
  Flex,
  Image,
  Container,
} from "@chakra-ui/react";
import hero_img from "../assets/burger.png";
import chef_img from "../assets/burger.png";

function Home() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchSession = async () => {
      try {
        const response = await fetch("/check_session");
        if (response.ok) {
          const user = await response.json();
          setUser(user);
        }
      } catch (error) {
        console.error("Error fetching session data:", error);
      }
    };

    fetchSession();
  }, []);

  return (
    <Box minH={"100vh"}>
      {/* Hero Section */}
      <Navbar user={user} setUser={setUser} />
      <Box bg="#fff" py={20} color={"#0a303d"}>
        <Container maxW="container.xl">
          <Flex
            alignItems="center"
            justifyContent={{ base: "center", md: "space-between" }}
            flexDirection={{ base: "column-reverse", md: "row-reverse" }}
          >
            <Box
              flex={{ base: "none", md: "1" }}
              maxW={{ base: "100%", md: "50%" }}
            >
              <Image
                src={hero_img}
                alt="Chef preparing food"
                borderRadius="xl"
              />
            </Box>
            <Box maxW={{ base: "100%", md: "50%" }}>
              <Heading size="xl" mb={4}>
                Welcome to Culinary Compass
              </Heading>
              <Text fontSize="lg" letterSpacing={1}>
                Explore a variety of recipes to experiment with and tantalize
                your taste buds with flavors from around the world.
              </Text>
              <Button bg={"#FFCA3A"} mt={8}>
                Explore recipes
              </Button>
            </Box>
          </Flex>
        </Container>
      </Box>

      {/* Call to Action Section */}
      <Box bg="gray.100" py={20}>
        <Container maxW="container.xl">
          <Heading size="xl" mb={4} textAlign="center">
            Ready to start your culinary journey?
          </Heading>
          <Flex justifyContent="center">
            <Button bg={"#FFCA3A"} size="md">
              Sign Up Now
            </Button>
          </Flex>
        </Container>
      </Box>

      {/* Alternate Image Section */}
      <Box bg="#fff" py={20} color={"#0a303d"}>
        <Container maxW="container.xl">
          <Flex
            alignItems="center"
            justifyContent={{ base: "center", md: "space-between" }}
            flexDirection={{ base: "column", md: "row" }}
          >
            <Box maxW={{ base: "100%", md: "50%" }}>
              <Heading size="xl" mb={4}>
                Explore New Recipes
              </Heading>
              <Text fontSize="lg" letterSpacing={1}>
                Discover exciting new recipes and cooking techniques to spice up
                your meals.
              </Text>
              <Button bg={"#FFCA3A"} mt={8}>
                Get Inspired
              </Button>
            </Box>
            <Box
              flex={{ base: "none", md: "1" }}
              maxW={{ base: "100%", md: "50%" }}
            >
              <Image
                src={chef_img}
                alt="Chef with ingredients"
                borderRadius="xl"
              />
            </Box>
          </Flex>
        </Container>
      </Box>
    </Box>
  );
}

export default Home;
