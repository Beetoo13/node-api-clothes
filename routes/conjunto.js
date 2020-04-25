const { Router } = require("express");
const router = Router();
const RandomId = require('random-id');

const Conjunto = require("../src/models/ConjuntoSchema");

router.post("/conjunto", (req, res) => {
  let body = req.body;
  //console.log("Body", body)

  body._id = RandomId()

  const newConjunto = new Conjunto(body);
  newConjunto.save((err, conceptjob)=>{
    if (err) res.status(500).send({message: err})
    res.status(200).send({job: conceptjob})
  });

  console.log("New Conjunto", newConjunto);
});

module.exports = router;
