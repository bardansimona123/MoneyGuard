import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import styles from "./Login.module.css";
import Logo from "../../../../public/Logo.svg";
import axios from "axios";

const API_URL = "https://api.jsonbin.io/v3/b/671ff97aad19ca34f8c01e2e";
const MASTER_KEY =
  "$2a$10$UL1M1GzfgYYwn5l9vksKJuWdBUVfSVoa0maU3yjE6WI6yp8b.b6iy";

function InputField({
  type,
  placeholder,
  value,
  onChange,
  onBlur,
  label,
  id,
  name,
  error,
}) {
  return (
    <div className={styles.inputContainer}>
      {error && <div className={styles.errorMessage}>{error}</div>}
      <div className={styles.inputWrapper}>
        <input
          type={type}
          placeholder={placeholder}
          id={id}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          className={`${styles.customInput} ${error ? styles.inputError : ""}`}
          name={name}
        />
        <label htmlFor={id} className={styles.customLabel}>
          {label}
        </label>
      </div>
    </div>
  );
}

InputField.propTypes = {
  type: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  error: PropTypes.string,
};

function Login() {
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      password: Yup.string().required("Password is required"),
    }),
    onSubmit: async (values) => {
      try {
        const response = await axios.get(API_URL, {
          headers: { "X-Master-Key": MASTER_KEY },
        });
        const users = response.data.record.users;
        const user = users.find(
          (user) =>
            user.email === values.email && user.password === values.password
        );

        if (user) {
          localStorage.setItem("authToken", user.token);
          navigate("/dashboard");
        } else {
          setError("Invalid username or password");
        }
      } catch (error) {
        setError("Something went wrong. Please try again.");
      }
    },
  });

  return (
    <section className={styles.customBackground}>
      <div className={styles.containerLogin}>
        <div className={styles.logoTitle}>
          <img src={Logo} alt="Logo" className={styles.logoImage} />
        </div>

        <form onSubmit={formik.handleSubmit}>
          <div className={styles.inputFieldSize}>
            <InputField
              type="email"
              placeholder="Email address"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              label="Email address"
              id="form1"
              name="email"
              error={formik.touched.email && formik.errors.email}
            />
          </div>

          <div className={styles.inputFieldSize}>
            <InputField
              type="password"
              placeholder="Password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              label="Password"
              id="form2"
              name="password"
              error={formik.touched.password && formik.errors.password}
            />
          </div>

          {error && <p className={styles.errorMessage}>{error}</p>}

          <div className={styles.formOptions}>
            <div className={styles.boxCheck}>
              <input type="checkbox" id="flexCheckDefault" />
              <label htmlFor="flexCheckDefault">Remember me</label>
            </div>
            <div>
              <Link to="/forgot" className={styles.darkBlueLink}>
                Forgot password?
              </Link>
            </div>
          </div>

          <button type="submit" className={styles.submitButton}>
            Sign in
          </button>
        </form>

        <div className="text-center">
          <p className={styles.notAMemberText}>
            Not a member?{" "}
            <Link to="/register" className={styles.registerLink}>
              Register
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}

export default Login;
