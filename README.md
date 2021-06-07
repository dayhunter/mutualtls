https://blog.cloudboost.io/implementing-mutual-ssl-authentication-fc20ab2392b3https://blog.cloudboost.io/implementing-mutual-ssl-authentication-fc20ab2392b3


openssl req -new -x509 -days 365 -keyout ca-key.pem -out ca-crt.pem

Server
openssl genrsa -out server-key.pem 4096

openssl req -new -sha256 -key server-key.pem -out server-csr.pem

openssl x509 -req -days 365 -in server-csr.pem -CA ca-crt.pem -CAkey ca-key.pem -CAcreateserial -out server-crt.pem

openssl pkcs12 -export -out server-cert.p12 -in server-crt.pem -inkey server-key.pem

Client
openssl genrsa -out clientA-key.pem 4096

openssl req -new -sha256 -key clientA-key.pem -out clientA-csr.pem

openssl x509 -req -days 365 -in clientA-csr.pem -CA ca-crt.pem -CAkey ca-key.pem -CAcreateserial -out clientA-crt.pem


openssl pkcs12 -export -out clientA-cert.p12 -in clientA-crt.pem -inkey clientA-key.pem