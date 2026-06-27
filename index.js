const express = require("express");
const {
  homeRoute,
  registerRoute,
  loginRoute,
  usersRouter,
  todoRoute,
  loggedInUserRouter
} = require("./Routes");
require("dotenv").config();
const PORT = process.env.PORT;
const app = express();

app.use(express.static("view"));
app.use(express.json())
app.use(express.urlencoded());

app.use("/", homeRoute);
app.use("/register", registerRoute);
app.use("/login", loginRoute);
app.use("/users", usersRouter);
app.use("/loggedInUser", loggedInUserRouter);
app.use("/todo", todoRoute )

app.listen(PORT, (err) => {
  err ? console.log(err) : console.log("Server Is Running");
});
