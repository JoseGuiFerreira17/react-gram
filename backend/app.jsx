require("dotenv").config();

const express = require("express");
const path = require("path");
const cors = require("cors");

const port = process.env.PORT;
const url_origin = process.env.URL_ORIGIN;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cors({ credentials: true, origin: url_origin }));

app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

require("./config/db.jsx");

const router = require("./routes/Router.jsx");

app.use(router);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
