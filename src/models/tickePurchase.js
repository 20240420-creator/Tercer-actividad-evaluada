import mongoose, {Schema, model} from "mongoose"

const ticketPurchaseSchema = new Schema({
    customerId: {
        type: mongoose.Types.ObjectId,
        ref: "Cliente"

    },
    quantity: {type: Number},
    purchaseDate: {type: Date},
    total: {type: Number},
    paymentStatus: {type: String},
    transactionId: {type: String}

},{
    timestamps: true,
    strict: false

})
export default model("TicketPurchase", ticketPurchaseSchema)
 