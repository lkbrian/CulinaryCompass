import { Box, Heading } from "@chakra-ui/react";

function Navbar() {
  return (
    <Box bg={'#111'}>
      <Heading
        bg="url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTNplZLxNdSpq5tiske32OJrs7GKcLth0NbIQ&s') center/cover no-repeat"
        color="white"
        textAlign="center"
        bgClip="text"
      >
        Culinary Compass
      </Heading>
    </Box>
  );
}

export default Navbar;
