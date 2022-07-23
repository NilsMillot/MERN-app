require("dotenv").config();
const express = require("express");
const cors = require("cors");
const port = process.env.PORT || 3000;
const app = express();
const HttpCodesRouter = require("./routes/HttpCode");
const UserRouter = require("./routes/User");
const PostRouter = require("./routes/Post");
const SendMailRouter = require("./routes/SendMail");
const SecurityRouter = require("./routes/Security");
const checkAuthentication = require("./middlewares/checkAuthentication");

app.use(express.json(), cors());

app.get("/", (req, res, next) => {
  res.send("Hello world!");
});

//app.use(HttpCodesRouter);
app.use(SecurityRouter);
app.use("/http-codes", HttpCodesRouter);
app.use("/users", checkAuthentication, UserRouter);
app.use("/posts", checkAuthentication, PostRouter);
app.use("/sendMail", SendMailRouter);

app.listen(port, () => console.log(`Server started ${port}`));
