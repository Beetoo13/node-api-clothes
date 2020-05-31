const express = require("express");
const app = express();
const bodyParser = require("body-parser");
// const multer = require('multer')
// const fs = require('fs')

//Settings
app.set("port", process.env.Port || 3000);
app.use(bodyParser.json({ limit: "50mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

//Middlewares
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//Routes
app.get("/", (req, res) => {
  res.send("Simón ya anda jalando");
});

app.use(require("../routes/tipoRopa"));
app.use(require("../routes/conjunto"));
app.use(require("../routes/fragmentHistorial"));
app.use(require("../routes/fragmentHistorialDetalles"));

module.exports = app;
