const mongoose = require("mongoose");
const { Schema } = mongoose;

const imgTopSchema = new Schema({
  name: {type: String},
  img64top: {type: String},
}, { _id : false });

const imgTopTipoSchema = new Schema({
  tipo: {type: String},
}, { _id : false });

const imgBottomSchema = new Schema({
  name: {type: String},
  img64bottom: {type: String},
}, { _id : false });

const imgBottomTipoSchema = new Schema({
  tipo: {type: String},
}, { _id : false });

const imgMiscSchema = new Schema({
  name: {type: String},
  img64misc: {type: String},
}, { _id : false });

const imgMiscTipoSchema = new Schema({
  tipo: {type: String},
}, { _id : false });

const imgShoesSchema = new Schema({
  name: {type: String},
  img64shoes: {type: String},
}, { _id : false });

const imgShoesTipoSchema = new Schema({
  tipo: {type: String},
}, { _id : false });

const conjuntoSchema = new Schema({
  _id: {type: String},
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