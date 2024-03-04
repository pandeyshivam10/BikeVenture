const express = require("express");
require("dotenv").config();
const app = express();
const port = process.env.PORT || 5000;
const cors = require("cors");
const dbConnection = require("./db");

// console.log(process.env)

app.use(express.json());

app.use(cors());

app.use(
  cors({
    origin: "https://bike-venture.vercel.app",
    methods: ["GET", "POST"], 
    allowedHeaders: ["Content-Type", "Authorization"], 
  })
);

app.use("/api/bikes/", require("./routes/bikeRoutes"));
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/bookings", require("./routes/bookingRoutes"));

app.get("/", (req, res) => res.send("Hello World!"));
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
