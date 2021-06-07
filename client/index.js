const fs = require('fs');
var https = require('https');
const punycode = require('punycode');

var options1 = {
    host: 'cluster-bot-api-dev-548fd6a28b348bac05e255734527192a-0000.jp-tok.containers.appdomain.cloud',
    port: 9999,
    path: '/',
    method: 'GET',
    pfx: fs.readFileSync("cert2/ktb/NEW06298331195001241_191018111151.p12"),
    passphrase: 'BCh@in201910',
    ca: [fs.readFileSync('cert2/CA/1_NRCA.cer'), fs.readFileSync('cert2/CA/2_TDIDCA_G3.cer')],

    requestCert: true,
    rejectUnauthorized: true,

    // pfx: fs.readFileSync("cert/clientA-cert.p12"),
    // passphrase: 'password',
    // ca: fs.readFileSync("cert/ca-crt.pem")

    // key: fs.readFileSync("cert/clientA-key.pem"),
    // cert: fs.readFileSync("cert/clientA-crt.pem"),
    // ca: fs.readFileSync("cert/ca-crt.pem")
};
var req1 = https.request(options1, function (res) {
    console.log("Client A statusCode: ", res.statusCode);
    console.log("Client A headers: ", res.headers);
    console.log("Server Host Name: " + res.connection.getPeerCertificate().subject.CN);
    res.on('data', function (d) {
        process.stdout.write(d);
    });
});
req1.end();
req1.on('error', function (e) {
    console.error(e);
});