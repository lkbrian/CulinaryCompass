import { signupValidationSchema, loginValidationSchema } from "./Schema";
import {
  Box,
  useToast,
  Button,
  ButtonGroup,
  FormControl,
  FormErrorMessage,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Stack,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { Field, Form, Formik } from "formik";
import {
  AtSignIcon,
  EmailIcon,
  LockIcon,
  ViewIcon,
  ViewOffIcon,
} from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function UserAuth() {
  const navigate = useNavigate();
  //modal states
  const [showPassword, setShowPassword] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  const handleTogglePassword = () => setShowPassword(!showPassword);

  // active form states
  const [activeForm, setActiveForm] = useState("signup");

  const signUpInitialValues = {
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const loginInitialValues = {
    username: "",
    password: "",
  };

  // Toast notification function
  const showToast = (name) => {
    toast({
      title: `Account created, ${name}!`,
      description: "We've created your account for you.",
      status: "info",
      duration: 5000,
      isClosable: true,
      position: "top",
    });
  };

const showToastLogIn = (username) => {
  const name = username || "User"; // Use a default name if username is null
  toast({
    title: `${name}, Welcome!`,
    description: "You've successfully logged in.",
    status: "info",
    duration: 5000,
    isClosable: true,
    position: "top",
  });
};

const api = import.meta.env.VITE_API_URL

  const handleSubmit = async (values, actions) => {

    const apiUrl = activeForm === "signup" ? `${api}/signup` : `${api}/login`;
    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      // Parse the JSON response
      const responseData = await response.json();

      // Check if the request was successful
      if (response.ok) {
        // Handle successful login/signup
        if (activeForm === "signup") {
          // Call showToast for sign-up
          showToast(responseData.username);
        } else {
          // Call showToastLogIn for login
          showToastLogIn(responseData.username);
          navigate("/all_recipes");
          window.location.reload();
        }
        // console.log(
        //   activeForm === "signup" ? "Signup" : "Login",
        //   "successful:",
        //   responseData
        // );
        // Reset form and close the modal

        actions.resetForm();
        onClose();
      } else {
        // Handle errors
        console.error(
          activeForm === "signup" ? "Signup" : "Login",
          "failed:",
          responseData.error
        );
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      actions.setSubmitting(false);
    }
  };

  const handleFormChange = (formType) => {
    setActiveForm(formType);
    onOpen();
  };

  return (
    <Box>
      <ButtonGroup>
        <Button bg="#FFCA3A" onClick={() => handleFormChange("signup")}>
          Sign up
        </Button>
        <Button bg="#FFCA3A" onClick={() => handleFormChange("login")}>
          Login
        </Button>
      </ButtonGroup>

      <Modal isOpen={isOpen} onClose={onClose} alignItems={"center"}>
        <ModalOverlay />
        <ModalContent
          bg={"#0a303d"}
          color={"#e4e4e4"}
          minH={{ base: "auto", md: "400px" }}
          display={"flex"}
          justify={"center"}
        >
          <ModalHeader textAlign={"center"} color={"#FFCA3A"}>
            {activeForm === "signup" ? "Signup" : "Login"}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Formik
              initialValues={
                activeForm === "signup"
                  ? signUpInitialValues
                  : loginInitialValues
              }
              validationSchema={
                activeForm === "signup"
                  ? signupValidationSchema
                  : loginValidationSchema
              }
              onSubmit={handleSubmit}
            >
              {({ isSubmitting }) => (
                <Form>
                  <Stack direction={"column"} spacing={8}>
                    <Field name="username">
                      {({ field, form }) => (
                        <FormControl
                          isInvalid={
                            form.errors.username && form.touched.username
                          }
                        >
                          <InputGroup>
                            <InputLeftElement pointerEvents="none">
                              <AtSignIcon color="gray.400" />
                            </InputLeftElement>
                            <Input
                              errorBorderColor="crimson"
                              focusBorderColor={"#FFCA3A"}
                              placeholder="Username"
                              {...field}
                            />
                          </InputGroup>
                          <FormErrorMessage color="crimson">
                            {form.errors.username &&
                              form.touched.username &&
                              form.errors.username}
                          </FormErrorMessage>
                        </FormControl>
                      )}
                    </Field>
                    {activeForm === "signup" && (
                      <Field name="email">
                        {({ field, form }) => (
                          <FormControl
                            isInvalid={form.errors.email && form.touched.email}
                          >
                            <InputGroup>
                              <InputLeftElement pointerEvents="none">
                                <EmailIcon color="gray.400" />
                              </InputLeftElement>
                              <Input
                                errorBorderColor="crimson"
                                focusBorderColor={"#FFCA3A"}
                                placeholder="Email"
                                {...field}
                              />
                            </InputGroup>
                            <FormErrorMessage color="crimson">
                              {form.errors.email &&
                                form.touched.email &&
                                form.errors.email}
                            </FormErrorMessage>
                          </FormControl>
                        )}
                      </Field>
                    )}
                    <Field name="password">
                      {({ field, form }) => (
                        <FormControl
                          isInvalid={
                            form.errors.password && form.touched.password
                          }
                        >
                          <InputGroup>
                            <InputLeftElement pointerEvents="none">
                              <LockIcon color="gray.400" />
                            </InputLeftElement>
                            <Input
                              errorBorderColor="crimson"
                              focusBorderColor={"#FFCA3A"}
                              placeholder="Password"
                              {...field}
                              type={showPassword ? "text" : "password"}
                            />
                            <InputRightElement width="4.5rem">
                              <Box
                                h="1.75rem"
                                size="sm"
                                onClick={handleTogglePassword}
                              >
                                {showPassword ? <ViewOffIcon /> : <ViewIcon />}
                              </Box>
                            </InputRightElement>
                          </InputGroup>
                          <FormErrorMessage color="crimson">
                            {form.errors.password &&
                              form.touched.password &&
                              form.errors.password}
                          </FormErrorMessage>
                        </FormControl>
                      )}
                    </Field>
                    {activeForm === "signup" && (
                      <Field name="confirmPassword">
                        {({ field, form }) => (
                          <FormControl
                            isInvalid={
                              form.errors.confirmPassword &&
                              form.touched.confirmPassword
                            }
                          >
                            <InputGroup>
                              <InputLeftElement pointerEvents="none">
                                <LockIcon color="gray.400" />
                              </InputLeftElement>
                              <Input
                                errorBorderColor="crimson"
                                focusBorderColor={"#FFCA3A"}
                                placeholder="Confirm Password"
                                {...field}
                                type={showPassword ? "text" : "password"}
                              />
                              <InputRightElement width="4.5rem">
                                <Box
                                  h="1.75rem"
                                  size="sm"
                                  onClick={handleTogglePassword}
                                >
                                  {showPassword ? (
                                    <ViewOffIcon />
                                  ) : (
                                    <ViewIcon />
                                  )}
                                </Box>
                              </InputRightElement>
                            </InputGroup>
                            <FormErrorMessage color="crimson">
                              {form.errors.confirmPassword &&
                                form.touched.confirmPassword &&
                                form.errors.confirmPassword}
                            </FormErrorMessage>
                          </FormControl>
                        )}
                      </Field>
                    )}
                    <Box fontSize="sm">
                      {activeForm === "signup" ? (
                        <Text>
                          Already have an account?
                          <span
                            onClick={() => handleFormChange("signin")}
                            cursor={"pointer"}
                            textDecoration={"underline"}
                          >
                            Sign in
                          </span>{" "}
                          instead
                        </Text>
                      ) : (
                        <Text>
                          Don't have an account?{" "}
                          <span
                            onClick={() => handleFormChange("signup")}
                            cursor={"pointer"}
                            textDecoration={"underline"}
                          >
                            Sign up
                          </span>
                        </Text>
                      )}
                    </Box>
                    <Button
                      alignSelf={"center"}
                      w={"150px"}
                      bg={"#FFCA3A"}
                      type="submit"
                      variant={"ghost"}
                      _hover={{ background: "#FFCA3A" }}
                      isLoading={isSubmitting}
                    >
                      {activeForm === "signup" ? "Signup" : "Login"}
                    </Button>
                  </Stack>
                </Form>
              )}
            </Formik>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
}

export default UserAuth;
