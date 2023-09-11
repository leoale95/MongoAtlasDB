const { Router } = require("express");
const Cart = require("../models/cart.model");

const router = Router();

// POST api/carts/:cid/products
router.post("/:cid/products", async (req, res) => {
    const { cid } = req.params;
    const { products } = req.body;

    try {
        const cart = await Cart.findByIdAndUpdate(
            cid,
            { products },
            { new: true }
        );

        if (!cart) {
            return res.status(404).send({ status: "error", error: "Carrito no encontrado" });
        }

        res.send({ result: "success", payload: cart });
    } catch (error) {
        console.error(error);
        res.status(500).send({ status: "error", error: "Error en la actualización del carrito" });
    }
});

// PUT api/carts/:cid/products/:pid
router.put("/:cid/products/:pid", async (req, res) => {
    const { cid, pid } = req.params;
    const { quantity } = req.body;

    try {
        const cart = await Cart.findById(cid);

        if (!cart) {
            return res.status(404).send({ status: "error", error: "Carrito no encontrado" });
        }

        const productIndex = cart.products.findIndex(product => product.productId == pid);

        if (productIndex === -1) {
            return res.status(404).send({ status: "error", error: "Producto no encontrado en el carrito" });
        }

        cart.products[productIndex].quantity = quantity;

        const updatedCart = await cart.save();
        res.send({ result: "success", payload: updatedCart });
    } catch (error) {
        console.error(error);
        res.status(500).send({ status: "error", error: "Error en la actualización del carrito" });
    }
});

// DELETE api/carts/:cid/products/:pid
router.delete("/:cid/products/:pid", async (req, res) => {
    const { cid, pid } = req.params;

    try {
        const cart = await Cart.findById(cid);

        if (!cart) {
            return res.status(404).send({ status: "error", error: "Carrito no encontrado" });
        }

        cart.products = cart.products.filter(product => product.productId != pid);

        const updatedCart = await cart.save();
        res.send({ result: "success", payload: updatedCart });
    } catch (error) {
        console.error(error);
        res.status(500).send({ status: "error", error: "Error en la eliminación del producto del carrito" });
    }
});

// DELETE api/carts/:cid
router.delete("/:cid", async (req, res) => {
    const { cid } = req.params;

    try {
        const cart = await Cart.findByIdAndDelete(cid);

        if (!cart) {
            return res.status(404).send({ status: "error", error: "Carrito no encontrado" });
        }

        res.send({ result: "success", payload: cart });
    } catch (error) {
        console.error(error);
        res.status(500).send({ status: "error", error: "Error en la eliminación del carrito" });
    }
});

module.exports = router;
