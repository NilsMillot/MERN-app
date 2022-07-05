const express = require("express");
const port = 5000;
const app = express();

app.use(express.json());

app.get("/", (req, res, next) => {
  res.send("Hello wooorld!");
});

app.listen(port, () => console.log(`Server started ${port}`));
