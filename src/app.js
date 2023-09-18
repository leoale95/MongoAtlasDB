const express = require('express');
const cors = require('cors');
const session = require("express-session")
const MongoStore = require("connect-mongo")
// Importar rutas
const userRouter = require('./routes/users.router');
const productRouter = require('./routes/products.router');
const cartRouter = require('./routes/cart.router');
const sessionRouter = require("./routes/sessions")
const viewsRouter = require("./routes/views")

const app = express();

//Middleware
app.use(express.json());
app.use(cors());

//Mongo
app.use(session({
    store: MongoStore.create({
        mongoUrl: "mongodb+srv://leoale95:Sanjon13@cluster.lw8azkn.mongodb.net/?retryWrites=true&w=majority",
        mongoOptions: { useNewUrlParser: true, useUnifiedTopology: true },
        ttl: 1000
    }),
    secret: "coderhouse",
    resave: false,
    saveUninitialized: true
}))

// Routes
app.use('/api/users', userRouter);
app.use('/api/products', productRouter);
app.use('/api/cart', cartRouter);
app.use("/api/sessions", sessionRouter)
app.use("/api/profile", viewsRouter)

module.exports = app;
