const express = require("express");
const bookingModel = require("../models/bookingModel");

const Bike = require("../models/bikeModel");

const router = express.Router();

router.post("/bookbike", async (req, res) => {
  req.body.transactionId = "1234";
  try {
    const newBooking = await bookingModel(req.body);
    await newBooking.save();
    const bike = await Bike.findOne({ _id: req.body.bike.toString() });
    bike.bookedTimeSlots.push(req.body.bookedTimeSlots);
    await bike.save()
    res.send("Your Booking is Successfully Done!");
  } catch (error) {
    return res.status(400).json({ error });
  }
});

module.exports = router;
