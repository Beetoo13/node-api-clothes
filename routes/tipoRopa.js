const { Router } = require("express");
const router = Router();
let weather = require("openweather-apis");
let cbw = require("clothes-by-weather");

//Definiendo la localización y settings de la api de openweather.
weather.setLang("es");
weather.setCityId(4014336);
weather.setUnits("metric");
weather.setAPPID("4236fa2e07725ffebd4e48aa51f9ab9b");

//Métodos de la api openweather.
router.get("/clima", (req, res) => {
  weather.getAllWeather(function (err, JSONObj) {
    const output = cbw({
      temperature: JSONObj.main.temp,
      pop: 0.1,
      description: JSONObj.weather[0].main,
      windGust: JSONObj.wind.speed,
    });

    if (
      output.upperbody[0] === "windbreaker" ||
      output.upperbody[0] === "rain jacket" ||
      output.upperbody[0] === "jacker warm jacket" ||
      output.upperbody[0] === "coat"
    ) {
      output.upperbody[0] = "chamarra";
    } else if (output.upperbody[0] === "shirt") {
        output.upperbody[0] = "playera";
    }

    if (output.shoes === "boots") {
      output.shoes = "botas";
    } else if (output.shoes === "sneakers") {
      output.shoes = "tenis";
    }

    if (output.misc[0] === "umbrella") {
      output.misc[0] = "Paraguas";
    } else if (output.misc[0] === "gloves") {
      output.misc[0] = "guantes";
    } else if (output.misc[0] === "hat") {
      output.misc[0] = "sombrero";
    } else if (output.misc[0] === "socks") {
      output.misc[0] = "calcetines";
    } else if (output.misc[0] === "sunglasses") {
      output.misc[0] = "lentesdesol";
    }

    res.json(output);
    // console.log("Temp: " + JSONObj.main.temp);
    // console.log("Precipitación: " + (0.10 * 100) + "%");
    // console.log("Descripción: " + JSONObj.weather[0].main);
    // console.log("Velocidad del viento: " + JSONObj.wind.speed + " m/s");
  });
});

module.exports = router;
