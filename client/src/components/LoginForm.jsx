import  { useState } from "react";
import { Box, Heading, FormControl, FormLabel, Input, Button, Text, Link } from "@chakra-ui/react";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true);
    fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: username,
        password: password
      })
    })
    .then(response => {
      if (response.ok) {
        console.log('logged')
      } else {
        // Login failed, handle error
        setError("Login failed. Please check your credentials.");
      }
    })
    .catch(error => {
      // Network error or other errors

      setError("An error occurred. Please try again later.",error);
    })
    .finally(() => {
      setLoading(false);
    });
  };

  return (
    <Box maxW="md" mx="auto" mt={8} p={8} borderWidth="1px" borderRadius="md">
      <Heading mb={4}>Login</Heading>
      <form onSubmit={handleSubmit}>
        <FormControl id="username" isRequired>
          <FormLabel>Username</FormLabel>
          <Input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        </FormControl>
        <FormControl id="password" mt={4} isRequired>
          <FormLabel>Password</FormLabel>
          <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </FormControl>
        {error && <Text color="red.500" mt={2}>{error}</Text>}
        <Button colorScheme="blue" mt={4} type="submit" isLoading={loading} loadingText="Logging in">
          Login
        </Button>
      </form>
      <Text mt={2}>
        Don&apos;t have an account? <Link color="blue.500">Sign up</Link>
      </Text>
    </Box>
  );
};

export default LoginForm;
