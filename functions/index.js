// The Cloud Functions for Firebase SDK to create Cloud Functions and setup triggers.
const functions = require('firebase-functions');

// define cloud function called sendMail to trigger on HTTPS request
exports.sendMail = functions.https.onRequest(async (req, res) => {

    //get body of post request
    const data = req.body;

    
})