const { Resend } = require("resend");

const resend = new Resend(process.env.RESEND_API_KEY);

module.exports = async (to, subject, html) => {
  try {
    const { data, error } = await resend.emails.send({
      from: "CareerGuideX <onboarding@resend.dev>", 
      to: to,
      subject: subject,
      html: html,
    });

    if (error) {
      console.error("RESEND ERROR:", error.message);
      throw new Error(error.message);
    }

    console.log("SEND MAIL SUCCESS:", data.id);
    return data;
  } catch (err) {
    console.error("SEND MAIL ERROR:", err.message);
    throw err;
  }
};