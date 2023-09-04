const {Router} = require("express")
const { userModel } = require("../models/user.model")

const router = Router()

router.get("/", async(req, res) =>{
    try {
        let users = await userModel.find()
        res.send({ result: "success", payload: users})
    } catch (error){
        console.log(error);
    }
})

router.post("/", async (req, res) => {
    const { nombre, apellido, email } = req.body;

    if (!nombre || !apellido || !email) {
        res.send({ status: "error", error: "Faltan parámetros" });
    } else {
        try {
            const result = await userModel.create({ nombre, apellido, email });
            res.send({ result: "success", payload: result });
        } catch (error) {
            console.log(error);
            res.send({ status: "error", error: "Error en la creación del usuario" });
        }
    }
});


router.put("/:uid", async (req, res) => {
    const { uid } = req.params;
    const userToReplace = req.body;

    if (!userToReplace.nombre || !userToReplace.apellido || !userToReplace.email) {
        res.send({ status: "error", error: "Faltan parámetros" });
    } else {
        try {
            const result = await userModel.updateOne({ _id: uid }, userToReplace);
            res.send({ result: "success", payload: result });
        } catch (error) {
            console.log(error);
            res.send({ status: "error", error: "Error en la actualización del usuario" });
        }
    }
});

router.delete("/:uid", async (req, res) => {
    const { uid } = req.params;

    try {
        const result = await userModel.deleteOne({ _id: uid });
        res.send({ result: "success", payload: result });
    } catch (error) {
        console.log(error);
        res.send({ status: "error", error: "Error en la eliminación del usuario" });
    }
});





module.exports = router