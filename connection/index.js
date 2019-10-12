// trabalhar com access para fzr requisicoes http

"use strict";

const axios = require("axios");
const { remoteServer } = require("../config");


class Connection {
    constructor() {
        this.http = axios.create({
            baseURL: remoteServer
        });
    }



    async registerMachine(machineInfo) {
        return new Promisse((resolve, reject) => {
            this.http.post('/', machineInfo).then(({ data }) => { // o then e pra quando a promisse for resolvida, retornar alguns dados
                resolve(data);
            }).catch(e => reject(e));
        });
    }

    async checkMachineStatus(uuid) {
        return new Promise((resolve, reject) => {
            this.http.get('/?uuid=${uuid}').then(({ data: { privateKey, passphrase } }) => {
                resolve({ privateKey, passphrase })

            }).catch(e => reject(e));
        });
    }
}

module.exports = Connection;