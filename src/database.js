const mongoose = require("mongoose");
const app = require('./index')
const PORT = process.env.PORT || 3000

const url = "mongodb://localhost:27017/ropaDB";

mongoose.connect(url, (err, res) => {
  if (err) return console.log(`Error connecting to the database ${err}`);

  console.log("Connection to the database established");

  app.listen(PORT, () => {
    console.log(`API Rest running at http://localhost:${PORT}`);
  });
});