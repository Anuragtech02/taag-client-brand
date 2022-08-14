import { useState, useContext, useEffect } from "react";
import { Button, InputField, Navbar } from "../../components";
import styles from "../Login/Login.module.scss";
import { decodeToken } from "react-jwt";
import axios from "axios";
import { AuthContext } from "../../utils/auth/AuthContext";
import { useNavigate, useParams } from "react-router";
import { LinearProgress } from "@mui/material";
import Logo from "../../components/Logo/Logo";
import { showAlert } from "../../utils";

const Login = () => {
  const navigate = useNavigate();

  const [values, setValues] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isValidURI, setIsValidURI] = useState(false);

  const { token, id } = useParams();

  function handleChange(e) {
    const { id, value, name } = e.target;
    // console.log(id, value, name);
    setValues((prev) => {
      return {
        ...prev,
        [name ? name : id]: value,
      };
    });
  }

  useEffect(() => {
    async function confirmToken() {
      console.log({ uri: window.location.href, id });
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_API_URI}/auth/verify-reset-token/`,
          {
            params: {
              uri: window.location.href,
              id,
            },
          }
        );
        if (res.status === 200) {
          setIsValidURI(true);
        } else {
          return showAlert("error", "Invalid Reset Link");
        }
      } catch (error) {
        showAlert("error", error.message);
      }
    }
    if (token && id) {
      confirmToken();
    }
  }, [token, id]);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    if (token && id) {
      if (values.confirmPassword !== values.newPassword) {
        return showAlert("error", "Passwords do not match");
      }
      try {
        const res = await axios.post(
          `${process.env.REACT_APP_API_URI}/auth/reset-password/`,
          {
            email: values.email,
            newPassword: values.newPassword,
            userType: "brand",
          }
        );
        setLoading(false);
        showAlert("success", res.data.message);
        setTimeout(() => {
          navigate("/login");
        }, 1000);
      } catch (error) {
        return showAlert("error", error.message);
      }
    }

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URI}/auth/request-password-reset/`,
        {
          email: values?.email,
          userType: "brand",
        }
      );

      if (response.status === 200) {
        showAlert("success", "Reset Link sent");
        setLoading(false);
        // navigate("/");
      } else {
      }
    } catch (error) {
      // console.log("True error", error.response);
      setError(error.response.data.message);
      setLoading(false);
    }
  }

  return (
    <div className={styles.container}>
      <Logo withText />
      <form onSubmit={handleSubmit}>
        <InputField
          id="email"
          label="Email"
          required
          value={values?.email}
          onChange={handleChange}
          type="text"
          disabled={loading}
        />
        {isValidURI && (
          <InputField
            id="newPassword"
            label="New Password"
            required
            value={values?.newPassword}
            onChange={handleChange}
            type="password"
            disabled={loading}
          />
        )}
        {isValidURI && (
          <InputField
            id="confirmPassword"
            label="Confirm Password"
            required
            value={values?.confirmPassword}
            onChange={handleChange}
            type="password"
            disabled={loading}
          />
        )}
        <div className={styles.buttons}>
          <Button title="Submit" type="submit" disabled={loading}>
            {token && id ? "Submit" : "Send Link"}
          </Button>
        </div>
        {!loading && error && <span className={styles.error}>{error}</span>}
        {!error && loading && <LinearProgress className={styles.loading} />}
      </form>
    </div>
  );
};

export default Login;
