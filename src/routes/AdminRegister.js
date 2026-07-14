import express from "express";
import ResistreAdminController from "../controller/RegestroAdminController.js";

const router = express.Router();

router.route("/").post(ResistreAdminController.Register);
router.route("veryfy").post(ResistreAdminController.verifyCode);

export default router;
