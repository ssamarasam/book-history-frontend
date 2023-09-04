import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";

import { API } from "../constant";
import { setToken } from "../helpers";

const Login = (props) => {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const navigate = useNavigate();

  const { setUser } = useAuthContext();

  const [isLoading, setIsLoading] = useState(false);

  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    let loginData = {
      identifier: email,
      password: pass,
    };
    e.preventDefault();
    axios
      .post(`${API}/auth/local`, loginData)
      .then((response) => {
        console.log("User Signed in successfully!");
        setToken(response.data.jwt);

        setUser(response.data.user);
        console.log("User profile", response.data.user);
        console.log("User token", response.data.jwt);
        navigate("/");
      })
      .catch((error) => {
        console.log("An error occurred:", error.response);
      });
  };
  return (
    <div className="auth-form-container">
      <h2 className="heading">Login</h2>
      <form className="login-form" onSubmit={handleSubmit}>
        <div className="form-input">
          <label htmlFor="email">email</label>
          <input
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="enter you email"
            id="email"
            name="email"
          />
        </div>
        <div className="form-input">
          <label htmlFor="password">password</label>
          <input
            value={pass}
            className="form-control"
            onChange={(e) => setPass(e.target.value)}
            type="password"
            placeholder="********"
            id="password"
            name="password"
          />
        </div>

        <button className="align-center submit-button " type="submit">
          Log In
        </button>
      </form>
      <button
        className="link-btn"
        onClick={() => props.onFormSwitch("register")}
      >
        Don't have an account? Register here.
      </button>
    </div>
  );
};

export default Login;
