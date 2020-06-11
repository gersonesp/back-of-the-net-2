const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const {passportSecret} = require("../../config/keys");

// Load input validation
const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");

// Load User Model
const User = requrie("../../models/User");

router.post("/register", async (req, res) => {
  // Form validation
  const { errors, isValid } = validateRegisterInput(req.body);

  // Check Validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  try {
    const user = await User.findOne({ email: req.body.email });

    if (user) {
      return res.status(400).send({ response: "Email already exists" });
    } else {
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
      });

      // Hash password before saving in database
      bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
              if(err) throw err;
              newUser.password = hash;
              await newUser.save()
          })
      })
    }
  } catch (err) {
    console.error(err);
    res.status(500).end();
  }
});

router.post("/login", async (req, res) => {
  // Form validation
  const {errors, isValid} = validateLoginInput(req.body)

  // Check validation
  if(!isValid) {
    return res.status(400).send(errors)
  }

  const email = req.body.email;
  const password = req.body.password;

  // Find user by email
  try {
    const user = await User.findOne({email})

    if(!user) {
      return res.status(404).send({response: "Email not found"})
    }

    // Check password
    const hash = user.password;
    const match = await bcrypt.compare(password, user.password)
    if(!match) {
      res.status(401).send({ response: "Password incorrect" })
    } else {
      // User matched
      // Create JWT Payload
      const payload = {
        id: user.id,
        name: user.name
      };

      // Sign token
      const token = jwt.sign(payload, passportSecret);
      res.status(200).send({token, user: payload})
    }
  } catch (err) {
    console.error(err)
    res.status(500).end();
  }
})

module.exports = router;