import * as Yup from "yup";

export const signupValidationSchema = Yup.object().shape({
  username: Yup.string()
    .label("please enter a username")
    .min(2, "Too Short!")
    .max(70, "Too Long!")
    .required("please enter a username"),
  email: Yup.string()
    .email("Please enter a valid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(7)
    .required("Please Enter your password")
    .matches(
      /^(?=.*[A-Z])(?=.*[a-z]{4})(?=.*\d{2}).{7}$/,
      "Must Contain  7 characters ,1 uppercase letter,4 lowercase letters & 2 numeric digits"
    ),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "password must match")
    .required("please confirm your password"),
});

export const loginValidationSchema = Yup.object().shape({
    username: Yup.string().label("Please enter your username").required("Username is required"),
    password: Yup.string()
        .required("Please enter your password")
        // .matches(
        //     /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        //     "Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number, and one special character"
        // ),
});

