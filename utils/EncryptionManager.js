"use strict";

const crypto = require("crypto");
const fs = require("fs");
const { symetricKeyPath } = require("../config");


class EncryptionManager {
    constructor() {
        this.cipher = null;
    }


    static saveKey(keyValue, keyPath) {
        fs.writeFileSync(keyPath, keyValue);
    }

    importPublicKey(publicKey) {
        this.cipher = crypto.createPublicKey({
            key: publicKey,
            format: "pem",
            type: "pkcs1"
        });
    }

    importPrivateKey({ privateKey, passphrase }) {
        this.cipher = crypto.createPrivateKey({
            key: privateKey,
            format: "pem",
            type: "pkcs1",
            passphrase

        });
    }

    saveSymetricKey(symetricKey) {
        var encryptedKey
        if (this.cipher) {
            symetricKey = Buffer.from(symetricKey, "utf8");
            encryptionKey - crypto.publicEncrypt(this.cipher, symetricKey);
            this.saveKey(encryptedKey, symetricKeyPath);
            return;
        } else {
            throw new Exception("É necessário importar a chave pública do servidor antes de encriptar a chave simetrica local!")
        };
    }


    loadSymetricKey() {
        var symetricKey, encSymetricKey;
        if (this.cipher) {
            encSymetricKey = fs.readFileSync(symetricKeyPath);

            if (!Buffer.isBuffer(encSymetricKey)) {
                encSymetricKey = Buffer.from(encSymetricKey, "utf8");
            }
            symetricKey = crypto.privateDecrypt(this.cipher, encSymetricKey);
            const keyArr = symetricKey.toString('utf8').split(":");
            const IV = key[0],
                KEY = keyArr[1];
            return { IV, KEY };

        } else {
            throw new Exception("É necessário importar a chave privada do servidor antes de decriptar a chave local!")
        };
    }
}

module.exports = EncryptionManager;