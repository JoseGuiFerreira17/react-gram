const express = require("express");
const router = express.Router();

const { register } = require("../controllers/PhotosController");

const { photoCreateValidation } = require("../middlewares/photoValidation");
const authGuard = require("../middlewares/authGuard");
const validate = require("../middlewares/handleValidation");
const imageUpload = require("../middlewares/imageUpload");

router.post(
  "/",
  authGuard,
  imageUpload.single("imageProfile"),
  photoCreateValidation(),
  validate,
  register
);

module.exports = router;
