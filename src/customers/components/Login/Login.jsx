import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import {
  Button,
  TextField,
  Typography,
  CssBaseline,
  Container,
  Box,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginUser } from "../../../State/Authentication/Action";
import VideoBackground from "../VideoBackground/VideoBackground";

const initialValues = {
  email: "",
  password: "",
};

const validationSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  password: Yup.string().required("Password is required"),
});

const LoginForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = (values) => {
    console.log("Login form values:", values);
    // navigate("/burgerani");
    dispatch(loginUser({ data: values, navigate }));
  };

  return (
    <VideoBackground>
      <Container style={styles.container}>
        <CssBaseline />
        <Box style={styles.formWrapper}>
          <Typography style={styles.header} component="h1" variant="h5">
            Login
          </Typography>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            <Form>
              <Field
                as={TextField}
                variant="outlined"
                margin="normal"
                fullWidth
                label="Email Address"
                name="email"
                id="email"
                autoComplete="email"
                helperText={<ErrorMessage name="email" />}
                style={styles.field}
              />
              <Field
                as={TextField}
                variant="outlined"
                margin="normal"
                fullWidth
                label="Password"
                name="password"
                type="password"
                id="password"
                autoComplete="current-password"
                helperText={<ErrorMessage name="password" />}
                style={styles.field}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                style={styles.button}
                // onClick={()=>navigate("/burgerani")}
              >
                Login
              </Button>
            </Form>
          </Formik>
          <Typography style={styles.footer} variant="body2" align="center">
            Don't have an account?{" "}
            <Button onClick={() => navigate("/account/register")}>
              Register
            </Button>
          </Typography>
        </Box>
      </Container>
    </VideoBackground>
  );
};

const styles = {
  container: {
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: '#f0f0f0', // Background color of the page
    padding: 0,
    margin: 0,
  },
  formWrapper: {
    width: '100%',
    maxWidth: '400px', // Adjust the max-width as needed
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '8px',
    // boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  header: {
    marginBottom: '20px',
  },
  field: {
    marginBottom: '15px',
  },
  button: {
    marginTop: '20px',
    padding: '1rem',
  },
  footer: {
    marginTop: '20px',
  },
};

export default LoginForm;
