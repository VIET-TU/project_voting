require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const authRoute = require("./routes/auth");
const auserRoute = require("./routes/user");
const groupRoute = require("./routes/group");

mongoose
  .connect(
    `mongodb+srv://${process.env.USERNAME_DB}:${process.env.PASSWORD_DB}@cluster0.wsqkhoc.mongodb.net/?retryWrites=true&w=majority`
  )
  .then(() => {
    console.log("database connected success");
  })
  .catch((erro) => console.log(erro));

const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(cors());

//routes
app.use("/v1/auth", authRoute);
app.use("/v1/user", auserRoute);
app.use("/v1/group", groupRoute);

const port = process.env.PORT;

app.listen(port, () => {
  console.log(`sever listening on port ${port}`);
});
