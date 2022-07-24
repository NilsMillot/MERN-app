const express = require("express");
const port = process.env.PORT || 3000;
const app = express();
const HttpCodesRouter = require("./routes/HttpCode");
const UserRouter = require("./routes/User");
const PostRouter = require("./routes/Post");
const SecurityRouter = require("./routes/Security");
const InvitationRouter = require("./routes/Invitation");
const FriendRouter = require("./routes/Friend");
const checkAuthentication = require("./middlewares/checkAuthentication");

app.use(express.json());

app.get("/", (req, res, next) => {
  res.send("Hello world!");
});

//app.use(HttpCodesRouter);
app.use(SecurityRouter);
app.use("/http-codes", HttpCodesRouter);
app.use("/users", checkAuthentication, UserRouter);
app.use("/posts", checkAuthentication, PostRouter);
app.use("/invitations", InvitationRouter);
app.use("/friends", FriendRouter);

app.listen(port, () => console.log(`Server started ${port}`));
