const express = require("express");
const port = 5000;
const app = express();
const SecurityRouter = require("./routes/Security");

app.use(express.json());

app.get("/", (req, res, next) => {
  res.send("Hello wooorld!");
});

app.use(SecurityRouter);

app.listen(port, () => console.log(`Server started ${port}`));
