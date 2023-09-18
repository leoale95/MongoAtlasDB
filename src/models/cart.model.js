const mongoose = require('mongoose');

const cartCollection = "Cart";

const cartSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId, 
    userId: Number,
    date: Date,
    products: [
        {
            productId: Number,
            quantity: Number
        }
    ]
});

const cartModel = mongoose.model(cartCollection, cartSchema);

module.exports = cartModel;

