import { Box, Heading, FormControl, FormLabel, Input, Textarea, Button, Text, Flex } from "@chakra-ui/react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Navbar from "./Navbar";

const RecipeForm = () => {
  return (
    <>
      <Navbar />
      <Box
        maxW="xl"
        mx={{ base: "20px", md: "auto" }}
        mt={8}
        p={8}
        borderWidth="1px"
        borderRadius="md"
      >
        <Heading mb={4}>Create Recipe</Heading>
        <Formik
          initialValues={{
            title: "",
            description: "",
            instructions: "",
            cook_time: "",
            ingredients: "", // Added ingredients field
          }}
          validationSchema={Yup.object({
            title: Yup.string().required("Title is required"),
            description: Yup.string().required("Description is required"),
            instructions: Yup.string().required("Instructions are required"),
            cook_time: Yup.string().required("Cook time is required"),
            ingredients: Yup.string().required("Ingredients are required"), // Validate ingredients field
          })}
          onSubmit={(values, { setSubmitting }) => {
            // Extract ingredients from values
            const { ingredients, ...recipeData } = values;

            // Submit recipe data
            fetch("/api/recipes", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(recipeData),
            })
              .then((response) => {
                if (response.ok) {
                  console.log("Successfully created a recipe");
                  // If recipe submission succeeds, submit ingredients
                  return fetch("/api/ingredients", {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ ingredients }),
                  });
                } else {
                  // Recipe submission failed, handle error
                  console.error("Failed to create recipe. Please try again later.");
                  throw new Error("Failed to create recipe.");
                }
              })
              .then((response) => {
                if (response.ok) {
                  console.log("Successfully added ingredients");
                } else {
                  // Ingredient submission failed, handle error
                  console.error("Failed to add ingredients. Please try again later.");
                  throw new Error("Failed to add ingredients.");
                }
              })
              .catch((error) => {
                // Handle any errors
                console.error("An error occurred:", error);
              })
              .finally(() => {
                setSubmitting(false);
              });
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              <Flex gap={2} align={"center"} justify={"center"}>
                <Field name="title">
                  {({ field }) => (
                    <FormControl
                      id="title"
                      mt={4}
                      isInvalid={field.error && field.touched}
                    >
                      <FormLabel>Title</FormLabel>
                      <Input {...field} type="text" />
                      <ErrorMessage
                        name="title"
                        component={Text}
                        color="red.500"
                      />
                    </FormControl>
                  )}
                </Field>
                <Field name="cook_time">
                  {({ field }) => (
                    <FormControl
                      id="cook_time"
                      mt={4}
                      isInvalid={field.error && field.touched}
                    >
                      <FormLabel>Cook Time (minutes)</FormLabel>
                      <Input {...field} type="text" />
                      <ErrorMessage
                        name="cook_time"
                        component={Text}
                        color="red.500"
                      />
                    </FormControl>
                  )}
                </Field>
              </Flex>
              <Field name="description">
                {({ field }) => (
                  <FormControl
                    id="description"
                    mt={4}
                    isInvalid={field.error && field.touched}
                  >
                    <FormLabel>Description</FormLabel>
                    <Textarea {...field} />
                    <ErrorMessage
                      name="description"
                      component={Text}
                      color="red.500"
                    />
                  </FormControl>
                )}
              </Field>
              <Field name="ingredients">
                {({ field }) => (
                  <FormControl
                    id="ingredients"
                    mt={4}
                    isInvalid={field.error && field.touched}
                  >
                    <FormLabel>Ingredients</FormLabel>
                    <Textarea {...field} />
                    <ErrorMessage
                      name="ingredients"
                      component={Text}
                      color="red.500"
                    />
                  </FormControl>
                )}
              </Field>
              <Field name="instructions">
                {({ field }) => (
                  <FormControl
                    id="instructions"
                    mt={4}
                    isInvalid={field.error && field.touched}
                  >
                    <FormLabel>Instructions</FormLabel>
                    <Textarea {...field} />
                    <ErrorMessage
                      name="instructions"
                      component={Text}
                      color="red.500"
                    />
                  </FormControl>
                )}
              </Field>

              <Button
                colorScheme="blue"
                mt={4}
                type="submit"
                isLoading={isSubmitting}
                loadingText="Submitting"
              >
                Create Recipe
              </Button>
            </Form>
          )}
        </Formik>
      </Box>
    </>
  );
};

export default RecipeForm;
