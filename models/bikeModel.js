const mongoose = require('mongoose')

const bikeSchema = new mongoose.Schema({

    name : {type: String , required : true},
    image : {type: String , required : true},
    capacity : {type: Number , required : true},
    feulType : {type: String , required : true},
    bookedSlots : [
        {
            from : {type : String , required : true},
            to : {type : String , required : true},
        }
    ],
    rentPerHour : {type: Number , required : true}
},{timestamps:true}
)
const bikeModel = mongoose.model('bikes',bikeSchema)
module.exports= bikeModel




