import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import {
  Button,
  TextField,
  Typography,
  CssBaseline,
  Container,
  MenuItem,
  Select,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { registerUser } from "../../../State/Authentication/Action";
import VideoBackground from "../VideoBackground/VideoBackground"; // Import the VideoBackground component

const initialValues = {
  fullName: "",
  email: "",
  password: "",
  role: "ROLE_CUSTOMER",
};

const validationSchema = Yup.object({
  fullName: Yup.string().required("Full Name is required"),
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 8 characters")
    .required("Password is required"),
  role: Yup.string().required("Type is required"),
});

const RegistrationForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (values) => {
    console.log("Form values:", values);
    dispatch(registerUser({ userData: values, navigate }));
  };

  return (
    <VideoBackground>
      <Container style={styles.container}>
        <CssBaseline />
        <div style={styles.formWrapper}>
          <Typography style={styles.header} variant="h5">
            Register
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
                label="Full Name"
                name="fullName"
                id="fullName"
                autoComplete="fullName"
                helperText={<ErrorMessage name="fullName" />}
                style={styles.field}
              />
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
                helperText={<ErrorMessage name="password" />}
                style={styles.field}
              />
              <Field
                as={Select}
                variant="outlined"
                margin="normal"
                fullWidth
                name="role"
                id="role"
                style={styles.field}
              >
                <MenuItem value="ROLE_CUSTOMER">Customer</MenuItem>
                <MenuItem value="ROLE_RESTAURANT_OWNER">Restaurant Owner</MenuItem>
              </Field>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                style={styles.button}
              >
                Register
              </Button>
            </Form>
          </Formik>
          <Typography variant="body2" align="center" style={styles.footer}>
            Already have an account?{" "}
            <Button onClick={() => navigate("/account/login")}>Login</Button><br/>
            <Button onClick={() => navigate("/account/reset-password-request")}>
              Forgot Password
            </Button>
          </Typography>
        </div>
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
    padding: 0,
    margin: 0,
  },
  formWrapper: {
    width: '80%',
    maxWidth: '400px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
  },
  header: {
    textAlign: 'center',
    marginBottom: '20px',
  },
  field: {
    marginBottom: '15px',
  },
  button: {
    marginTop: '20px',
  },
  footer: {
    marginTop: '20px',
  },
};

export default RegistrationForm;
