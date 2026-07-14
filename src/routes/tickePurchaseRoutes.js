import express from "express";
import ticketPurchaseController from "../controller/ticketPurchaseController.js";
import { validateAuthToken } from "../middlewares/authMiddlewar.js";

const router = express.Router();

router
  .route("/")
  .get(validateAuthToken(["admin"]), ticketPurchaseController.getAllPurchases)
  .post(
    validateAuthToken(["customer"]),
    ticketPurchaseController.insertPurchase,
  );

router
  .route("/:id")
  .put(ticketPurchaseController.updatePurchase)
  .delete(
    validateAuthToken(["admin"]),
    ticketPurchaseController.deletePurchase,
  );
export default router;
