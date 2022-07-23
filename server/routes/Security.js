const { Router } = require("express");
const { User } = require("../models/postgres");
const { ValidationError } = require("sequelize");
const bcryptjs = require("bcryptjs");
const { createToken, checkToken } = require("../lib/jwt");
const router = new Router();

const formatError = (validationError) => {
  return validationError.errors.reduce((acc, error) => {
    acc[error.path] = error.message;
    return acc;
  }, {});
};

router.post("/register", async (req, res) => {
  try {
    const result = await User.create(req.body);
    res.status(201).json(result);
  } catch (error) {
    if (error instanceof ValidationError) {
      res.status(422).json(formatError(error));
    } else {
      res.sendStatus(500);
      console.error(error);
    }
  }
});

router.post("/checkToken", async (req, res) => {
  try {
    const user = await checkToken(req.body.token);
    if (user) {
      req.user = await User.findByPk(user.id);
      const userData = {
        id: req.user.id,
        email: req.user.email,
        firstname: req.user.firstname,
        isAdmin: req.user.isAdmin,
      };
      res.status(200).json(userData);
    } else {
      res.sendStatus(401);
    }
  } catch (error) {
    res.sendStatus(500);
    console.error(error);
  }
});

router.post("/login", async (req, res) => {
  try {
    // in theory it is supposed to allow us to authorize the sources where our api is called
    // (I don't think it is enough :))
    // *
    // res.header("Access-Control-Allow-Origin", "*");
    // res.header(
    //   "Access-Control-Allow-Methods",
    //   "GET, POST, PATCH, PUT, DELETE, OPTIONS"
    // );
    // res.header(
    //   "Access-Control-Allow-Headers",
    //   "Origin, Content-Type, X-Auth-Token"
    // );
    // res.header("Access-Control-Allow-Origin", "http://localhost:3001");
    const result = await User.findOne({
      where: {
        email: req.body.email,
      },
    });
    if (!result) {
      res.status(401).json({
        email: "Email not found",
      });
      return;
    }
    // TODO: display popup message
    if (result.status != "active") {
      return res.status(401).send({
        pendingAccount: "Pending Account. Please Verify Your Email!",
      });
    }
    if (!(await bcryptjs.compare(req.body.password, result.password))) {
      res.status(401).json({
        password: "Password is incorrect",
      });
      return;
    }
    res.json({ token: await createToken(result) });
  } catch (error) {
    res.sendStatus(500);
    console.error(error);
  }
});

module.exports = router;
