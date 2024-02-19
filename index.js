require("dotenv").config();
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
const mongoose = require("mongoose");
const connectDB = require("./dbConnect");
const routeHome = require("./routes/home");
const routeContact = require("./routes/contact");

app.use(express.urlencoded({ extended: true })); //built in fun in middleware

app.get("/user", (req, res) => { 
  res.send(
    "<form method='POST'><input name='username' type='text' placeholder='username'> <input name='password' type='password' placeholder='password' ><button>Login</button></form>"
  );
});
app.post("/user", (req, res) => {
  console.log("Request Type:", req.method);
  console.log(req.body);
  res.end("successfully sent data!!");
  // next();
});
app.use(routeHome);
app.use(routeContact);

connectDB().then(() => {
  console.log("connected to mongodb!");
  app.listen(PORT, (err) => {
    if (err) throw err;
    console.log(`Server listening on PORT ${PORT}`);
  });
});
