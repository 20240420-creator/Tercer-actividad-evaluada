import express from "express";
import ResistreClientesController from "../controller.js";

const router = express.Router();

router.route("/").post(ResistreClientesController.register);
router.route("veryfy").post(ResistreClinetesController.verifygo);

export default router