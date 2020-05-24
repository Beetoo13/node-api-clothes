const { Router } = require("express");
const router = Router();

//Modelo
const Conjunto = require("../src/models/ConjuntoSchema");

//Variables
let num_documentos_enviar = 0;

router.get("/historial", (req, res) => {
  Conjunto.countDocuments({}, (err, numeroDocumentosRecibido) => {
    console.log("Numero de documentos: " + numeroDocumentosRecibido);
    num_documentos_enviar = numeroDocumentosRecibido;
  });

  Conjunto.findOne({}, (err, concepts) => {
    if (err) {
      return res
        .status(500)
        .send({ message: `Problem with the searching request ${err}` });
    }

    res.status(200).json({
      message: "Request complete",
      numeroDocs: num_documentos_enviar,
      conjuntos: concepts,
    });
  });
});

module.exports = router;
