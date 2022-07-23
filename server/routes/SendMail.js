const nodemailer = require("nodemailer");
const { Router } = require("express");
const { User } = require("../models/postgres");

const router = new Router();
const transporter = nodemailer.createTransport({
  service: process.env?.SENDER_SERVICE,
  auth: {
    user: process.env?.SENDER_ADRESS,
    pass: process.env?.SENDER_PWD,
  },
});

async function sendValidationAccountMail(mailTo, confirmationCode, firstName) {
  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: process.env?.SENDER_ADRESS, // sender address
    to: `${mailTo}`, // list of receivers
    subject: "Confirmation de votre compte COMMUNITY ✔", // Subject line
    text: `Merci ${firstName} pour la confiance que tu nous accordes, pour confirmer ton inscription, cliques sur ce lien: http://localhost:3000/sendMail/confirm/${confirmationCode}`, // plain text body
    html: `<h3 style="font-weight: 400"> Merci ${firstName} pour la confiance que tu nous accordes ! <a href="http://localhost:3000/sendMail/confirm/${confirmationCode}">Confirmer mon mail</a></h3>`, // html body
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
}

router.post("/validationAccountLink", async (req, res) => {
  try {
    sendValidationAccountMail(
      req.body.mailTo,
      req.body.confirmationCode,
      req.body.firstName
    );
    res.status(201);
  } catch (error) {
    res.sendStatus(500);
    console.error(error);
  }
});

router.get("/confirm/:confirmationCode", async (req, res) => {
  try {
    const user = await User.findOne({
      where: { confirmationCode: req.params.confirmationCode },
    });
    if (!user) {
      return res.status(404).send({ message: "User Not found." });
    }
    user.status = "active";
    user.save((err) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }
    });
    res.status(200).json(user);
  } catch (error) {
    res.sendStatus(500);
    console.error(error);
  }
});

module.exports = router;
