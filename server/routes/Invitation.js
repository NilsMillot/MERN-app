const { Router } = require("express");
const { Invitation, User, Friend } = require("../models/postgres");
const { ValidationError } = require("sequelize");
const checkAuthentication = require("../middlewares/checkAuthentication");
const {extractUserFromToken} = require("../lib/jwt");
const logger = require("../lib/logger");

const router = new Router();

const formatError = (validationError) => {
  return validationError.errors.reduce((acc, error) => {
    acc[error.path] = error.message;
    return acc;
  }, {});
};

router.get("/", checkAuthentication, async (req, res) => {
  try {
    const user = await extractUserFromToken(req);

    const sendedInvitations = await Invitation.findAll({
      where: {
        '$sender.id$': user.id
      },
      include: [
        {model: User, as: 'sender'},
        {model: User, as: 'receiver'}
      ]
    });
    const receivedInvitations = await Invitation.findAll({
      where: {
        '$receiver.id$': user.id
      },
      include: [
        {model: User, as: 'sender'},
        {model: User, as: 'receiver'}
      ]
    });
    const allInvitations = {
      sendedInvitations,
      receivedInvitations
    }
    logger.info(allInvitations);
    res.json(allInvitations);
  } catch (error) {
    res.sendStatus(500);
    logger.error(error);
  }
});

router.post("/", checkAuthentication, async (req, res) => {
  try {
    const sender = await extractUserFromToken(req);
    const receiverId = req.body.receiverId;
    await Invitation.create({
      status: "envoyé",
      senderId: sender.id,
      receiverId: receiverId
    });
    res.status(201).json("done");
  } catch (error) {
    if (error instanceof ValidationError) {
      res.status(422).json(formatError(error));
    } else {
      res.sendStatus(500);
      logger.error(error);
    }
  }
});

router.put("/:id", checkAuthentication, async (req, res) => {
  try {
    const result = await Invitation.upsert({
      id: parseInt(req.params.id, 10),
      status: req.body.status
    })

    const invitation = result[0].get();

    if (req.body.status === "accepté") {
      logger.info("triggered");
      logger.info(invitation);
      await Friend.create({
        userId: invitation.senderId,
        friendId: invitation.receiverId
      })
    }

    res.sendStatus(200);
  } catch (error) {
    logger.info(error);

    if (error instanceof ValidationError) {
      res.status(422).json(formatError(error));
    } else {
      res.sendStatus(500);
      logger.error(error);
    }
  }
});

module.exports = router;
