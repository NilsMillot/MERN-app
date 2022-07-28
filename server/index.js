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
const InvitationRouter = require("./routes/Invitation");
const FriendRouter = require("./routes/Friend");
const checkAuthentication = require("./middlewares/checkAuthentication");
const { checkToken } = require("./lib/jwt");
const { User } = require("./models/postgres");
const LogRouter = require("./routes/Log");

app.use(express.json(), cors());

app.get("/", (req, res, next) => {
  res.send("Hello world!");
});

app.get("/me", async (req, res) => {
  const header = req.headers.authorization;
  if (!header) {
    return res.sendStatus(401);
  }
  const [type, token] = header.split(/\s+/);
  if (type !== "Bearer") {
    return res.sendStatus(401);
  }
  const user = await checkToken(token);
  if (user) {
    req.user = await User.findByPk(user.id);
    const onlyFewFields = {
      preferedStack: req.user.preferedStack,
    };
    res.json(onlyFewFields);
  } else {
    res.sendStatus(401);
  }
});

app.post("/preferedStack", async (req, res) => {
  const header = req.headers.authorization;
  if (!header) {
    return res.sendStatus(401);
  }
  const [type, token] = header.split(/\s+/);
  if (type !== "Bearer") {
    return res.sendStatus(401);
  }
  const user = await checkToken(token);
  if (user) {
    req.user = await User.findOne({
      where: {
        id: user.id,
      },
    });
    user.preferedStack = req.body.preferedStack;
    user.save((err) => {
      if (err) {
        res.status(502).send({ message: err });
        return;
      }
    });
  } else {
    res.sendStatus(401);
  }
});

//app.use(HttpCodesRouter);
app.use(SecurityRouter);
app.use("/http-codes", HttpCodesRouter);
app.use("/users", checkAuthentication, UserRouter);
app.use("/posts", checkAuthentication, PostRouter);
app.use(SendMailRouter);
app.use("/invitations", InvitationRouter);
app.use("/friends", FriendRouter);
app.use("/logs", LogRouter);

app.listen(port, () => console.log(`Server started ${port}`));
