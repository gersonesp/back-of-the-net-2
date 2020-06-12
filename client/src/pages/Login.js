import React, { useState, useContext } from "react";
import axios from "axios";

import { store } from "../utils/storage";
import UserContext from "../context/UserContext";

const Login = () => {
  const { user, setUser } = useContext(UserContext);
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
      setErrors(err.response.data.response);
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
      <div className="inputContainer">
        <h1>Back of The Net</h1>
        <div className="labelInput">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={handleChange}
          />
        </div>

        <div className="labelInput">
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={handleChange}
          />
        </div>

        <div className="buttonContainer">
          <button type="submit">Log In</button>
        </div>

        <div className="authError">
          <p>{errors}</p>
        </div>
      </div>
    </form>
  );
};

export default Login;
