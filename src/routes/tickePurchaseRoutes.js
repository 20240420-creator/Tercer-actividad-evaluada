import express from "express";
import ticketPurchaseController from "../controllers/ticketPurchaseController.js";
import { validateAuthCookie } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.route("/")
 .get(validateAuthCookie(["admin"]), ticketPurchaseController.getAllPurchases)
 .post(validateAuthCookie(["customer"]), ticketPurchaseController.insertPurchase);

router.route("/:id")
 .put(ticketPurchaseController.updatePurchase)
 .delete(validateAuthCookie(["admin"]), ticketPurchaseController.deletePurchase);
export default router;