const sendMail = require("./sendEmail");

const sendVerificationEmail = async (email, code) => {
  const html = `
    <div style="font-family: Arial">
      <h2>Verify your email</h2>
      <p>Your CareerGuideX verification code is:</p>
      <h1 style="letter-spacing: 4px">${code}</h1>
      <p>This code expires in 10 minutes.</p>
    </div>
  `;

  await sendMail(email, "Email Verification", html);
};

module.exports = sendVerificationEmail;
