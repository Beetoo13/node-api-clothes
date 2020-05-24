const { Router } = require("express");
const router = Router();
let weather = require("openweather-apis");
let cbw = require("clothes-by-weather");

let img64Top,
  img64Bottom,
  img64Shoes,
  img64Misc = "";

let objetoAEnviar = {
  topObtenido: "",
  bottomObtenido: "",
  shoesObtenido: "",
  miscObtenido: "",
};

//Definiendo la localización y settings de la api de openweather.
weather.setLang("es");
weather.setCityId(4014336);
weather.setUnits("metric");
weather.setAPPID("4236fa2e07725ffebd4e48aa51f9ab9b");

//Modelo
const Conjunto = require("../src/models/ConjuntoSchema");

//Métodos de la api openweather.
router.get("/clima", (req, res) => {
  weather.getAllWeather(function (err, JSONObj) {
    const output = cbw({
      temperature: JSONObj.main.temp,
      pop: 0.1,
      description: JSONObj.weather[0].main,
      windGust: JSONObj.wind.speed,
    });

    console.log(output);

    console.log("output upperbody: " + output.upperbody);
    console.log("output lowerbody: " + output.lowerbody);
    console.log("output shoes: " + output.shoes);
    console.log("output misc: " + output.misc);

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

    if (output.shoes === "boots") {
      output.shoes = "botas";
    } else if (output.shoes === "sneakers") {
      output.shoes = "tenis";
    }

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
    } else {
      output.misc[0] = "calcetines";
    }

    Conjunto.find(
      {
        imgTopTipo: { tipo: output.upperbody[0] },
        imgBottomTipo: { tipo: output.lowerbody },
        imgMiscTipo: { tipo: output.misc[0] }, //AQUÍ HAY ERROR
        imgShoesTipo: { tipo: output.shoes },
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
        valor_random2 = Math.floor(Math.random() * tamaño_concepts);
        valor_random3 = Math.floor(Math.random() * tamaño_concepts);
        valor_random4 = Math.floor(Math.random() * tamaño_concepts);

        // console.log("Valor random1: " + valor_random1);
        // console.log("Valor random2: " + valor_random2);
        // console.log("Valor random3: " + valor_random3);
        // console.log("Valor random4: " + valor_random4);

        img64Top = concepts[valor_random1].get("imgTop");
        img64Bottom = concepts[valor_random2].get("imgBottom");
        img64Shoes = concepts[valor_random3].get("imgShoes");
        img64Misc = concepts[valor_random4].get("imgMisc");

        objetoAEnviar.topObtenido = img64Top.img64top;
        objetoAEnviar.bottomObtenido = img64Bottom.img64bottom;
        objetoAEnviar.shoesObtenido = img64Shoes.img64shoes;
        objetoAEnviar.miscObtenido = img64Misc.img64misc;

        //console.log(objetoAEnviar);

        res.json(objetoAEnviar);
      }
    );

    //console.log(output);
    //res.json(output);
    // console.log("Temp: " + JSONObj.main.temp);
    // console.log("Precipitación: " + (0.10 * 100) + "%");
    // console.log("Descripción: " + JSONObj.weather[0].main);
    // console.log("Velocidad del viento: " + JSONObj.wind.speed + " m/s");
  });
});

module.exports = router;
