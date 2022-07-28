require("dotenv").config();
const express = require("express");
const cors = require("cors");
const port = process.env.PORT || 3000;
const app = express();
const HttpCodesRouter = require("./routes/HttpCode");
const MessagesRouter = require("./routes/messages");
const ConversationsRouter = require("./routes/conversations");
const UserRouter = require("./routes/User");
const PostRouter = require("./routes/Post");
const SendMailRouter = require("./routes/SendMail");
const SecurityRouter = require("./routes/Security");
const InvitationRouter = require("./routes/Invitation");
const FriendRouter = require("./routes/Friend");
const checkAuthentication = require("./middlewares/checkAuthentication");
const LogRouter = require("./routes/Log");

app.use(express.json(), cors());

app.get("/", (req, res, next) => {
  res.send("Hello world!");
});

//app.use(HttpCodesRouter);
app.use(SecurityRouter);
app.use("/http-codes", HttpCodesRouter);
app.use("/users", checkAuthentication, UserRouter);
app.use("/posts", checkAuthentication, PostRouter);
app.use("/messages", checkAuthentication, MessagesRouter);
app.use("/conversations", checkAuthentication, ConversationsRouter);
app.use(SendMailRouter);
app.use("/invitations", InvitationRouter);
app.use("/friends", FriendRouter);
app.use("/logs", LogRouter);

app.listen(port, () => console.log(`Server started ${port}`));
