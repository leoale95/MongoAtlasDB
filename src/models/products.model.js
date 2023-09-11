const mongoose = require('mongoose');

const productCollection = "Products";

const productSchema = new mongoose.Schema({
    id: Number,
    title: String,
    price: Number,
    description: String,
    category: String,
    image: String,
    rating: {
        rate: Number,
        count: Number
    }
});

const productModel = mongoose.model(productCollection, productSchema);

module.exports = { productModel };
