import {
  Box,
  Flex,
  Text,
  Heading,
  ListItem,
  UnorderedList,
  Image,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { BeatLoader } from "react-spinners";
import { AiFillHeart } from "react-icons/ai";
import { BsBookmarksFill } from "react-icons/bs";
import { SiClockify } from "react-icons/si";
import banner from '../assets/banner.jpg'

function RecipeByID() {
  const [item, setItem] = useState(null);
  const [isloading, setIsLoading] = useState(true);
  const { id } = useParams();
  const url = `/api/recipes/${id}`;
  useEffect(() => {
    const singleRecipe = async () => {
      try {
        const res = await fetch(url);
        if (!res.ok) throw new Error(`HTTP Error ! status: ${res.status}`);
        const data = await res.json();
        setItem(data);
        setIsLoading(false);
      } catch (err) {
        console.error(err.message);
      }
    };
    singleRecipe();
  }, [url]);
  console.log(item);
  return (
    <>
      {isloading ? (
        <Flex
          flexDir={"column"}
          alignItems={"center"}
          justifyContent={"center"}
          textAlign={"center"}
          w={"100%"}
          h={"80vh"}
          gap={10}
        >
          <BeatLoader color="#FFCA3A" />
          <Text fontWeight={500}>Please wait.Recipe data is loading</Text>
        </Flex>
      ) : (
        <>
          <Box
            boxShadow={"rgba(0, 0, 0, 0.24) 0px 3px 8px"}
            maxW={{ base: "80vw", md: "50vw" }}
            h={200}
            m={"auto"}
            mt={10}           
          ><Image src={banner} w="100%" h="100%" borderRadius={'md'} objectFit={'cover'}/></Box>
          <Box
            borderRadius={"md"}
            boxShadow={"rgba(0, 0, 0, 0.24) 0px 3px 8px"}
            maxW={{ base: "80vw", md: "50vw" }}
            m={"auto"}
            mt={4}
            p={4}
            display={"flex"}
            flexDir={"column"}
            gap={3}
          >
            <Flex justify={"space-between"}>
              <Heading letterSpacing={1} fontSize={"2xl"}>
                {item.title}
              </Heading>
              <Flex gap={6}>
                <AiFillHeart size={"2rem"} />{" "}
                <BsBookmarksFill size={"1.7rem"} />
              </Flex>
            </Flex>
            <Flex gap={4} letterSpacing={1}>
              <Text fontSize={".8rem"}>Category: Breakfast, Lunch, Dinner</Text>
              <Text fontSize={".8rem"}>Tags: Gluten free</Text>
            </Flex>
            <Box>
              <Heading letterSpacing={2} fontSize={"xl"}>
                Ingredients
              </Heading>
              <UnorderedList>
                {item.ingredients.map((ing) => (
                  <ListItem key={ing.id}>{ing.name}</ListItem>
                ))}
              </UnorderedList>
            </Box>
            <Heading letterSpacing={2} fontSize={"xl"}>
              Instructions
            </Heading>
            <Text>{item.instructions}</Text>
            <Heading letterSpacing={2} fontSize={"xl"}>
              Cook time
            </Heading>
            <Flex alignItems={"center"} gap={4}>
              <SiClockify />
              <Text>{item.cook_time}</Text>
            </Flex>
            <Flex gap={4} align={"center"} float={"right"}>
              <Image
                borderRadius="full"
                boxSize="40px"
                src={item.user.img_url}
                alt={item.user.username}
              />{" "}
              <Text>{item.user.username}</Text>
            </Flex>
          </Box>
        </>
      )}
    </>
  );
}

export default RecipeByID;
