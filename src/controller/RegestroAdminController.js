import nodemailer from "nodemailer";
import crypto from "crypto";
import jsonwebtoken from "jsonwebtoken";
import bcryptjs from "bcryptjs";
import AdminMOdels from "../models/AdminModels.js";
import { config } from "../../config.js";

const registroAdminController = {};

registroAdminController.Register = async (req, res) => {

  try {

    const { name, email, password, isVerified, LoginAttempts, timeOut } = req.body;
    const passwordHashed = await bcryptjs.hash(password, 10);
    const randomCode = crypto.randomBytes(3).toString("hex");
    const token = jsonwebtoken.sign(

      {
        randomCode,
        name,
        email,
        password: passwordHashed,
        isVerified,
        LoginAttempts,
        timeOut,
      },

      config.jwt.secret,
      { expiresIn: "15m" }

    );

    res.cookie("registrationCookie", token, { maxAge: 15 * 60 * 1000 });

    const transporter = nodemailer.createTransport({

      service: "gmail",
      auth: {
        user: config.email.user_email,
        pass: config.email.user_password,
      },

    });

    const mailOptions = {

      from: config.email.user_email,
      to: email,
      subject: "Verificación de cuenta",
      text: "Verifica tu cuenta: " + randomCode,

    };

    transporter.sendMail(mailOptions, (error, info) => {

      if (error) {

        console.log("error" + error);
        return res.status(500).json({ message: "error" });
      }
      return res.status(200).json({ message: "OK" });

    });

  } catch (error) {
    console.log("error" + error);
    return res.status(500).json({ message: "Internal server error" });

  }

};

registroAdminController.verifyCode = async (req, res) => {

  try {

    const { verificationCodeRequest } = req.body;
    const token = req.cookies.registrationCookie;
    const decoded = jsonwebtoken.verify(token, config.jwt.secret);

    const {

      randomCode: storedCode,
      name,
      email,
      password,
      isVerified,
      LoginAttempts,
      timeOut,

    } = decoded;

    if (verificationCodeRequest !== storedCode) {

      return res.status(400).json({ message: "Código inválido" });

    }

    const newAdmin = AdminMOdels({
      name,
      email,
      password,
      isVerified: true,

    });

    await newAdmin.save();

    res.clearCookie("registrationCookie");

    return res.status(200).json({ message: "OK" });

  } catch (error) {

    console.log("error" + error);

    return res.status(500).json({ message: "Internal server error" });

  }

};

export default registroAdminController;