const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: process.env?.SENDER_SERVICE,
  auth: {
    user: process.env?.SENDER_ADRESS,
    pass: process.env?.SENDER_PWD,
  },
});

const sendMailBasic = async function (mailTo, subject, content) {
  try {
    const mailOptions = {
      from: process.env?.SENDER_ADRESS,
      to: mailTo,
      subject: subject,
      html: content,
    };
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.log(error, "email not sent");
  }
};

module.exports = sendMailBasic;
