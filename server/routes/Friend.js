const { Router } = require("express");
const { Friend, User } = require("../models/postgres");
const { ValidationError, Op } = require("sequelize");
const checkAuthentication = require("../middlewares/checkAuthentication");
const {extractUserFromToken} = require("../lib/jwt");

const router = new Router();

router.get("/", checkAuthentication, async (req, res) => {
  try {
    const user = await extractUserFromToken(req);

    let friends = await Friend.findAll({
      where: {
        [Op.or]: [{userId: user.id}, {friendId: user.id}]
      },
      include: ['user', 'userFriend']
    });

    if (friends.length > 0) {
      friends = friends.map(friend => {
        if (friend.userId === user.id) return friend.userFriend;
        if (friend.friendId === user.id) return friend.user;
      });
    }

    res.json(friends);
  } catch (error) {
    res.sendStatus(500);
    console.error(error);
  }
});

module.exports = router;
