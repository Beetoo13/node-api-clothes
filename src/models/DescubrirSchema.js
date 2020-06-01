const mongoose = require("mongoose");
const { Schema } = mongoose;

const img64UsuarioSchema = new Schema(
  {
    img64usuario: { type: String },
  },
  { _id: false }
);

const nameUsuarioSchema = new Schema(
  {
    nameusuario: { type: String },
  },
  { _id: false }
);

const comentarioUsuarioSchema = new Schema(
  {
    comentariousuario: { type: String },
  },
  { _id: false }
);

const descubrirSchema = new Schema({
  _id: { type: String },
  img64Usuario: img64UsuarioSchema,
  nameUsuario: nameUsuarioSchema,
  comentarioUsuario: comentarioUsuarioSchema,
});

module.exports = mongoose.model("Descubrir", descubrirSchema);
