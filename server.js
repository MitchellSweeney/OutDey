const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cookieParser = require('cookie-parser');

dotenv.config();

const authRouter = require("./routes/authRoutes");
const eventRouter = require("./routes/eventRoutes");

const app = express();
const port = process.env.PORT || 3690;
const mongoConn = process.env.MONGO_URI;

app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: true, credentials: true }));
app.use("/api/auth", authRouter);
app.use("/api/event", eventRouter);

mongoose
  .connect(mongoConn)
  .then(() => {
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  })
  .catch((e) => console.log(e));

module.exports = app;
