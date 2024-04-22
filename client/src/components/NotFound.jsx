import { Box, Heading, Text, Container, Flex } from "@chakra-ui/react";
import { keyframes } from "@emotion/react";
import { Link } from "react-router-dom";

const bounce = keyframes`
  0%, 20%, 50%, 80%, 100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-30px);
  }
  60% {
    transform: translateY(-15px);
  }
`;

const NotFound = () => {
  return (
    <Box minH={"100vh"} bg={"#fff"} color={"#0a303d"}>
      <Container maxW="container.xl">
        <Flex
          alignItems="center"
          justifyContent="center"
          flexDirection="column"
          height="100%"
        >
          <Heading size="2xl" textAlign="center" mb={4}>
            404 - Page Not Found
          </Heading>
          <Text fontSize="lg" textAlign="center" mb={8}>
            Oops! The page you are looking for does not exist.
          </Text>
          <Link to="/" style={{ textDecoration: "none" }}>
            <Box
              as="button"
              bg="#FFCA3A"
              color="#0a303d"
              px={8}
              py={4}
              borderRadius={8}
              fontWeight="bold"
              fontSize="lg"
              cursor="pointer"
              animation={`${bounce} 1s infinite`}
              _hover={{ bg: "#FFCA3A" }}
            >
              Go Home
            </Box>
          </Link>
        </Flex>
      </Container>
    </Box>
  );
};

export default NotFound;
