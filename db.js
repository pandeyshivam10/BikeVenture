const mongoose = require("mongoose");

function connectDB() {
  const mongo_cred = process.env.MONGODB_CRED;

  mongoose.connect(mongo_cred, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  });

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
