const express = require("express");
const bookingModel = require("../models/bookingModel");
const Bike = require("../models/bikeModel");
const router = express.Router();
const { v4: uuidv4 } = require("uuid");
const stripe = require("stripe")(
  "sk_test_51NVqR0SIqS8BsIk6pXg7tqbYRNRwWuf9hNEvwIfIzt08ujp9vv3uEjxk3OET2vSNidH017T19g4rtpgCGUHlDbjd00ovvSor6G"
);

router.post("/bookbike", async (req, res) => {
  const { token } = req.body;
  // console.log(req.body);
  if (!token || !token.id) {
    return res.status(400).json({ error: "Invalid token" });
  }

  try {
    const customer = await stripe.customers.create({
      email: token.email,
      source: token.id,
    });

    const payment = await stripe.paymentIntents.create(
      {
        amount: req.body.totalAmount * 100,
        currency: "INR",
        customer: customer.id,
        receipt_email: token.email,
      },
      {
        idempotencyKey: uuidv4(),
      }
    );

    if (payment) {
      req.body.transactionId = token.card.id;
      const newBooking = new bookingModel(req.body);
      await newBooking.save();
      const bike = await Bike.findOne({ _id: req.body.bike.toString() });
      bike.bookedTimeSlots.push(req.body.bookedTimeSlots);
      await bike.save();
      res.send("Your Booking is Successfully Done!");
    } else {
      return res.status(400).json({ error: "Payment failed" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Something went wrong" });
  }
});


router.get("/getallbookings", async (req, res) => {
  try {
    const bookings = await bookingModel.find();
    res.send(bookings);

  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Something went wrong" });
  }
});

module.exports = router;
