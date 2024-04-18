
import Navbar from "./Navbar";
import {
  Box,
  Heading,
  Text,
  Button,
  Flex,
  Image,
  Container,
  Stack,
} from "@chakra-ui/react";
// import {useState,useEffect} from 'react'
import hero_img from "../assets/burger.png";
import chef_img from "../assets/plated.png";
import { Link } from "react-router-dom"; 

function Home() {
  return (
    <Box minH={"100vh"} bg={"#fff"} color={"#0a303d"}>
      {/* Hero Section */}
      <Navbar />
      <Box py={20} pb={40}>
        <Container maxW="container.xl">
          <Flex
            alignItems="center"
            justifyContent={{ base: "center", md: "space-between" }}
            flexDirection={{ base: "column", md: "row" }}
          >
            <Box
              flex={{ base: "none", md: "1" }}
              maxW={{ base: "100%", md: "50%" }}
            >
              <Stack spacing={8}>
                <Heading size="xl">Your Culinary Journey Starts Here</Heading>
                <Text fontSize="lg" letterSpacing={1}>
                  Embark on a delicious adventure with Culinary Compass. Explore
                  a vast library of recipes from every corner of the globe, from
                  classic comfort foods to exotic dishes that will tantalize
                  your taste buds. We offer clear, step-by-step instructions and
                  helpful tips to guide you in the kitchen, regardless of your
                  experience level.
                </Text>
                <Button bg={"#FFCA3A"} w={'35%'} as={Link} to="/all_recipes">
                  Explore Recipes
                </Button>
              </Stack>
            </Box>
            <Box maxW={{ base: "100%", md: "50%" }}>
              <Image
                src={hero_img}
                alt="A mouthwatering burger"
                borderRadius="xl"
              />
            </Box>
          </Flex>
        </Container>
      </Box>
      <Box py={20} bg={"#0a303d"} color={"#fff"}>
        <Container maxW="container.lg">
          <Flex
            justifyContent="center"
            flexDirection="column"
            alignItems="center"
          >
            <Heading size="xl" mb={4}>
              Find Your Perfect Recipe
            </Heading>
            <Text fontSize="lg" textAlign="center" maxW="600px" mb={8}>
              Can&apos;t decide what to cook? Use our powerful search bar to
              find recipes by cuisine, ingredient, or keyword. Whether
              you&apos;re craving Italian pasta, Mexican tacos, or a vegan
              curry, Culinary Compass has you covered. Let your culinary
              creativity soar!
            </Text>
            <Flex alignItems="center" maxWidth="600px" width="100%">
              <input
                type="text"
                placeholder="Search for recipes by cuisine, ingredient, or keyword"
                style={{
                  flex: "1",
                  padding: "12px",
                  borderRadius: "5px 0 0 5px",
                  border: "none",
                }}
              />
              <Button bg={"#FFCA3A"} borderRadius="0 5px 5px 0" px={8}>
                Find Recipes
              </Button>
            </Flex>
          </Flex>
        </Container>
      </Box>
      <Box py={20} bg="#f2f2f2">
        <Container maxW="container.xl">
          <Flex
            alignItems="center"
            justifyContent={{ base: "center", md: "space-between" }}
            flexDirection={{ base: "column-reverse", md: "row" }}
          >
            <Box maxW={{ base: "100%", md: "50%" }}>
              <Image
                src={chef_img}
                alt="A mouthwatering burger"
                borderRadius="xl"
              />
            </Box>
            <Flex flexDir={'column'} align={'center'}>
              <Heading size="xl" mb={4}>
                Discover New Flavors
              </Heading>
              <Text fontSize="lg" letterSpacing={1} w={[500,600]} textAlign={'center'}>
                Break free from the routine! Our extensive recipe collection
                caters to diverse dietary needs and preferences. Whether
                you&apos;re a dedicated vegetarian, a health-conscious foodie,
                or someone simply seeking new culinary experiences, we have
                something to ignite your passion. Find inspiration for weeknight
                meals, special occasion feasts, or themed culinary explorations.
              </Text>
              <Button bg={"#FFCA3A"} mt={8} as={Link} to="/all_recipes">
                Get Inspired
              </Button>
            </Flex>
          </Flex>
        </Container>
      </Box>
      {/* Footer */}
      <Box py={2} bg={"#0a303d"} color={"#fff"} letterSpacing={2}>
        <Container maxW="container.xl">
          <Text textAlign="center" fontSize={"sm"}>
            © 2024 Culinary Compass. All rights reserved.
          </Text>
        </Container>
      </Box>
    </Box>
  );
}
export default Home;
