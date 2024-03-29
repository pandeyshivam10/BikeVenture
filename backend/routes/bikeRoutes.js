const express = require("express");

const router = express.Router();
const auth = require("../middleware/auth");
const Bike = require("../models/bikeModel")

router.get("/getallbikes",auth,async(req,res)=>{
    try {

        const bikes = await Bike.find()
        res.send(bikes)
        
    } catch (error) {
       return res.status(400).json(error)
    }
})

module.exports = router;