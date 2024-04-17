import Navbar from "./Navbar";
import {
  Box,
  Heading,
  Text,
  Button,
  Flex,
  Image,
  Container,
} from "@chakra-ui/react";
import hero_img from "../assets/burger.png"

function Home() {
  return (
    <Box minH={'100vh'}>
      {/* Hero Section */}
      <Navbar />
      <Box bg="#fff" py={20} color={"#0a303d"}>
        <Container maxW="container.xl">
          <Flex alignItems="center" justifyContent="space-between">
            <Box>
              <Heading size="xl" mb={4}>
                Welcome to Culinary Compass
              </Heading>
              <Text fontSize="lg" letterSpacing={1} w={[300,400]}>
                Explore a variety of recipes to experiment with
                and tantalize your taste buds with flavors from around the
                world.
              </Text>
              <Button bg={"#FFCA3A"} mt={8}>
                Explore recipes
              </Button>
            </Box>
            <Box>
              <Image
                src={hero_img}
                alt="Chef preparing food"
                borderRadius="xl"
              />
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
            <Button bg={'#FFCA3A'} size="md">
              Sign Up Now
            </Button>
          </Flex>
        </Container>
      </Box>
    </Box>
  );
}

export default Home;
