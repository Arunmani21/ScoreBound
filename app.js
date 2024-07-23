//configs
require("express-async-errors");
require("dotenv").config();

//imports
const express = require("express");
const connectDB = require("./config/connect");
const errorHandler = require("./middleware/errorHandler");
const notFound = require("./middleware/not-found");
const auth = require("./middleware/auth");
const authRouter = require("./routes/auth");
const playerRouter = require("./routes/player");

const app = express();

//middlewares
app.use(express.json());

//routes imports
app.use("/auth", authRouter);
app.use("/player", auth, playerRouter);

//error handler middlewares
app.use(errorHandler);
app.use(notFound);

app.get("/", (req, res) => {
  res.json(console.log("App initiated "));
});

//port setup
const port = process.env.PORT || 4000;

//DB connection and server setup
const startApp = async () => {
  try {
    await connectDB(process.env.MONGODB_URL);
    app.listen(port, () => {
      console.log(`server running on ${port}`);
    });
  } catch (error) {}
};

startApp();
