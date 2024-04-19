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
import { MdOutlineFavorite } from "react-icons/md";
import { BsFillBookmarksFill } from "react-icons/bs";
import { SiClockify } from "react-icons/si";
import banner from "../assets/banner.jpg";

function RecipeByID() {
  const [item, setItem] = useState(null);
  const [isloading, setIsLoading] = useState(true);
  const [favorite, setFavorite] = useState(() => {
    return localStorage.getItem("favorite") === "true";
  });
  const [collection, setCollection] = useState(() => {
    return localStorage.getItem("collection") === "true";
  });

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
  // console.log(item);

  useEffect(() => {
    localStorage.setItem("favorite", favorite);
    localStorage.setItem("collection", collection);
  }, [favorite, collection]);

  ///Toogle from liked to unlike & sends a PATCH request
  async function handleToggleFavouriteClick() {
    try {
      const newFavorite = !favorite; // variable that toggle the favorite status
      const res = await fetch(`/api/recipes/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ favorite: newFavorite }),
      });
      if (!res.ok) {
        throw new Error(`HTTP Error ! status: ${res.status}`);
      }

      setFavorite(newFavorite);
    } catch (err) {
      console.error(err.message);
    }
  }
  // collection's patch
  async function handleToggleCollectionClick() {
    try {
      const newCollection = !collection; // variable that toggle the collection status
      const res = await fetch(`/api/recipes/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ collection: newCollection }),
      });
      if (!res.ok) {
        throw new Error(`HTTP Error ! status: ${res.status}`);
      }

      setCollection(newCollection);
    } catch (err) {
      console.error(err.message);
    }
  }

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
          >
            <Image
              src={banner}
              w="100%"
              h="100%"
              borderRadius={"md"}
              objectFit={"cover"}
            />
          </Box>
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
                <button onClick={handleToggleFavouriteClick}>
                  <MdOutlineFavorite
                    size="1.7rem"
                    color={favorite ? "red" : "black"}
                  />
                </button>

                <button onClick={handleToggleCollectionClick}>
                  <BsFillBookmarksFill
                    size={"1.7rem"}
                    color={collection ? "	#1DA1F2" : "black"}
                  />
                </button>
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
