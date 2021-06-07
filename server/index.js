const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const fs = require('fs');
var clientCertificateAuth = require('client-certificate-auth');
var https = require('https');
var opts = {
    // pfx: fs.readFileSync(`cert2/bot/NEW06298331195001206_621001121315.p12`),
    // passphrase: 'DLTmflv[@3',
    pfx: fs.readFileSync(`cert2/bot-dev/cluster-bot-api-dev.pfx`),
    passphrase: 'P@ssw0rd',
    ca: [fs.readFileSync('cert2/CA/1_NRCA.cer'), fs.readFileSync('cert2/CA/2_TDIDCA_G3.cer')],
    
    // pfx: fs.readFileSync(`cert/server-cert.p12`),
    // passphrase: 'qwerty',
    // ca: fs.readFileSync('cert/ca-crt.pem'),
    

    // // Specify the key file for the server
    // key: fs.readFileSync('cert/server-key.pem'),
    // // Specify the certificate file
    // cert: fs.readFileSync('cert/server-crt.pem'),
    // // Specify the Certificate Authority certificate
    // ca: fs.readFileSync('cert/ca-crt.pem'),
    
    // Requesting the client to provide a certificate, to authenticate the user.
    requestCert: true,
    // As specified as "true", so no unauthenticated traffic
    // will make it to the specified route specified
    rejectUnauthorized: true
};

var checkAuth = function (cert) {
    // Here one can apply any business logic based on the certificate details received
    // In this code access is only allowed to Client A.
    console.log('Client Certificate: ', cert);
    console.log('Client Certificate Common Name: ' + cert.subject.CN);
    // return cert.subject.CN === 'testclienta.com';
    return cert.subject.CN === 'ธนาคารกรุงไทย จำกัด (มหาชน)';
};

const app = express();
app.use(morgan('combined'))
app.use(bodyParser.json())
app.use(cors())
app.use(clientCertificateAuth(checkAuth));

app.get('/', (req, res) => {
    console.log('ok');
    res.send('Done');
  });




https.createServer(opts, app)
    .listen(9999, '0.0.0.0', () => {
        console.log('app is running on port 9999');
    });

    // app.listen(9999, () => {
    //     console.log('API is Listening on port 9999')
    //   });

// // Create this rest service on the server to provide the welcome message based on the provided name
// var trouter = require('userController.js');
// router.get("/greetUser/:userName", trouter.greetUser);
// // Service defined in controller.js
// module.exports = {
//     greetUser: greetUser
// };
// // Method to greet a user
// function greetUser(request, response) {
//     var result = {};
//     varuserName = request.params.userName;
//     result.message = "Hey " + userName + "! Howz it going...";
//     response.status(200).send(result);
//     return result;
// }