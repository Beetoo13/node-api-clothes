const { Router } = require("express");
const router = Router();

const Conjunto = require("../src/models/ConjuntoSchema");

router.post("/conjunto", (req, res) => {
  let body = req.body;
  let conjunto = { 
      imgTop: {
      name: body.imgTop.name,
      img64Top: body.imgTop.img64top,
    },
    imgTopTipo: { tipo: body.imgTopTipo.tipo },
    imgBottom: {
      name: body.imgBottom.name,
      img64Top: body.imgBottom.img64bottom,
    },
    imgBottomTipo: { tipo: body.imgBottomTipo.tipo },
    imgMisc: {
      name: body.imgMisc.name,
      img64Top: body.imgMisc.img64misc,
    },
    imgMiscTipo: { tipo: body.imgMiscTipo.tipo },
    imgShoes: {
      name: body.imgShoes.name,
      img64Top: body.imgShoes.img64shoes,
    },
    imgShoesTipo: { tipo: body.imgShoesTipo.tipo }
  }
  
  const newConjunto = new Conjunto(conjunto);

  console.log(newConjunto);
});

module.exports = router;
