const mongoose = require("mongoose");
const { Schema } = mongoose;

const photoSchema = new Schema(
  {
    title: { type: String, required: true },
    image: { type: String, required: true },
    description: { type: String, required: false },
    likes: { type: Array, required: false },
    comments: { type: Array, required: false },
    userId: { type: mongoose.ObjectId, required: true },
    userName: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const Photo = mongoose.model("Photo", photoSchema);

module.exports = Photo;
