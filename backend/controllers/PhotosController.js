const Photo = require("../models/Photo");
const User = require("../models/User");

const mongoose = require("mongoose");

const register = async (req, res) => {
  try {
    const { title } = req.body;
    const image = req.file.filename;

    const reqUser = req.user;

    if (!reqUser) {
      return res.status(404).json({ errors: "Usuário não encontrado." });
    }

    const user = await User.findById(reqUser._id);

    if (!user) {
      return res.status(404).json({ errors: "Usuário não encontrado." });
    }

    const newPhoto = await Photo.create({
      title,
      image,
      userId: user._id,
      userName: user.name,
    });

    if (!newPhoto) {
      return res.status(500).json({ erroros: "Houve um problema ao criar o post." });
    }

    res.status(201).json(newPhoto);
  } catch (error) {
    console.log(error);
    res.status(500).json({ errors: "Houve um problema ao criar o post." });
    return;
  }
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

const getPhotos = async (req, res) => {
  const photos = await Photo.find().sort({ createdAt: -1 });

  res.status(200).send(photos);
};

const getPUserPhotos = async (req, res) => {
  const { id } = req.params;

  const user = await User.findById(id);

  if (!user) {
    return res.status(404).json({ errors: "Usuário não encontrado." });
  }

  const photos = await Photo.find({ userId: id })
    .sort([["createdAt", -1]])
    .exec();

  res.status(200).json(photos);
};

const getPhotoById = async (req, res) => {
  const { id } = req.params;

  const photo = await Photo.findById(id);

  if (!photo) {
    return res.status(404).json({ errors: "Post não encontrado." });
  }

  res.status(200).json(photo);
};

const update = async (req, res) => {
  const { id } = req.params;
  const { title } = req.body;
  const reqUser = req.user;

  const photo = await Photo.findById(id);

  if (!photo) {
    return res.status(404).json({ errors: "Post não encontrado." });
  }

  if (!photo.userId.equals(reqUser._id)) {
    return res.status(401).json({ errors: "Você não tem permissão para editar este post." });
  }

  photo.title = title;
  await photo.save();

  res.status(200).json({ photo, message: "Post atualizado com sucesso." });
};

const like = async (req, res) => {
  const { id } = req.params;
  const reqUser = req.user;

  const photo = await Photo.findById(id);

  if (!photo) {
    return res.status(404).json({ errors: "Post não encontrado." });
  }

  if (photo.likes.includes(reqUser._id)) {
    photo.likes = photo.likes.filter((like) => like.toString() !== reqUser._id.toString());
  } else {
    photo.likes.push(reqUser._id);
  }

  await photo.save();

  res.status(200).json(photo);
};

const comment = async (req, res) => {
  const { id } = req.params;
  const { comment } = req.body;

  const reqUser = req.user;
  const user = await User.findById(reqUser._id);

  const photo = await Photo.findById(id);

  if (!photo) {
    return res.status(404).json({ errors: "Post não encontrado." });
  }

  photo.comments.push({
    comment,
    userId: user._id,
    userName: user.name,
    userImage: user.profielImage,
  });

  await photo.save();

  res.status(200).json(photo);
};

module.exports = {
  register,
  deletePhoto,
  getPhotos,
  getPUserPhotos,
  getPhotoById,
  update,
  like,
  comment,
};
