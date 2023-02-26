const functions = require("firebase-functions");
const { defineInt, defineString } = require('firebase-functions/params');

//import nodemailer
const nodemailer = require('nodemailer');

//define env parameters
const recipient = defineString('EMAIL_RECIPIENT');
const user = defineString('APP_USER');
const password = defineString('APP_PASSWORD');

//set up nodemailer transport envelope
const mailTransport = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: user,
        password: password,
    },
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
    const data = req.body;

    const response = sendEmail(data.name, data.email, data.message);

    res.json(response);
})