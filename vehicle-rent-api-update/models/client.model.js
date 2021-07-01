const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const clientSchema = new Schema(
  {
    clientName: {
      type: String,
      // required: true,
      trim:true,
      max: 255,
      minlength:3,
    },
    email: {
      type: String,
      max: 255,
    },
    contactNo: {
      type: Number,
      min: 6,
    },
    regDate: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

const Client = mongoose.model("Client", clientSchema);
module.exports = Client;
