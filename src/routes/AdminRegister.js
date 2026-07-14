import express from "express";
import ResistreAdminController from "../controller.js";

const router = express.Router();

router.route("/").post(ResistreAdminController.register);
router.route("veryfy").post(ResistreAdminController.verifygo);

export default router