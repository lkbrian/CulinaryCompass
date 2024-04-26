import { Box, Flex, Img, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { BounceLoader } from "react-spinners";
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
          <BounceLoader color="#FFCA3A" />
          <Text fontWeight={500}>Please wait.Recipe data is loading</Text>
        </Flex>
      ) : (
        <Flex flexDir={"row"} flexWrap={"wrap"} m={"auto"} ml={10}  gap={10}>
          {recipes.map((recipe) => (
            <Box
              key={recipe.id}
              background={"#fff"}
              borderRadius={"md"}
              boxShadow={"rgba(0, 0, 0, 0.24) 0px 3px 8px"}
              as={Link}
              to={`/all_recipes/${recipe.id}`}
              w={"400px"}
              h={"400px"} // Set a fixed height for uniformity
              overflow={"hidden"} // Hide overflowing content
            >
              <Box h={"60%"} overflow={"hidden"}>
                <Img
                  w={"100%"}
                  h={"100%"}
                  objectFit={"cover"}
                  src={recipe.img_url}
                />
              </Box>
              <Box h={"40%"} p={4}>
                <Text
                  fontSize={"1.6rem"}
                  fontWeight={600}
                  mb={2}
                  overflow={"hidden"}
                  textOverflow={"ellipsis"}
                  whiteSpace={"nowrap"}
                >
                  {recipe.title}
                </Text>
                <Text
                  fontSize={".8rem"}
                >
                  {recipe.description}
                </Text>
              </Box>
            </Box>
          ))}
        </Flex>
      )}
    </Box>
  );
}

export default Recipes;
