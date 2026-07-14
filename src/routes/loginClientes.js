import express from "express";
import LoginClientesController from "../controller/loginClientesController";
import router from "./ClienetsRegister";

const route = express.Router();
router.route("/").post(LoginClientesController.login);

export default router