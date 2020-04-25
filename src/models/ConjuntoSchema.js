const mongoose = require("mongoose");
const { Schema } = mongoose;

const imgTopSchema = new Schema({
  name: String,
  img64top: String,
});

const imgTopTipoSchema = new Schema({
  tipo: String,
});

const imgBottomSchema = new Schema({
  name: String,
  img64bottom: String,
});

const imgBottomTipoSchema = new Schema({
  tipo: String,
});

const imgMiscSchema = new Schema({
  name: String,
  img64misc: String,
});

const imgMiscTipoSchema = new Schema({
  tipo: String,
});

const imgShoesSchema = new Schema({
  name: String,
  img64shoes: String,
});

const imgShoesTipoSchema = new Schema({
  tipo: String,
});

const conjuntoSchema = new Schema({
  imgTop: imgTopSchema,
  imgTopTipo: imgTopTipoSchema,
  imgBottom: imgBottomSchema,
  imgBottomTipo: imgBottomTipoSchema,
  imgMisc: imgMiscSchema,
  imgMiscTipo: imgMiscTipoSchema,
  imgShoes: imgShoesSchema,
  imgShoesTipo: imgShoesTipoSchema,
  savedAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("Conjunto", conjuntoSchema);
