import express from "express";
import LoginAdminController from "../controller/loginAdminController";
import router from "./AdminRegister";

const route = express.Router();
router.route("/").post(LoginAdminController.login);

export default router