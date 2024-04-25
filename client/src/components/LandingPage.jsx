import { Box, Heading, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import Auth from "./Auth";
import { useNavigate } from "react-router-dom";
import wave from "../assets/wave.png"

function LandingPage() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSession = async () => {
      try {
        const response = await fetch("/check_session");
        if (response.ok) {
          const user = await response.json();
          setUser(user);
          navigate("/home"); 
        }
      } catch (error) {
        console.error("Error fetching session data:", error);
      }
    };

    fetchSession();
  }, [navigate]);


 console.log(user)
  return (
    <Box minH={"100vh"} bgImage={wave} bgRepeat={"no-repeat"} bgSize={'cover'} color={"#0a303d"} flexDir={"column"}>
      <Auth />
      <Box
        textAlign="center"
        display="flex"
        alignItems="center"
        justifyContent="center"
        flexDir={'column'}
        h={'40vh'}
      >
        <Heading size="xl">Welcome to Culinary Compass</Heading>
        <Text fontSize="lg" mt={4} w={["auto",600, 700, 800]} bg={"rgba(255, 255, 255, 0.86)"}letterSpacing={1} p={4} borderRadius={"md"}>
          Dive into a vast world of flavors, ingredients, and culinary delights
          with Culinary Compass. Our platform is your gateway to an endless
          journey of taste sensations and culinary adventures. Whether
          you&apos;re a seasoned chef or a kitchen novice, we&apos;re here to
          inspire and guide you every step of the way. Explore diverse cuisines
          from around the globe, discover new cooking techniques, and unleash
          your creativity in the kitchen. Join our community of food enthusiasts
          and embark on a gastronomic exploration like no other. Let your taste
          buds lead the way as you savor the essence of food culture.
        </Text>
      </Box>
    </Box>
  );
}

export default LandingPage;
