const express = require('express')
const mongoose = require('mongoose')
const cors = require("cors")
const userRouter = require("./routes/users.router")
const productRouter = require("./routes/products.router");
const cartRouter = require('./routes/cart.router')

// Server
const app = express()
const port = 8080
app.listen(port,() =>{
    console.log(`Server is running on port ${port}`)
} )

// Middlewords
app.use(express.json())
app.use(cors());

// Base de datos
const enviroment = async ()=> {

    await mongoose.connect('mongodb+srv://leoale95:Sanjon13@cluster.lw8azkn.mongodb.net/?retryWrites=true&w=majority')
    .then(()=>{
        console.log("Conectado a la bd de mongo atlas")
    })
    .catch(error =>{
        console.error("Error en la conexion", error)
    })
 }
enviroment ()

// Routes
app.use("/api/users", userRouter );
app.use("/api/products", productRouter);
app.use("/api/cart", cartRouter);
