const { Router } = require("express");
const { productModel } = require("../models/products.model");

const router = Router();

// GET /products
router.get("/", async (req, res) => {
    try {
        const { limit = 12, page = 1, sort, category, availability } = req.query;
        const limitInt = parseInt(limit);
        const pageInt = parseInt(page);

        const filters = {};
        const sortOptions = {};

        if (category) {
            filters.category = category;
        }

        if (availability) {
            filters.availability = availability === "true"; // Convierte la cadena en un booleano
        }

        if (sort === "asc" || sort === "desc") {
            sortOptions.price = sort;
        }

        const totalProducts = await productModel.countDocuments(filters);
        const totalPages = Math.ceil(totalProducts / limitInt);

        const skip = (pageInt - 1) * limitInt;
        const products = await productModel
            .find(filters)
            .sort(sortOptions)
            .skip(skip)
            .limit(limitInt);

        const hasPrevPage = pageInt > 1;
        const hasNextPage = pageInt < totalPages;

        const prevLink = hasPrevPage
            ? `/products?limit=${limitInt}&page=${pageInt - 1}&sort=${sort}&category=${category}&availability=${availability}`
            : null;

        const nextLink = hasNextPage
            ? `/products?limit=${limitInt}&page=${pageInt + 1}&sort=${sort}&category=${category}&availability=${availability}`
            : null;

        res.send({
            status: "success",
            payload: products,
            totalPages,
            prevPage: pageInt - 1,
            nextPage: pageInt + 1,
            page: pageInt,
            hasPrevPage,
            hasNextPage,
            prevLink,
            nextLink,
        });
    } catch (error) {
        console.error(error);
        res.status(500).send({ status: "error", error: "Error en la obtención de productos" });
    }
});

// GET /products/:id
router.get("/:id", async (req, res) => {
    const { id } = req.params;

    try {
        const product = await productModel.findById(id);

        if (!product) {
            return res.status(404).send({ status: "error", error: "Producto no encontrado" });
        }

        res.send({ status: "success", payload: product });
    } catch (error) {
        console.error(error);
        res.status(500).send({ status: "error", error: "Error en la obtención del producto por ID" });
    }
});

// POST /products
router.post("/", async (req, res) => {
    const productData = req.body; // El cuerpo de la solicitud contiene los datos del producto

    try {
        const result = await productModel.create(productData);
        res.status(201).send({ result: "success", payload: result });
    } catch (error) {
        console.error(error);
        res.status(500).send({ status: "error", error: "Error en la creación del producto" });
    }
});

// PUT /products/:id
router.put("/:id", async (req, res) => {
    const { id } = req.params;
    const productData = req.body;

    try {
        const result = await productModel.findByIdAndUpdate(id, productData);
        if (!result) {
            return res.status(404).send({ status: "error", error: "Producto no encontrado" });
        }
        res.send({ result: "success", payload: result });
    } catch (error) {
        console.error(error);
        res.status(500).send({ status: "error", error: "Error en la actualización del producto" });
    }
});

// DELETE /products/:id
router.delete("/:id", async (req, res) => {
    const { id } = req.params;

    try {
        const result = await productModel.findByIdAndDelete(id);
        if (!result) {
            return res.status(404).send({ status: "error", error: "Producto no encontrado" });
        }
        res.send({ result: "success", payload: result });
    } catch (error) {
        console.error(error);
        res.status(500).send({ status: "error", error: "Error en la eliminación del producto" });
    }
});

module.exports = router;
