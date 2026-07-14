import { json } from "express";

const logOutController = {}

logOutController.logOut = async (req,res) =>{
    res.ClearCookie("authCookie");
    return res.status(200),json({message:"ok"});
};

export default logOutController;