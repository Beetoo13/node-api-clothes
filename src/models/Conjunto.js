const mongoose = require("mongoose");
const { Schema } = mongoose;

const conjuntoSchema = new Schema({
  imgTop: { name: String, img64top: String },
  imgTopTipo: { tipo: String },
  imgBottom: { name: String, img64bottom: String },
  imgBottomTipo: { tipo: String },
  imgMisc: { name: String, img64misc: String },
  imgMiscTipo: { tipo: String },
  imgShoes: { name: String, img64shoes: String },
  imgShoesTipo: { tipo: String },
  savedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Conjunto", conjuntoSchema);