const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const vehicleSchema = new Schema(
  {
    vehicleName: {
      type: String,
      // required: true,
      trim: true,
      max: 255,
      minlength: 3,
    },
    vehicleNoPlate: {
      type: String,
      // required: true,
      unique: true,
      max: 255,
      minlength: 3,
    },
    vehicleType: {
      type: String,
      // require: true,
      max: 255,
    },
    vehicleClass: {
      type: String,
      // required: true,
      max: 255,
    },
    yearOfManufacture: {
      type: Number,
      max: 9999,
    },
    EngineCapacity: {
      type: String,
      max: 255,
    },
    fuelType: {
      type: String,
      max: 255,
    },
    RegDate: {
      type: Date,
      default: Date.now,
    },
    rentalChargePerDay: {
      type: Number
    },
  },
  { timestamps: true }
);

const Vehicle = mongoose.model("Vehicle", vehicleSchema);
module.exports = Vehicle;
