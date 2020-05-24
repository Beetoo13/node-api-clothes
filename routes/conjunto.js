const { Router } = require("express");
const router = Router();
const RandomId = require("random-id");

const Conjunto = require("../src/models/ConjuntoSchema");

router.post("/conjunto", (req, res) => {
  let body = req.body;
  //console.log("Body", body);

  //res.status(200).send(body);

  body._id = RandomId();

  const newConjunto = new Conjunto(body);
  newConjunto.save((err, conceptjob) => {
    if (err) {
      res.status(500).send({ message: "El error:" + err });
      return;
    }
    res.status(200).send({ job: conceptjob });
  });

  console.log("New Conjunto added");
});

module.exports = router;
