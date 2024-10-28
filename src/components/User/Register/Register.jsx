import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import styles from "./Register.module.css";
import Logo from "../../../../public/Logo.svg";
import axios from "axios";

const API_URL = "https://671fb877e7a5792f052f531b.mockapi.io/users"; // Înlocuiește cu URL-ul tău

function Register() {
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Name is required"),
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .max(12, "Password must be less than 12 characters")
        .required("Password is required"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password"), null], "Passwords must match")
        .required("Please confirm your password"),
    }),
    onSubmit: async (values) => {
      try {
        // Obține toți utilizatorii din Mockapi.io
        const response = await axios.get(API_URL);

        // Verifică local dacă emailul există deja
        const userExists = response.data.some(
          (user) => user.email === values.email
        );

        if (userExists) {
          setError("Email is already registered");
        } else {
          const newUser = {
            username: values.name,
            email: values.email,
            password: values.password,
            token: `mockToken-${Math.random().toString(36).substr(2)}`,
          };
          await axios.post(API_URL, newUser);
          navigate("/login");
        }
      } catch (error) {
        setError("Something went wrong. Please try again.");
      }
    },
  });

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className={styles.customBackground}>
      <div className={styles.containerRegister}>
        <img src={Logo} alt="Logo" className={styles.logoImage} />
        <div className={styles.customCard}>
          <div className={styles.customCardBody}>
            <div>
              <button className={styles.customBackButton} onClick={handleBack}>
                <span className={styles.customBackIcon}></span> Back
              </button>
            </div>

            <div className={styles.rowPosition}>
              <form onSubmit={formik.handleSubmit}>
                <div>
                  <p className={styles.customTitle}>Register</p>

                  <div className={styles.inputWrapper}>
                    <input
                      placeholder=" "
                      type="text"
                      className={styles.customInput}
                      id="name" // Atribuie un id unic
                      name="name"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.name}
                    />
                    <label htmlFor="name" className={styles.customLabel}>
                      Your Name
                    </label>
                    {formik.touched.name && formik.errors.name && (
                      <div className={styles.error}>{formik.errors.name}</div>
                    )}
                  </div>

                  <div className={styles.inputWrapper}>
                    <input
                      placeholder=" "
                      type="email"
                      className={styles.customInput}
                      id="email" // Atribuie un id unic
                      name="email"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.email}
                    />
                    <label htmlFor="email" className={styles.customLabel}>
                      Your Email
                    </label>
                    {formik.touched.email && formik.errors.email && (
                      <div className={styles.error}>{formik.errors.email}</div>
                    )}
                  </div>

                  <div className={styles.inputWrapper}>
                    <input
                      placeholder=" "
                      type="password"
                      className={styles.customInput}
                      id="password" // Atribuie un id unic
                      name="password"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.password}
                    />
                    <label htmlFor="password" className={styles.customLabel}>
                      Password
                    </label>
                    {formik.touched.password && formik.errors.password && (
                      <div className={styles.error}>
                        {formik.errors.password}
                      </div>
                    )}
                  </div>

                  <div className={styles.inputWrapper}>
                    <input
                      placeholder=" "
                      type="password"
                      className={styles.customInput}
                      id="confirmPassword" // Atribuie un id unic
                      name="confirmPassword"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.confirmPassword}
                    />
                    <label
                      htmlFor="confirmPassword"
                      className={styles.customLabel}
                    >
                      Repeat your password
                    </label>
                    {formik.touched.confirmPassword &&
                      formik.errors.confirmPassword && (
                        <div className={styles.error}>
                          {formik.errors.confirmPassword}
                        </div>
                      )}
                  </div>

                  <div className={styles.customLabel2}>
                    <input type="checkbox" id="flexCheckDefault" />
                    <label htmlFor="flexCheckDefault">
                      I agree to all statements in the Terms of service
                    </label>
                  </div>

                  {error && <p className={styles.error}>{error}</p>}

                  <button type="submit" className={styles.customSubmitButton}>
                    Register
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
