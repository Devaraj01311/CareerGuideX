const axios = require("axios");

module.exports = async (to, subject, html) => {
  try {
    const response = await axios.post(
      "https://api.brevo.com/v3/smtp/email",
      {
        // Name of your app and the email you used to register at Brevo
        sender: { name: "CareerGuideX", email: "devarajldev01@gmail.com" }, 
        to: [{ email: to }],
        subject: subject,
        htmlContent: html,
      },
      {
        headers: {
          "api-key": process.env.BREVO_API_KEY, 
          "Content-Type": "application/json",
        },
      }
    );
    console.log("Email sent successfully to:", to);
    return response.data;
  } catch (err) {
    console.error("BREVO ERROR:", err.response?.data || err.message);
    throw new Error("Email service failed");
  }
};