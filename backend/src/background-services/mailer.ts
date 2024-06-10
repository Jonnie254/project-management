import { createTransporter } from "../config/mailConfig";

export const sendEmail = async (email: string) => {
  console.log("SendEmail...");
  const subject = "Welcome to our platform!";
  const text = "Thank you for signing up to our platform!";

  const transporter = createTransporter();

  const mailOptions = {
    from: process.env.USER,
    to: email,
    subject,
    text,
  };

  try {
    console.log("Sending email...");

    await transporter.sendMail(mailOptions);
    console.log("Email sent!");

    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};
