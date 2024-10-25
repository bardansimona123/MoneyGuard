import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import styles from "./ForgotPassword.module.css";
import Logo from "../../../../public/Logo.svg";

function InputField({
  type,
  placeholder,
  value,
  onChange,
  onBlur,
  name,
  label,
  id,
}) {
  return (
    <div className={styles.inputContainer}>
      <div className={styles.inputWrapper}>
        <input
          type={type}
          placeholder={placeholder}
          id={id}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          name={name}
          className={styles.customInput}
        />
        <label htmlFor={id} className={styles.customLabel}>
          {label}
        </label>
      </div>
    </div>
  );
}

function ForgotPassword() {
  const [message, setMessage] = useState("");
  const [isEmailVerified, setIsEmailVerified] = useState(false); // Verifică dacă emailul este valid
  const [email, setEmail] = useState(""); // Salvează emailul utilizatorului
  const navigate = useNavigate();

  const formikEmail = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email").required("Email is required"),
    }),
    onSubmit: (values) => {
      const users = JSON.parse(localStorage.getItem("users")) || [];
      const user = users.find((user) => user.email === values.email);

      if (user) {
        setEmail(values.email); // Salvează emailul pentru a-l folosi ulterior
        setIsEmailVerified(true); // Permite resetarea parolei
        setMessage("Email found! Please enter your new password.");
      } else {
        setMessage("Email not found.");
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
    onSubmit: (values) => {
      // Actualizează parola utilizatorului
      const users = JSON.parse(localStorage.getItem("users")) || [];
      const updatedUsers = users.map((user) =>
        user.email === email ? { ...user, password: values.password } : user
      );
      localStorage.setItem("users", JSON.stringify(updatedUsers));
      setMessage("Your password has been updated.");
      navigate("/login"); // Redirecționează utilizatorul la pagina de login după actualizarea parolei
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

            {/* Form pentru verificarea emailului */}
            {!isEmailVerified ? (
              <form onSubmit={formikEmail.handleSubmit}>
                <div className={styles.customRow}>
                  <div className={styles.customColForm}>
                    <p className={styles.customTitle}>Forgot Password</p>

                    <InputField
                      type="email"
                      placeholder="Enter your email"
                      value={formikEmail.values.email}
                      onChange={formikEmail.handleChange}
                      onBlur={formikEmail.handleBlur}
                      name="email"
                      label="Your Email"
                      id="formEmail"
                    />
                    {formikEmail.touched.email && formikEmail.errors.email && (
                      <div className={styles.error}>
                        {formikEmail.errors.email}
                      </div>
                    )}

                    <button
                      type="submit"
                      className={styles.customSubmitButton}
                      disabled={
                        !formikEmail.isValid || formikEmail.isSubmitting
                      }
                    >
                      Verify Email
                    </button>

                    {message && <p className={styles.message}>{message}</p>}
                  </div>
                </div>
              </form>
            ) : (
              // Form pentru resetarea parolei
              <form onSubmit={formikPassword.handleSubmit}>
                <div className={styles.customRow}>
                  <div className={styles.customColForm}>
                    <p className={styles.customTitle}>Reset Password</p>

                    <InputField
                      type="password"
                      placeholder="Enter your new password"
                      value={formikPassword.values.password}
                      onChange={formikPassword.handleChange}
                      onBlur={formikPassword.handleBlur}
                      name="password"
                      label="New Password"
                      id="formPassword"
                    />
                    {formikPassword.touched.password &&
                      formikPassword.errors.password && (
                        <div className={styles.error}>
                          {formikPassword.errors.password}
                        </div>
                      )}

                    <InputField
                      type="password"
                      placeholder="Confirm your new password"
                      value={formikPassword.values.confirmPassword}
                      onChange={formikPassword.handleChange}
                      onBlur={formikPassword.handleBlur}
                      name="confirmPassword"
                      label="Confirm Password"
                      id="formConfirmPassword"
                    />
                    {formikPassword.touched.confirmPassword &&
                      formikPassword.errors.confirmPassword && (
                        <div className={styles.error}>
                          {formikPassword.errors.confirmPassword}
                        </div>
                      )}

                    <button
                      type="submit"
                      className={styles.customSubmitButton}
                      disabled={
                        !formikPassword.isValid || formikPassword.isSubmitting
                      }
                    >
                      Reset Password
                    </button>

                    {message && <p className={styles.message}>{message}</p>}
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
