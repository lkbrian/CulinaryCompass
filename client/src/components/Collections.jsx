import React, { useEffect, useState } from "react";
import { Box, Text, Img, Flex } from "@chakra-ui/react";
import { BsArrowLeftCircleFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";

const Collections = () => {
  const [data, setData] = useState();
  const api = import.meta.env.VITE_API_URL;
  const apiUrl = `${api}/collections`;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(apiUrl);
        if (!response.ok)
          throw new Error(`HTTP Error ! status : ${response.error} `);
        const data = await response.json();
        setData(data);
      } catch (error) {
        console.error(error.message);
      }
    };
    fetchData();
  }, []);

  return (
    <Box>
      <Navbar/>
      <Flex flexDir={"row"} flexWrap={"wrap"} m={"auto"} ml={10} gap={10}>
        {data && data.length > 0 ? (
          data.map((recipe) => (
            <Box
              key={recipe.id}
              as={Link}
              to={`/all_recipes/${recipe.id}`}
              background={"#fff"}
              borderRadius={"md"}
              boxShadow={"rgba(0, 0, 0, 0.24) 0px 3px 8px"}
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
                <Text fontSize={".8rem"}>{recipe.description}</Text>
              </Box>
            </Box>
          ))
        ) : (
          <Flex
            mt={8}
            alignItems={"center"}
            flexDirection={"column"}
            justifyContent={"center"}
          >
            <Text>No recipes in your collection.</Text>
          </Flex>
        )}
      </Flex>
    </Box>
  );
};

export default Collections;
