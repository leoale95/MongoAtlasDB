const { Router } = require("express");
const { productModel } = require("../models/products.model");

const router = Router();

router.get("/", async (req, res) => {
    try {
        let products = await productModel.find();
        res.send({ result: "success", payload: products });
    } catch (error) {
        console.log(error);
        res.send({ status: "error", error: "Error en la obtención de productos" });
    }
});

router.post("/", async (req, res) => {
    const { title, description, stock, isNew, img } = req.body;

    if (!title || !description || isNaN(stock) || typeof isNew !== "boolean" || !img) {
        res.send({ status: "error", error: "Faltan parámetros o parámetros inválidos" });
    } else {
        try {
            const result = await productModel.create({ title, description, stock, isNew, img });
            res.send({ result: "success", payload: result });
        } catch (error) {
            console.log(error);
            res.send({ status: "error", error: "Error en la creación del producto" });
        }
    }
});

router.put("/:pid", async (req, res) => {
    const { pid } = req.params;
    const productToUpdate = req.body;

    if (!productToUpdate.title || !productToUpdate.description || isNaN(productToUpdate.stock) || typeof productToUpdate.isNew !== "boolean" || !productToUpdate.img) {
        res.send({ status: "error", error: "Faltan parámetros o parámetros inválidos" });
    } else {
        try {
            const result = await productModel.updateOne({ _id: pid }, productToUpdate);
            res.send({ result: "success", payload: result });
        } catch (error) {
            console.log(error);
            res.send({ status: "error", error: "Error en la actualización del producto" });
        }
    }
});

router.delete("/:pid", async (req, res) => {
    const { pid } = req.params;

    try {
        const result = await productModel.deleteOne({ _id: pid });
        res.send({ result: "success", payload: result });
    } catch (error) {
        console.log(error);
        res.send({ status: "error", error: "Error en la eliminación del producto" });
    }
});

module.exports = router;
