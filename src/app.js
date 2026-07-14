import express from "express";
import ClienetsRegister from "../src/routes/ClienetsRegister.js";
import AdminRegister from "../src/routes/AdminRegister.js";
import loginAdmin from "../src/routes/loginClientes.js";
import loginClientes from "../src/routes/loginAdmin";
import { validateAuthCookie} from "../src/middlewares/authMiddlewar.js";
import cors from "cors";
import tickePurchase from "../src/routes/tickePurchaseRoutes.js";

const app = express();
app.use(
    cors({
        origin: ["http://localhost:5173"],
        Credentials: true,
    }),
);
app.use(cookiePaser());
app.use = (express.json)();

app.use("/api/ClientesRegister", ClienetsRegister);
app.use("/api/AdminRegister", AdminRegister);
app.use("/api/loginAdmin", loginAdmin);
app.use("/api/loginClientes", loginClientes);
app.use("/api/tickePurchase", tickePurchase);


export default app;