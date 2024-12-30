const mongoose = require('mongoose');

const pokemonSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    price: Number
});

module.exports = mongoose.model('PokemonList', pokemonSchema);