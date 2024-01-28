import express from "express";
import nodemailer from "nodemailer";
const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "Welcome to nodemailer API" });
});

app.post("/send-email", (req, res) => {
  const { email, to, subject, body, password } = req.body;

  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: email,
      pass: password,
    },
    tls: {
      version: "TLSv1.2",
    },
  });

  const mailOptions = {
    from: email,
    to: to,
    subject: subject,
    html: body,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      res.status(500).send("Error sending email");
    } else {
      res.status(200).json({ message: "Email sent", info });
    }
  });
});

app.listen(5000, () => {
  console.log("Server started on port 5000");
});
