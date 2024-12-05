require("dotenv").config();

const express = require("express");
const path = require("path");
const cors = require("cors");

const port = process.env.PORT;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const router = require("./routes/Router.jsx");

app.use(router);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
