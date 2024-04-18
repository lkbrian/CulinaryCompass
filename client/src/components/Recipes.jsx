import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { HashLoader } from "react-spinners";
import Navbar from "./Navbar";
import { Link } from "react-router-dom";

function Recipes() {
  const url = "/api/recipes";
  const [recipes, setRecipes] = useState(null);
  const [loadstate, setLoadState] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      const fetchRecipes = async () => {
        try {
          const response = await fetch(url);
          if (!response.ok)
            throw new Error(`HTTP Error ! status: ${response.status}`);
          const data = await response.json();
          setRecipes(data);
          setLoadState(false);
        } catch (error) {
          console.error(error.message);
        }
      };
      fetchRecipes();
    }, 1000);
  }, [url]);
  console.log(recipes);

  return (
    <Box letterSpacing={2}>
      <Navbar />

      {loadstate ? (
        <Flex
          flexDir={"column"}
          alignItems={"center"}
          justifyContent={"center"}
          textAlign={"center"}
          w={"100%"}
          h={"80vh"}
          gap={10}
        >
          <HashLoader color="#FFCA3A" />
          <Text fontWeight={500}>Please wait.Recipe data is loading</Text>
        </Flex>
      ) : (
        <Flex flexDir={"column"} m={"auto"} p={"20px"} maxW={{ base: "90vw", md: "70vw" }}gap={4}>
          <Flex justify={"space between"}>
            <Heading textAlign={"center"} fontSize={"1.5rem"}>
              Recipes Available
            </Heading>
          </Flex>
          {recipes.map((recipe) => (
            <Box
              key={recipe.id}
              background={"#fff"}
              borderRadius={"md"}
              minH={"80px"}
              boxShadow={"rgba(0, 0, 0, 0.24) 0px 3px 8px"}
              pl={7}
              py={5}
              as={Link}
              to={`/all_recipes/${recipe.id}`}
              //   align={"center"}
            >
              <Box w={"75%"}>
                <Text fontSize={"1.6rem"} fontWeight={600}>
                  {recipe.title}
                </Text>
                <Text fontSize={".8rem"}w={[300,400]}>{recipe.cook_time}</Text>
              </Box>
            </Box>
          ))}
        </Flex>
      )}
    </Box>
  );
}

export default Recipes;
