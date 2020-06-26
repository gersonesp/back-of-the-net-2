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
      <div className="inputContainer">
        <h1>Back of The Net</h1>
        <div className="labelInput">
          <label>Name</label>
          <input type="name" name="name" value={name} onChange={handleChange} />
        </div>

        {errors.name ? <div>{errors.name}</div> : null}

        <div className="labelInput">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={handleChange}
          />
        </div>

        {errors.email ? <div>{errors.email}</div> : null}

        <div className="labelInput">
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={handleChange}
          />
        </div>

        {errors.password ? <div>{errors.password}</div> : null}

        <div className="labelInput">
          <label>Confirm Password</label>
          <input
            type="password"
            name="password2"
            value={password2}
            onChange={handleChange}
          />
        </div>

        {errors.password2 ? <div>{errors.password2}</div> : null}

        <div className="buttonContainer">
          <button type="submit">Signup</button>
        </div>
      </div>

      <div>
        Already a member? <Link to="/login">Login here.</Link>
      </div>
    </form>
  );
};

export default Signup;
