import { Router } from "express";

const router = Router();

import cartManager from "../managers/cart.manager.js";
import { _dirname } from "../path.js";
const cartManager = new CartManager(`${_dirname}/db/carts.json`);

router.post("/:idCart/product/:idProd", async (req, res, next) => {
    try {
        const { idCart, idProd } = req.params;
        const response = await cartManager.saveProductToCart(idCart, idProd);
        res.json(response);
    } catch (error) {
        next(error);
    }
});

router.post("/", async (req, res) => {
    try {
        res.json(await cartManager.createCart());
    } catch (error) {
        res.status(500).json(error.message);
    }
});

router.get("/:idCart", async (req, res) => {
    try {
        const {idCart} = req.params
        res.json(await cartManager.getCartById(idCart))
    } catch (error) {
        console.log(error)
    }
});

export default router