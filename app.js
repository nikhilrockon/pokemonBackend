const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const router = express.Router();
const pokemonRoutes = require('./api/routes/pokemons')
const mongoose = require('mongoose');
const cors = require('cors')

// app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors())
// app.use('/listallpokemons', listAllPokemon);
// app.use('/createpokemon', createPokemon);
//Create remaining two API endpoints

app.use( '/', pokemonRoutes)
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    if (req.method === "OPTIONS") {
        res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, PATCH, DELETE');
        return res.status(200).json({});
    }
    next();
});
console.log("Server Started")



// Replace <username>, <password>, and <dbname> with your MongoDB details
const mongoURI = 'mongodb+srv://nikhilinodered:5hybyy2nBGh8rm5k@cluster0.lyavo52.mongodb.net/Pokemon?retryWrites=true&w=majority&appName=Cluster0';

// Options for Mongoose
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

mongoose
  .connect(mongoURI, options)
  .then(() => {
    console.log('Connected to MongoDB successfully!');
  })
  .catch((err) => {
    console.error('Failed to connect to MongoDB:', err);
  });

module.exports = app;
