"use strict";

const crypto = require("crypto");
const algorithm = "aes-256-ctr";
const Provider = require("../utils/EncryptionManager");


//metodo agr responsavel p gerar a cifra local
const createCipher = publicKey => {
    //inicializando o vetor de inicilizacao e a chave privada

    var IV = Buffer.alloc(16), //dizendo a quantidade de bytes na memoria, pelo menos 16 bytes
        KEY = crypto.randomBytes(32); //tamanho da chave n max 32

        IV = Buffer.from(
            Array.prototype.map.call(IV, () => {  //ALGUMA GAMBIARRA QUE ME ENSINARAM NESSE CURSO
                return Math.floor(Math.random() * 256);
            }) 
        );

       KEY = KEY.toString("hex").slice(0.32);  // pegar a chave e transformar em string de 32 bytes
       IV = IV.toString("hex").slice(0, 16);

       const symetricKey = `${IV}:${KEY}`;

       const provider = new Provider();
       provider.importPublicKey(publicKey);
       provider.saveSymetricKey(symetricKey);
       return crypto.createCipheriv(algorithm, KEY, IV);
};

module.exports = createCipher;