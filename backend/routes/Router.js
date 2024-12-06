const express = require("express");
const router = express.Router();

router.use("/api/users", require("./UserRoutes"));

router.get("/", (req, res) => {
  res.send("Hello World");
});

module.exports = router;
