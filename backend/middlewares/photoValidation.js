const { body } = require("express-validator");

const photoCreateValidation = () => {
  return [
    body("title")
      .not()
      .equals("undefined")
      .withMessage("O título é obrigatório.")
      .isString()
      .withMessage("O título é obrigatório.")
      .isLength({ min: 3 })
      .withMessage("O título deve ter no mínimo 3 caracteres."),
    body("image").custom((value, { req }) => {
      if (!req.file) {
        throw new Error("A imagem é obrigatória.");
      }
      return true;
    }),
  ];
};

const photoUpdateValidation = () => {
  return [
    body("title")
      .optional()
      .isString()
      .withMessage("O título é obrigatório.")
      .isLength({ min: 3 })
      .withMessage("O título deve ter no mínimo 3 caracteres."),
  ];
};

const commentValidation = () => {
  return [body("comment").isString().withMessage("O comentário é obrigatório")];
};

module.exports = { photoCreateValidation, photoUpdateValidation, commentValidation };
