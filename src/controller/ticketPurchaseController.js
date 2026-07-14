import ticketPurchaseModel from "../models/tickePurchase.js";
const ticketPurchaseController = {};
ticketPurchaseController.getAllPurchases = async (req, res) => {
 try {
   const purchases = await ticketPurchaseModel
     .find()
     .populate("customerId", "name email");
   return res.status(200).json(purchases);
 } catch (error) {
   console.log("error" + error);
   return res.status(500).json({ message: "Internal server error" });
 }
};
ticketPurchaseController.insertPurchase = async (req, res) => {
 try {
   const { customerId, quantity, purchaseDate, total, paymentStatus, transactionId } = req.body;
   const newPurchase = new ticketPurchaseModel({
     customerId,
     quantity,
     purchaseDate,
     total,
     paymentStatus,
     transactionId,
   });
   await newPurchase.save();
   return res.status(200).json({ message: "Purchase created" });
 } catch (error) {
   console.log("error" + error);
   return res.status(500).json({ message: "Internal server error" });
 }
};

ticketPurchaseController.updatePurchase = async (req, res) => {
 try {
   const { customerId, quantity, purchaseDate, total, paymentStatus, transactionId } = req.body;
   const updatedPurchase = await ticketPurchaseModel.findByIdAndUpdate(
req.params.id,
     {
       customerId,
       quantity,
       purchaseDate,
       total,
       paymentStatus,
       transactionId,
     },
     { new: true },
   );
   return res.status(200).json({ message: "Purchase updated" });
 } catch (error) {
   console.log("error" + error);
   return res.status(500).json({ message: "Internal server error" });
 }
};

ticketPurchaseController.deletePurchase = async (req, res) => {
 try {
   await ticketPurchaseModel.findByIdAndDelete(req.params.id);
   return res.status(200).json({ message: "Purchase deleted" });
 } catch (error) {
   console.log("error" + error);
   return res.status(500).json({ message: "Internal server error" });
 }
};
export default ticketPurchaseController;