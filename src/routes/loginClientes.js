import express from "express";
import LoginClientesController from "../controller/loginClientesController.js";
import router from "./ClienetsRegister.js";

const route = express.Router();
router.route("/").post(LoginClientesController.login);

export default router