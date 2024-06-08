import { createTransport } from "nodemailer";

export const createTransporter = () => {
  const transporter = createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.USER,
      pass: process.env.APP_PASSWORD,
    },
  });
  return transporter;
};
