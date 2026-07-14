import express from "express";
import LoginAdminController from "../controller/loginAdminController.js";
import router from "./AdminRegister.js";

const route = express.Router();
router.route ("/").post(LoginAdminController.login);

export default router;