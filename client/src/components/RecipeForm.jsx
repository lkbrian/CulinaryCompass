import { Box, Heading, FormControl, FormLabel, Input, Textarea, Button, Text, Flex } from "@chakra-ui/react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const RecipeForm = () => {
  return (
    <Box maxW="xl" mx="auto" mt={8} p={8} borderWidth="1px" borderRadius="md">
      <Heading mb={4}>Create Recipe</Heading>
      <Formik
        initialValues={{
          title: "",
          description: "",
          instructions: "",
          cook_time: ""
        }}
        validationSchema={Yup.object({
          title: Yup.string().required("Title is required"),
          description: Yup.string().required("Description is required"),
          instructions: Yup.string().required("Instructions are required"),
          cook_time: Yup.string().required("Cook time is required")

        })}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            // You can send the form data to your backend API endpoint here
            // console.log(values);
            // setSubmitting(false);
            fetch('/api/create_recipes', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(values)
            })
            .then(response => {
              if (response.ok) {
                console.log('Succesfully created a recipee')
              } else {
                // Login failed, handle error
                console.error("Failed. Please check your credentials.");
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
            <Flex gap={2} justify={'center'}>
            <Field name="title">
              {({ field }) => (
                <FormControl id="title" mt={4} isInvalid={field.error && field.touched}>
                  <FormLabel>Title</FormLabel>
                  <Input {...field} type="text" />
                  <ErrorMessage name="title" component={Text} color="red.500" />
                </FormControl>
              )}
            </Field>
            <Field name="cook_time">
              {({ field }) => (
                <FormControl id="cook_time" mt={4} isInvalid={field.error && field.touched}>
                  <FormLabel>Cook Time (minutes)</FormLabel>
                  <Input {...field} type="text" />
                  <ErrorMessage name="cook_time" component={Text} color="red.500" />
                </FormControl>
              )}
            </Field>
            </Flex>
            <Field name="description">
              {({ field }) => (
                <FormControl id="description" mt={4} isInvalid={field.error && field.touched}>
                  <FormLabel>Description</FormLabel>
                  <Textarea {...field} />
                  <ErrorMessage name="description" component={Text} color="red.500" />
                </FormControl>
              )}
            </Field>
            <Field name="instructions">
              {({ field }) => (
                <FormControl id="instructions" mt={4} isInvalid={field.error && field.touched}>
                  <FormLabel>Instructions</FormLabel>
                  <Textarea {...field} />
                  <ErrorMessage name="instructions" component={Text} color="red.500" />
                </FormControl>
              )}
            </Field>

            <Button colorScheme="blue" mt={4} type="submit" isLoading={isSubmitting} loadingText="Submitting">
              Create Recipe
            </Button>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default RecipeForm;
