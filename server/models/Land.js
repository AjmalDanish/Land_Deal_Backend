const mongoose = require('mongoose');

const landSchema = new mongoose.Schema({
    image: String,
    address: String,
    price: String,
    contact: String,
    lat: Number,
    lng: Number
  }, { timestamps: true });

module.exports = mongoose.model('Land', landSchema);
