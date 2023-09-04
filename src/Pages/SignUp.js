import React, { useState } from "react";
import axios from "axios";

import { API } from "../constant";
import { setToken } from "../helpers";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";

const SignUp = (props) => {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [userName, setUserName] = useState("");
  const { setUser } = useAuthContext();

  const handleSubmit = (e) => {
    e.preventDefault();
    let registerData = {
      username: userName,
      email: email,
      password: pass,
    };

    axios
      .post(`${API}/auth/local/register`, registerData)
      .then((response) => {
        // Handle success.
        console.log("User Registered");
        setToken(response.data.jwt);
        setUser(response.data.user);
        console.log("User profile", response.data.user);
        console.log("User token", response.data.jwt);
      })
      .catch((error) => {
        console.log("An error occurred:", error.response);
      });
  };
  return (
    <div className=" auth-form-container ">
      <h2 className="heading">Sign Up</h2>
      <form className="register-form" onSubmit={handleSubmit}>
        <div className="form-input">
          <label htmlFor="username">User Name</label>
          <input
            className="form-control"
            value={userName}
            name="username"
            onChange={(e) => setUserName(e.target.value)}
            id="username"
            placeholder="username"
          />
        </div>
        <div className="form-input">
          <label htmlFor="email">email</label>
          <input
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="youremail@gmail.com"
            id="email"
            name="email"
          />
        </div>
        <div className="form-input">
          <label htmlFor="password">password</label>
          <input
            className="form-control"
            value={pass}
            onChange={(e) => setPass(e.target.value)}
            type="password"
            placeholder="********"
            id="password"
            name="password"
          />
        </div>

        <button className="align-center submit-button" type="submit">
          Register
        </button>
      </form>
      <button className="link-btn" onClick={() => props.onFormSwitch("login")}>
        Already have an account? Login here.
      </button>
    </div>
  );
};

export default SignUp;
