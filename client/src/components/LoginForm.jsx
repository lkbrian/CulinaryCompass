// import React from "react";
import { Box, Heading, FormControl, FormLabel, Input, Button, Text, Link } from "@chakra-ui/react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const LoginForm = () => {
  return (
    <Box maxW="md" mx="auto" mt={8} p={8} borderWidth="1px" borderRadius="md">
      <Heading mb={4}>Login</Heading>
      <Formik
        initialValues={{ username: "", password: "" }}
        validationSchema={Yup.object({
          username: Yup.string().required("Username is required"),
          password: Yup.string().required("Password is required"),
        })}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            fetch('/api/login', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(values)
            })
            .then(response => {
              if (response.ok) {
                console.log('logged')
              } else {
                // Login failed, handle error
                console.error("Login failed. Please check your credentials.");
              }
            })
            .catch(error => {
              // Network error or other errors
              console.error("An error occurred. Please try again later.", error);
            })
            .finally(() => {
              setSubmitting(false);
            });
          }, 400);
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <Field name="username">
              {({ field }) => (
                <FormControl id="username" isInvalid={field.error && field.touched}>
                  <FormLabel>Username</FormLabel>
                  <Input {...field} type="text" />
                  <ErrorMessage name="username" component={Text} color="red.500" />
                </FormControl>
              )}
            </Field>
            <Field name="password">
              {({ field }) => (
                <FormControl id="password" mt={4} isInvalid={field.error && field.touched}>
                  <FormLabel>Password</FormLabel>
                  <Input {...field} type="password" />
                  <ErrorMessage name="password" component={Text} color="red.500" />
                </FormControl>
              )}
            </Field>
            <Button colorScheme="blue" mt={4} type="submit" isLoading={isSubmitting} loadingText="Logging in">
              Login
            </Button>
          </Form>
        )}
      </Formik>
      <Text mt={2}>
        Don&apos;t have an account? <Link color="blue.500">Sign up</Link>
      </Text>
    </Box>
  );
};

export default LoginForm;
