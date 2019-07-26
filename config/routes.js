const axios = require("axios");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { authenticate } = require("../auth/authenticate");
const db = require("./routeModel");
const secret = process.env.JWT_SECRET;
module.exports = server => {
  server.post("/api/register", register);
  server.post("/api/login", login);
  server.get("/api/jokes", authenticate, getJokes);
};

function register(req, res) {
  let salt = bcrypt.genSaltSync(10);
  let hash = bcrypt.hashSync(req.body.password, salt);
  let user = {
    username: req.body.username,
    password: hash
  };
  db.add(user)
    .then(data => {
      res.status(201).json(`Thank you for joining us ${req.body.username}`);
    })
    .catch(data => {
      res.status(500).json(data);
    });
}

function login(req, res) {
  let { username, password } = req.body;

  db.findBy({ username })
    .then(data => {
      if (data && bcrypt.compareSync(password, data.password)) {
        let token = jwt.sign({ sub: data.id }, secret);
        return res.status(200).json({ token });
      } else {
        return res.status(401).json("Invalid Credentials");
      }
    })
    .catch(data => {
      return res.status(500).json(data);
    });
}

function getJokes(req, res) {
  const requestOptions = {
    headers: { accept: "application/json" }
  };

  axios
    .get("https://icanhazdadjoke.com/search", requestOptions)
    .then(response => {
      res.status(200).json(response.data.results);
    })
    .catch(err => {
      res.status(500).json({ message: "Error Fetching Jokes", error: err });
    });
}
