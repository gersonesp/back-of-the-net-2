import React, { useState, useContext } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import { store } from "../utils/storage";
import UserContext from "../context/UserContext";

const Signup = () => {
  const { setUser } = useContext(UserContext);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [errors, setErrors] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await axios.post("/api/users/register", {
        name,
        email,
        password,
        password2,
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
      case "name":
        setName(value);
        break;
      case "email":
        setEmail(value);
        break;
      case "password":
        setPassword(value);
        break;
      case "password2":
        setPassword2(value);
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
          <h1>Create An Account</h1>
        </div>
        <div className="inputContainer">
          <div className="labelInput">
            <label>Username</label>
            <input
              className={errors.name ? "inputError" : null}
              type="name"
              name="name"
              value={name}
              onChange={handleChange}
            />
            {errors.name ? (
              <div className="authError">{errors.name}</div>
            ) : null}
          </div>

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

          <div className="labelInput">
            <label>Confirm Password</label>
            <input
              className={errors.password2 ? "inputError" : null}
              type="password"
              name="password2"
              value={password2}
              onChange={handleChange}
            />
            {errors.password2 ? (
              <div className="authError">{errors.password2}</div>
            ) : null}
          </div>

          <div className="buttonContainer">
            <button type="submit">Signup</button>
          </div>

          <div className="altForm">
            <pre>
              Already a member? <Link to="/login">Login here.</Link>
            </pre>
          </div>
        </div>
      </div>
    </form>
  );
};

export default Signup;
