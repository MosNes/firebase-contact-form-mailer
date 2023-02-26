// The Cloud Functions for Firebase SDK to create Cloud Functions and setup triggers.
const functions = require('firebase-functions');

//import nodemailer
const nodemailer = require('nodemailer');

// define cloud function called sendMail to trigger on HTTPS request
exports.sendMail = functions.https.onRequest(async (req, res) => {

    //get body of post request
    const data = req.body;

    res.json(data);
})