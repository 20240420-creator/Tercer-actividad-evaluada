import jsonwebtoken from "jsonwebtoken";
import { config } from "../../config.js";

export const validateAuthToken = (allowedTypes = []) => {
  return (req, res, next) => {
    try {
      const { authCookie } = req.cookies;
      if (!authCookie) {
        return res.status(401).json({ message: "No autorizado" });
      }
      const decoded = jsonwebtoken.verify(authCookie, config.jwt.secret);
      if (!allowedTypes.includes(decoded.userType)) {
        return res.status(401).json({ message: "No autorizado" });
      }
      next();
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Error interno" });
    }
  };
};
