const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const app = express();
const cors = require('cors');

app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.post('/api/form', (req, res) => {
    const htmlEmail = `
        <h3>Contact details</h3>
        <p>Name: ${req.body.Name}</p>
        <p>Email: ${req.body.Email}</p>
        <h3>Message</h3>
        <p>${req.body.Message}</p>
    `
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'yarovoy.dmytro@gmail.com',
            pass: 'Silent.pick1'
        }
    });
    const mailOptions = {
        from: 'yarovoy.dmytro@gmail.com',
        to: 'yarovoy.dmytro@gmail.com',
        subject: 'MadAppGang',
        text: req.body.Message,
        html: htmlEmail
    };
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
    res.send('hello from node')
})

const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
    console.log('Im here')
})