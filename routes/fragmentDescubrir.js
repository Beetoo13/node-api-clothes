const { Router } = require("express");
const router = Router();
const RandomId = require("random-id");

const Descubrir = require("../src/models/DescubrirSchema");

router.post("/descubrirSave", (req, res) => {
  let body = req.body;

  body._id = RandomId();

  const newDescubrir = new Descubrir(body);
  newDescubrir.save((err, conceptDescubrir) => {
    if (err) {
      res.status(500).send({ message: "El error:" + err });
      return;
    }
    console.log("New element descubrir added");
    res.status(200).send({ descubrir: conceptDescubrir });
  });
});

router.get("/descubrirObtener", (req, res) => {
  Descubrir.find({}, (err, concepts) => {
    if (err) {
      return res
        .status(500)
        .send({ message: `Problem with the searching request: ${err}` });
    }

    res.status(200).json({
      message: "Request completed",
      usuarios: concepts,
    });
  });
});

module.exports = router;
