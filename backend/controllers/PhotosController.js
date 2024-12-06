const Photo = require("../models/Photo");
const User = require("../models/User");

const mongoose = require("mongoose");

const register = async (req, res) => {
  const { title } = req.body;
  const image = req.file.filename;

  const reqUser = req.user;
  const user = await User.findById(reqUser._id);

  const newPhoto = new Photo({
    title,
    image,
    user: user._id,
    userName: user.name,
  });

  if (!newPhoto) {
    return res.status(500).send("Houve um problema ao criaro post..");
  }

  res.status(201).send(newPhoto);
};

module.exports = { register };
