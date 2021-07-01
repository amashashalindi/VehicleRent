const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const rentSchema = new Schema(
  {
    clientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Client",
    },
    vehicleId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Vehicle",
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    totalPrice: { type: Number },
    flag: { type: Number },
    requestedDate: { type: Date, default: Date.now },
    boughtDate: { type: Date },
    deliveryDate: { type: Date },
  },
  { timestamps: true }
);

const Rent = mongoose.model("Rent", rentSchema);
module.exports = Rent;
