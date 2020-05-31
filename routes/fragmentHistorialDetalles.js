const { Router } = require("express");
const router = Router();

//Modelo
const Conjunto = require("../src/models/ConjuntoSchema");

//Variables
let fecha = "";

router.get("/detallesHistorial", (req, res) => {
  console.log("headers ", req.get("fecha"));
  let body = req.get("fecha");
  fecha = body;
  console.log(fecha);

  Conjunto.find(
    { savedAt: fecha },
    {
      _id: 0,
      "imgTop.img64top": 1,
      "imgBottom.img64bottom": 1,
      "imgMisc.img64misc": 1,
      "imgShoes.img64shoes": 1,
      "imgConjunto.img64conjunto": 1,
    },
    (err, concepts) => {
      //console.log(concepts);
      res.send({ message: "request succesfull", concepts: concepts });
    }
  );
});

module.exports = router;
