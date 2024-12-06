const express = require("express");
const router = express.Router();

const {
  register,
  deletePhoto,
  getPhotos,
  getPUserPhotos,
  getPhotoById,
  update,
} = require("../controllers/PhotosController");

const { photoCreateValidation, photoUpdateValidation } = require("../middlewares/photoValidation");
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
router.delete("/:id", authGuard, deletePhoto);
router.get("/", getPhotos);
router.get("/user/:id", authGuard, getPUserPhotos);
router.get("/:id", authGuard, getPhotoById);
router.put("/:id", authGuard, photoUpdateValidation(), update);

module.exports = router;
