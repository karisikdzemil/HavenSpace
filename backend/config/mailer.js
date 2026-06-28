const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: Number(process.env.EMAIL_PORT) || 587,
  secure: Number(process.env.EMAIL_PORT) === 465,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

exports.sendResetPasswordEmail = async (to, resetUrl) => {
  if (!process.env.EMAIL_HOST || !process.env.EMAIL_USER) {
    console.log(
      `[mailer] EMAIL_HOST/EMAIL_USER not configured. Reset link for ${to}: ${resetUrl}`
    );
    return;
  }

  await transporter.sendMail({
    from: process.env.EMAIL_FROM || process.env.EMAIL_USER,
    to,
    subject: "Reset your HavenSpace password",
    html: `
      <p>You requested a password reset for your HavenSpace account.</p>
      <p><a href="${resetUrl}">Click here to reset your password</a> (valid for 1 hour).</p>
      <p>If you didn't request this, you can safely ignore this email.</p>
    `,
  });
};
