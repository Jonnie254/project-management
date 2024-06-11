import { createTransporter } from "../config/mailConfig";

export const sendEmail = async (
  email: string,
  subject: string,
  text: string
) => {
  const transporter = createTransporter();

  const mailOptions = {
    from: process.env.USER,
    to: email,
    subject,
    text,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Email sent");
  } catch (error) {
    console.log("Error sending email");
  }
};
