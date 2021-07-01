const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const cors = require("cors");

// the environment varables inside the dotenv file
require("dotenv").config();

//importing the routes
const userRouter = require("./routes/user.routes");
const vehicleRouter = require("./routes/vehicle.routes");
const clientRouter = require("./routes/client.routes");
const rentRouter = require("./routes/rent.routes");
const authRouter = require("./routes/auth.routes");

//Create the express server
const app = express();
const port = process.env.port || 5001;

//middleware
app.use(morgan("dev"));
app.use(cors());
app.use(express.json());

//Connecting to mondoDB Database
const uri = process.env.ATLAS_URI;
try {
  mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  });
  const connection = mongoose.connection;
  connection.once("open", () => {
    console.log("MongoDB database connection established successfully.");
  });

  connection.on("error", (err) => {
    console.log(err);
  });
} catch (err) {
  console.log(err);
}
//Use created routes
app.use("/users", userRouter);
app.use("/vehicles", vehicleRouter);
app.use("/clients", clientRouter);
app.use("/rents", rentRouter);
app.use("/auth", authRouter);

//Start the server
app.listen(port, () => {
  console.log(`server is running on port: ${port}`);
});
