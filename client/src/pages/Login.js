import React, { useState, useContext } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import { store } from "../utils/storage";
import UserContext from "../context/UserContext";

import "./LoginSignup.css";

const Login = () => {
  const { setUser } = useContext(UserContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await axios.post("/api/users/login", {
        email,
        password,
      });

      store(data.token);
      setUser(data.user);
    } catch (err) {
      console.error(err);
      setErrors(err.response.data);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    switch (name) {
      case "email":
        setEmail(value);
        break;
      case "password":
        setPassword(value);
        break;
      default:
        break;
    }
  };

  return (
    <form onSubmit={handleSubmit} className="loginForm">
      <div className="blankCard">
        <div className="headerContainer">
          <h5>Back of The Net</h5>
          <h1>Welcome back</h1>
        </div>
        <div className="inputContainer">
          <div className="labelInput">
            <label>Email</label>
            <input
              className={errors.email ? "inputError" : null}
              type="email"
              name="email"
              value={email}
              onChange={handleChange}
            />

            {errors.email ? (
              <div className="authError">{errors.email}</div>
            ) : null}
          </div>

          <div className="labelInput">
            <label>Password</label>
            <input
              className={errors.password ? "inputError" : null}
              type="password"
              name="password"
              value={password}
              onChange={handleChange}
            />
            {errors.password ? (
              <div className="authError">{errors.password}</div>
            ) : null}
          </div>

          <div className="buttonContainer">
            <button type="submit">Log In</button>
          </div>

          <div className="altForm">
            <pre>
              New member? <Link to="/register">Sign Up here.</Link>
            </pre>
          </div>
        </div>
      </div>
    </form>
  );
};

export default Login;
