const express = require("express");
const path = require("path");
const cors = require("cors");

const port = 6000;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
