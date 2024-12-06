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
    return res.status(500).send("Houve um problema ao criaro post.");
  }

  res.status(201).send(newPhoto);
};

const deletePhoto = async (req, res) => {
  try {
    const { id } = req.params;

    const reqUser = req.user;

    const photo = await Photo.findById(id);

    if (!photo) {
      return res.status(404).send("Post não encontrado.");
    }

    if (photo.userId.equals(reqUser._id)) {
      return res.status(401).send("Você não tem permissão para deletar este post.");
    }

    await Photo.findByIdAndDelete(photo._id);

    res.status(200).send({ message: "Post deletado com sucesso." });
  } catch (error) {
    res.status(500).send("Houve um problema ao deletar o post.");
    return;
  }
};

module.exports = { register, deletePost: deletePhoto };
