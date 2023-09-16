const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
require('dotenv').config();

const app = express();
app.use(bodyParser.json());

// Define a route for the root path
app.get('/', (req, res) => {
    res.send('Hello, World!');
  });

app.post('/send-email', async (req, res) => {
  const { name, email, message } = req.body;

  let transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  let mailOptions = {
    from: process.env.EMAIL_USER,
    to: 'edgegames23@gmail.com',
    subject: `Contact Form Submission from ${name}`,
    text: `From: ${name} (${email})\n\nMessage:\n${message}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).send('Email sent');
  } catch (error) {
    res.status(500).send('An error occurred');
  }
});

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000/');
});
