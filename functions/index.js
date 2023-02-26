const functions = require("firebase-functions");

//import CORS middleware, and set to allow any origin
const cors = require('cors')({
    origin: true,
});

//import nodemailer
const nodemailer = require('nodemailer');

//define env parameters
const recipient = process.env.EMAIL_RECIPIENT;
const user = process.env.APP_USER;
// const password = process.env.APP_PASSWORD;

// functions.logger.log([recipient.value(), user.value()]);

//set up nodemailer transport envelope
const mailTransport = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    // auth: {
    //     user: user,
    //     password: password,
    // },
    auth: {
        type: "OAuth2",
        user: user,
        clientId: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        refreshToken: process.env.REFRESH_TOKEN,
    }
});

//function to build email template
const buildTemplate = (name, email, message) => {
    const emailTemplate = `
    <p>Name: ${name}</p>
    <br>
    <p>Email: ${email}</p>
    <br>
    <p>Message:</p>
    <br>
    <p>${message}</p>
    `;
return emailTemplate;
};

//function to send email 
const sendEmail = async (name, email, message) => {
    //build message body
    const template = buildTemplate(name, email, message);

    //add sender and recipient
    const mailOptions = {
        from: 'MosNes Portfolio Site <7hekarl@gmail.com>',
        to: recipient
    };

    //add message HTML body
    mailOptions.html = template;

    //add subject line
    mailOptions.subject = `${name} has left you a message on your Portfolio Site`;

    //logs name and email of user who submitted to the contact form
    functions.logger.log(`New message from ${name} - ${email}`);

    //attempts to send email, logs error if failed, or info if successful
    const response = await mailTransport.sendMail(mailOptions, (info, err) => {
        if (err) {
            functions.logger.log('Something went wrong.');
            functions.logger.log(err);
            return;
        }
        functions.logger.log(info);
    });
    
    return response;
}

exports.sendMail = functions.https.onRequest( (req, res) => {

    //start using cors middleware
    cors(req, res, () => {
        const data = req.body;

        const response = sendEmail(data.name, data.email, data.message);

        res.status(200).send(response);
    });
});

exports.sendEmail = sendEmail;