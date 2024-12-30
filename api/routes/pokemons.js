const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
// const PokemonSchema = require('../models/pokemonSchema');
const {getPokemonList} = require('../controller/getPokemonController')

//list all pokemons
router.get('/', (req, res, next) => {
    
});

router.get('/get-pokemon', getPokemonList)

//create pokemons

router.post('/', (req, res, next) => {
 
})


//fetch individual pokemon
router.get('/:pokemon', (req, res, next) => {
});


//update


//delete

module.exports = router;