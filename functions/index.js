const functions = require("firebase-functions");
const { defineInt, defineString } = require('firebase-functions/params');

//import nodemailer
const nodemailer = require('nodemailer');

//define env parameters
const recipient = defineString('EMAIL_RECIPIENT');
const user = defineString('APP_USER');
const password = defineString('APP_PASSWORD');

exports.sendMail = functions.https.onRequest( (req, res) => {
    const data = req.body;

    res.json(data);
})