const { Router } = require("express");
const { Friend, Invitation} = require("../models/postgres");
const { Op } = require("sequelize");
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
        if (friend.userId === user.id) {
          return {
            id: friend.id,
            firstname: friend.userFriend.dataValues.firstname,
            userId: friend.userId,
            friendId: friend.friendId
          };
        }
        if (friend.friendId === user.id) {
          return {
            id: friend.id,
            firstname: friend.user.dataValues.firstname,
            userId: friend.userId,
            friendId: friend.friendId
          };
        }
      });
    }

    console.log("after");
    console.log(friends);

    res.json(friends);
  } catch (error) {
    res.sendStatus(500);
    console.error(error);
  }
});

router.delete("/:id", checkAuthentication, async (req, res) => {
  const id = req.params.id;
  const userId = req.body.userId;
  const friendId = req.body.friendId;

  try {
    const friendNbLines = await Friend.destroy({
      where: {
        id: parseInt(id, 10),
      },
    });

    const invitationNbLines = await Invitation.destroy({
      where: {
        [Op.or]: [
          {[Op.and]: [{senderId: userId}, {receiverId: friendId}]},
          {[Op.and]: [{senderId: friendId}, {receiverId: userId}]}
        ]
      }
    });

    if (!friendNbLines || !invitationNbLines) {
      res.sendStatus(404);
    } else {
      res.sendStatus(204);
    }
  } catch (error) {
    res.sendStatus(500);
    console.error(error);
  }
});

module.exports = router;
