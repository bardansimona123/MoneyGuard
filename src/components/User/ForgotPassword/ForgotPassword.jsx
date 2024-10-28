import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import styles from "./ForgotPassword.module.css";
import Logo from "../../../../public/Logo.svg";
import axios from "axios";

const API_URL = "https://671fb877e7a5792f052f531b.mockapi.io/users"; // Înlocuiește cu URL-ul tău

function ForgotPassword() {
  const [message, setMessage] = useState("");
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const formikEmail = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email").required("Email is required"),
    }),
    onSubmit: async (values) => {
      try {
        const response = await axios.get(API_URL, {
          params: { email: values.email },
        });
        const user = response.data[0];

        if (user) {
          setEmail(values.email);
          setIsEmailVerified(true);
          setMessage("Email found! Please enter your new password.");
        } else {
          setMessage("Email not found.");
        }
      } catch {
        setMessage("Something went wrong. Please try again.");
      }
    },
  });

  const formikPassword = useFormik({
    initialValues: {
      password: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("Password is required"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password"), null], "Passwords must match")
        .required("Please confirm your password"),
    }),
    onSubmit: async (values) => {
      try {
        const response = await axios.get(API_URL, {
          params: { email: email },
        });
        const user = response.data[0];

        if (user) {
          await axios.put(`${API_URL}/${user.id}`, {
            ...user,
            password: values.password,
          });
          setMessage("Your password has been updated.");
          navigate("/login");
        }
      } catch {
        setMessage("Something went wrong. Please try again.");
      }
    },
  });

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className={styles.customBackground}>
      <div className={styles.containerForget}>
        <div className={styles.customColImage}>
          <img src={Logo} alt="Logo" className={styles.logoImage} />
        </div>
        <div className={styles.customCard}>
          <div className={styles.customCardBody}>
            <div className={styles.backButtonContainer}>
              <button className={styles.customBackButton} onClick={handleBack}>
                <span className={styles.customBackIcon}></span> Back
              </button>
            </div>
            {!isEmailVerified ? (
              <form onSubmit={formikEmail.handleSubmit}>
                <div className={styles.customRow}>
                  <div className={styles.customColForm}>
                    <p className={styles.customTitle}>Forgot Password</p>
                    {/* Restul codului rămâne neschimbat */}
                  </div>
                </div>
              </form>
            ) : (
              <form onSubmit={formikPassword.handleSubmit}>
                <div className={styles.customRow}>
                  <div className={styles.customColForm}>
                    <p className={styles.customTitle}>Reset Password</p>
                    {/* Restul codului rămâne neschimbat */}
                  </div>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
