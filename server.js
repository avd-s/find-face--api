const express = require("express");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt-nodejs");
const cors = require("cors");
const knex = require("knex");

const host = "0.0.0.0";
const port = process.env.PORT || 3000;

// The Main End Points

const register = require("./endpoints/register");
const signin = require("./endpoints/signin");
const profile = require("./endpoints/profile");
const image = require("./endpoints/image");

// Using Knex to connect to database

// By Using Heroku documentation

const db = knex({
  client: "pg",
  connection: {
    connectionString: process.env.DATABASE_URL,
    ssl: true,
  },
});

// Using Express to receive data from frontend and update the server and database

const app = express();

// Using Cors and bodyparser to bundle various input fields as json

app.use(cors());
app.use(bodyParser.json());

// Using the method of Dependency Injection and retriving data from endpoints

app.get("/", (req, res) => {
  res.send("its working");
});

app.post("/signin", (req, res) => {
  signin.handleSignin(req, res, db, bcrypt);
});

app.post("/register", (req, res) => {
  register.handleRegister(req, res, db, bcrypt);
});

app.get("/profile/:id", (req, res) => {
  profile.getProfile(req, res, db);
});

app.put("/image", (req, res) => {
  image.updateImage(req, res, db);
});

app.post("/imageurl", (req, res) => {
  image.apiCall(req, res);
});

// Default Port

app.listen(port, host);
