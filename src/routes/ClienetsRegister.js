import express from "express";
import ResistreClientesController from "../controller/registroClientesCntroller.js";

const router = express.Router();

router.route("/").post(ResistreClientesController.Register);
router.route("veryfy").post(ResistreClientesController.verifyCode);

export default router;
