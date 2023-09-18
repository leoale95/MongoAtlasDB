const mongoose = require("mongoose");

const userCollection = "usuarios";

const userSchema = new mongoose.Schema({
    first_name: { type: String, required: true, max: 100 },
    last_name: { type: String, required: true, max: 100 },
    email: { type: String, required: true, max: 50 },
    age: { type: Number, required: true },
    password: { type: String, required: true },
});

const userModel = mongoose.model(userCollection, userSchema);

module.exports = userModel;
