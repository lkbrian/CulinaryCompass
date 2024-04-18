import { Box, Flex, Image, Text } from "@chakra-ui/react";
import { SessionContext } from "./SessionContext";
import { useContext } from "react";

function UserProfile() {
  const { user } = useContext(SessionContext);
console.log(user)
  return (
    <Box
      m={"auto"}
      mt={8}
      w={"80vw"}
      boxShadow={"rgba(0, 0, 0, 0.24) 0px 3px 8px"}
    >
      <Flex>
        <Box>
          <Image src='oiyoy.png' alt/> <Text>{user.username}</Text>
        </Box>
      </Flex>
    </Box>
  );
}

export default UserProfile;
