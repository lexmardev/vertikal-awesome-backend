const sgMail = require('@sendgrid/mail');
const env = require('./yenv.helper');
sgMail.setApiKey(env.EMAIL.API_KEY);

const sendEmail = (email) => {
  return new Promise((resolve, reject) => {
    const msg = {
      to: email, // Change to your recipient
      from: 'contact@awesomebackend.xyz', // Change to your verified sender
      subject: 'Welcome to this awesome experiencie',
      text: 'This email was generated automatically',
      html: '<strong>Have fun!</strong>',
    };
    sgMail
      .send(msg)
      .then(() => resolve(true))
      .catch(() => reject(new Error('Could not send email')));
  });
};

module.exports = {
  sendEmail,
};
