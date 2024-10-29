// src/features/auth/RegisterForm.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { register } from "../../features/auth/authOperations";

const RegisterForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const initialValues = { email: "", password: "", confirmPassword: "" };

  // Schema de validare
  const validationSchema = Yup.object({
    email: Yup.string().email("Email invalid").required("Emailul este necesar"),
    password: Yup.string()
      .min(6, "Parola trebuie să aibă minim 6 caractere")
      .required("Parola este necesară"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Parolele nu se potrivesc")
      .required("Confirmarea parolei este necesară"),
  });

  const onSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      await dispatch(
        register({ email: values.email, password: values.password })
      ).unwrap();
      alert("Înregistrare reușită! Te rugăm să te autentifici.");
      resetForm();
      navigate("/login");
    } catch (error) {
      alert("Înregistrarea a eșuat. Te rugăm să încerci din nou.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            <div>
              <Field type="email" name="email" placeholder="Email" />
              <ErrorMessage name="email" component="div" />
            </div>
            <div>
              <Field type="password" name="password" placeholder="Password" />
              <ErrorMessage name="password" component="div" />
            </div>
            <div>
              <Field
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
              />
              <ErrorMessage name="confirmPassword" component="div" />
            </div>
            <button type="submit" disabled={isSubmitting}>
              Register
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default RegisterForm;
