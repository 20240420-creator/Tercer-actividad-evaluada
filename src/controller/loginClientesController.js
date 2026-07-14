import bcrypt from "bcryptjs";
import jsonwebtoken from "jsonwebtoken";
import { config } from "../../config.js";
import ClientesModels from "../models/ClientesModels.js";
const LoginClientesController = {};

LoginClientesController.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const ClientesFound = await ClientesModels.findOne({ email });

    if (!ClientesFound) {
      return res.status(404).json({ message: "Admin no encontrado" });
    }

    if (ClientesFound.timeOut && ClientesFound.timeOut > Date.now()) {
      return res.status(403).json({ message: "Bloqueado" });
    }

    const isMatch = await bcrypt.compare(password, ClientesFound.password);

    if (!isMatch) {
      ClientesFound.loginClientesAttempts =
        (ClientesFound.loginClientesAttempts || 0) + 1;

      if (ClientesFound.loginClientesAttempts >= 5) {
        ClientesFound.timeOut = Date.now() + 5 * 60 * 1000;
        ClientesFound.loginClientesAttempts = 0;
        await ClientesFound.save();
        return res.status(403).json({ message: "Cuenta bloqueada" });
      }

      await ClientesFound.save();
      return res.status(401).json({ message: "Contraseña incorrecta" });
    }

    ClientesFound.loginClientesAttempts = 0;
    ClientesFound.timeOut = null;

    const token = jsonwebtoken.sign(
      { id: ClientesFound._id, userType: "admin" },
      config.jwt.secret,
      { expiresIn: "30d" },
    );

    res.cookie("authCookie", token, { maxAge: 30 * 24 * 60 * 60 * 1000 });
    return res.status(200).json({ message: "ok" });
  } catch (error) {
    console.log("error" + error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export default LoginClientesController;
