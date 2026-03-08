import nodemailer from "nodemailer";
const GooglePassKey = process.env.ADMIN_API_GOOGLE_PASSWORD;
const GoogleEmail = process.env.ADMIN_API_GOOGLE_EMAIL;

export const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: GoogleEmail,
    pass: GooglePassKey,
  },
});

transporter.verify().then(() => {
  console.log("Listo para enviar correo")
})