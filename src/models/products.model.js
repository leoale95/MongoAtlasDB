const mongoose = require('mongoose');

const productCollection = "Products";

const courseSchema = new mongoose.Schema({
    title: String,
    description: String,
    stock: Number,    
    isNew: Boolean,
    img: String,
  

});


const productModel = mongoose.model(productCollection, courseSchema);

module.exports = { productModel };