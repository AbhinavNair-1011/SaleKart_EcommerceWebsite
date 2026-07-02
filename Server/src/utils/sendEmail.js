const brevoInstance = require("../config/brevo");

async function sendEmail({
  to,
  subject,
  htmlContent,
}) {
  await brevoInstance.transactionalEmails.sendTransacEmail({
    sender: {
      name: process.env.BREVO_SENDER_NAME,
      email: process.env.BREVO_SENDER_EMAIL,
    },

    to: [
      {
        email: to,
      },
    ],

    subject,

    htmlContent,
  });
}

module.exports = sendEmail;