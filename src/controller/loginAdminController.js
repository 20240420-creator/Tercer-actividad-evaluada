import bcrypt from "bcryptjs";
import jsonwebtoken from "jsonwebtoken";
import { config } from "../config"; 
import adminModel from "../models/adminModel"; 
const LoginAdminController = {};

LoginAdminController.login = async (req, res) => {

  try {

    const { email, password } = req.body;
    const adminFound = await adminModel.findOne({ email });

    if (!adminFound) {
      return res.status(404).json({ message: "Admin no encontrado" });

    }


    if (adminFound.timeOut && adminFound.timeOut > Date.now()) {
      return res.status(403).json({ message: "Bloqueado" });

    }

    const isMatch = await bcrypt.compare(password, adminFound.password);

    if (!isMatch) {

      adminFound.loginAdminAttempts = (adminFound.loginAdminAttempts || 0) + 1;

      if (adminFound.loginAdminAttempts >= 5) {

        adminFound.timeOut = Date.now() + 5 * 60 * 1000; 
        adminFound.loginAdminAttempts = 0;
        await adminFound.save();
        return res.status(403).json({ message: "Cuenta bloqueada" });

      }

      await adminFound.save();
      return res.status(401).json({ message: "Contraseña incorrecta" });

    }

    adminFound.loginAdminAttempts = 0;
    adminFound.timeOut = null;

    const token = jsonwebtoken.sign(
      { id: adminFound._id, userType: "admin" },
      config.jwt.secret,
      { expiresIn: "30d" }

    );

    res.cookie("authCookie", token, { maxAge: 30 * 24 * 60 * 60 * 1000 });
    return res.status(200).json({ message: "ok" });

  } catch (error) {
    console.log("error" + error);
    return res.status(500).json({ message: "Internal server error" });
  }

};

export default LoginAdminController;
 