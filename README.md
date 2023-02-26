# Firebase Contact Form Mailer

## Usage
- clone repo to local machine
- create .env file in functions folder with the following values:
    - EMAIL_RECIPIENT = Email Address to send the emails to
    - APP_USER = Email address to send the emails as
    - CLIENT_ID = Your OAUTH client ID
    - CLIENT_SECRET = Your OAUTH client secret
    - REFRESH_TOKEN = Your OAUTH client refresh token
- run firebase login
- add firebase project
- run firebase deploy to deploy sendMail function
- send POST request to the sendMail endpoint containing a JSON object with
    - name: name of the user who filled out the form
    - email: email of the user who filled out the form
    - message: message written by the user who filled out the form