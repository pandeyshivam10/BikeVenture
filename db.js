const mongoose = require("mongoose");

function connectDB() {
  mongoose.connect(
    "mongodb+srv://pandeyshivam10:shivam10@cluster0.sf4djnc.mongodb.net/bikeventure",
    { useUnifiedTopology: true, useNewUrlParser: true }
  );

  const connection = mongoose.connection;

  connection.on("connected", () => {
    console.log("MongoDB connected");
  });

  connection.on("error", (error) => {
    console.log("MongoDB connection error:", error);
  });
}

connectDB();

module.exports = mongoose;
