const Crypto = require("crypto");
const algorithm = "aes-256-ctr";
const EncryptioProvider = require('../utils/EncryptionManager')

// cria uma cifra responsável por decifrar os dados
const decipher = privateKey => {
    const encryptioProvider = new EncryptioProvider();
    encryptioProvider.importPrivateKey(privateKey);
    const { IV, KEY } = provider.loadSymetricKey()
    return Crypto.createDecipher(algorithm, KEY, IV);
};

module.exports = decipher;