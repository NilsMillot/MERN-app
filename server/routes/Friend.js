const { Router } = require("express");
const { Friend, User } = require("../models/postgres");
const { ValidationError } = require("sequelize");
const checkAuthentication = require("../middlewares/checkAuthentication");
const {extractUserFromToken} = require("../lib/jwt");

const router = new Router();

router.get("/", checkAuthentication, async (req, res) => {
  try {
    const user = await extractUserFromToken(req);

    const friends = await Friend.findAll({
      where: {
        userId: user.id
      },
      attributes: [],
      include: 'userFriend'
    });
    res.json(friends);
  } catch (error) {
    res.sendStatus(500);
    console.error(error);
  }
});

module.exports = router;
