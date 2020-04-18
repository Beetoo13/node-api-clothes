const express = require('express')
const app = express()
const bodyParser =require('body-parser')

//Settings
app.set('port', process.env.Port || 3000);
app.use(bodyParser.urlencoded({ extended: true}));

//Middlewares
app.use(express.urlencoded({extended: false}));
app.use(express.json());

//Routes
app.get('/', (req, res) => {
    res.send("Simón ya anda jalando")
});

app.listen(app.get('port'), () => {
    console.log("Server running on port: " + app.get('port'));
});