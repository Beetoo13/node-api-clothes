const { Router } = require("express");
const router = Router();
let weather = require("openweather-apis");
let cbw = require("clothes-by-weather");

let img64Top,
  img64Bottom,
  img64Shoes,
  img64Misc,
  tipoTopEnviar,
  tipoBottomEnviar,
  tipoMiscEnviar,
  tipoShoesEnviar = "";

//Definiendo la localización y settings de la api de openweather.
weather.setLang("es");
weather.setCityId(4014336);
weather.setUnits("metric");
weather.setAPPID("4236fa2e07725ffebd4e48aa51f9ab9b");

//Modelo
const Conjunto = require("../src/models/ConjuntoSchema");

//Métodos de la api openweather.
router.get("/climaUpper", (req, res) => {
  weather.getAllWeather(function (err, JSONObj) {
    const output = cbw({
      temperature: JSONObj.main.temp,
      pop: 0.1,
      description: JSONObj.weather[0].main,
      windGust: JSONObj.wind.speed,
    });

    console.log(output);

    console.log("output upperbody: " + output.upperbody);

    if (
      output.upperbody[0] === "windbreaker" ||
      output.upperbody[0] === "rain jacket" ||
      output.upperbody[0] === "jacker warm jacket" ||
      output.upperbody[0] === "coat" ||
      output.upperbody[0] === "light jacket"
    ) {
      output.upperbody[0] = "Chamarra";
    } else if (output.upperbody[0] === "shirt") {
      output.upperbody[0] = "Playera";
    }

    Conjunto.find(
      {
        imgTopTipo: { tipo: output.upperbody[0] },
      },
      (err, concepts) => {
        if (err) {
          console.log("PETACIÓN");
          return res
            .status(500)
            .send({ message: `Problem with the searching request ${err}` });
        }
        if (concepts == null) {
          return res.status(404).send({ message: `Data does not exists` });
        }

        console.log("Tamaño del concepts: " + concepts.length);

        tamaño_concepts = concepts.length;

        //Nos ayuda a elegir un objeto random para sacar la ropa random también.
        valor_random1 = Math.floor(Math.random() * tamaño_concepts);

        console.log("Valor random1: " + valor_random1);

        img64Top = concepts[valor_random1].get("imgTop");

        tipoTopEnviar = concepts[valor_random1].get("imgTopTipo");

        res.send({ imgTop: img64Top.img64top, tipoTop: tipoTopEnviar.tipo });
      }
    );
  });
});

router.get("/climaLower", (req, res) => {
  //res.send({ message: "calmame crack lower" });

  weather.getAllWeather(function (err, JSONObj) {
    const output = cbw({
      temperature: JSONObj.main.temp,
      pop: 0.1,
      description: JSONObj.weather[0].main,
      windGust: JSONObj.wind.speed,
    });

    //res.send(output.lowerbody);

    Conjunto.find(
      { imgBottomTipo: { tipo: output.lowerbody } },
      (err, concepts) => {
        if (err) {
          console.log("PETACIÓN");
          return res
            .status(500)
            .send({ message: `Problem with the searching request ${err}` });
        }
        if (concepts == null) {
          return res.status(404).send({ message: `Data does not exists` });
        }

        console.log("Tamaño del concepts: " + concepts.length);

        tamaño_concepts = concepts.length;

        //Nos ayuda a elegir un objeto random para sacar la ropa random también.
        valor_random2 = Math.floor(Math.random() * tamaño_concepts);

        console.log("Valor random2: " + valor_random2);

        img64Bottom = concepts[valor_random2].get("imgBottom");

        tipoBottomEnviar = concepts[valor_random2].get("imgBottomTipo");

        res.send({
          imgBottom: img64Bottom.img64bottom,
          tipoBottom: tipoBottomEnviar.tipo,
        });
      }
    );
  });
});

router.get("/climaShoes", (req, res) => {
  weather.getAllWeather(function (err, JSONObj) {
    const output = cbw({
      temperature: JSONObj.main.temp,
      pop: 0.1,
      description: JSONObj.weather[0].main,
      windGust: JSONObj.wind.speed,
    });

    if (output.shoes === "boots") {
      output.shoes = "botas";
    } else if (output.shoes === "sneakers") {
      output.shoes = "tenis";
    }

    //res.send(output.lowerbody);

    Conjunto.find({ imgShoesTipo: { tipo: output.shoes } }, (err, concepts) => {
      if (err) {
        console.log("PETACIÓN");
        return res
          .status(500)
          .send({ message: `Problem with the searching request ${err}` });
      }
      if (concepts == null) {
        return res.status(404).send({ message: `Data does not exists` });
      }

      console.log("Tamaño del concepts: " + concepts.length);

      tamaño_concepts = concepts.length;

      //Nos ayuda a elegir un objeto random para sacar la ropa random también.
      valor_random3 = Math.floor(Math.random() * tamaño_concepts);

      console.log("Valor random3: " + valor_random3);

      img64Shoes = concepts[valor_random3].get("imgShoes");

      tipoShoesEnviar = concepts[valor_random3].get("imgShoesTipo");

      res.send({
        imgShoes: img64Shoes.img64shoes,
        tipoShoes: tipoShoesEnviar.tipo,
      });
    });
  });
});

router.get("/climaMisc", (req, res) => {
  weather.getAllWeather(function (err, JSONObj) {
    const output = cbw({
      temperature: JSONObj.main.temp,
      pop: 0.1,
      description: JSONObj.weather[0].main,
      windGust: JSONObj.wind.speed,
    });

    numeroIf = Math.floor(Math.random() * 3);
    /*
    if (output.misc[0] === "umbrella") {
      output.misc[0] = "paraguas";
    } else if (output.misc[0] === "gloves") {
      output.misc[0] = "guantes";
    } else if (output.misc[0] === "hat") {
      output.misc[0] = "sombrero";
    } else if (output.misc[0] === "socks") {
      output.misc[0] = "calcetines";
    } else if (output.misc[0] === "sunglasses") {
      output.misc[0] = "lentesdesol";
    } else if (output.misc[0] === undefined) {
      output.misc[0] = "calcetines";
    }
*/
    //console.log("NumeroIf: ", numeroIf);

    if (numeroIf === 0) {
      output.misc[0] = "calcetines";
    } else if (numeroIf === 1) {
      output.misc[0] = "sombrero";
    } else if (numeroIf === 2) {
      output.misc[0] = "paraguas";
    }

    Conjunto.find(
      { imgMiscTipo: { tipo: output.misc[0] } },
      (err, concepts) => {
        if (err) {
          console.log("PETACIÓN");
          return res
            .status(500)
            .send({ message: `Problem with the searching request ${err}` });
        }
        if (concepts == null) {
          return res.status(404).send({ message: `Data does not exists` });
        }

        console.log("Tamaño del concepts: " + concepts.length);

        tamaño_concepts = concepts.length;

        //Nos ayuda a elegir un objeto random para sacar la ropa random también.
        valor_random4 = Math.floor(Math.random() * tamaño_concepts);

        console.log("Valor random4: " + valor_random4);

        img64Misc = concepts[valor_random4].get("imgMisc");

        tipoMiscEnviar = concepts[valor_random4].get("imgMiscTipo");

        res.send({
          imgMisc: img64Misc.img64misc,
          tipoMisc: tipoMiscEnviar.tipo,
        });
      }
    );
  });
});

module.exports = router;
