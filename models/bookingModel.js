const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
    car: { type: mongoose.Schema.Types.ObjectId, ref: "bikes" },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
    bookedTimeSlots: {
      from: { type: String },
      to: { type: String },
    },
    hour: { type: Number },
    totalAmount: { type: Number },
    transactionId: { type: String },
    driverRequire:{type : Boolean}
  },
  { timestamps: true }
);

const bookingModel = mongoose.model("bookings", bookingSchema);

module.exports = bookingModel;
