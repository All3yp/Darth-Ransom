const os = require("os");
const fs = require("fs");
const uniqid = require("uniqid");
const { systemInfoPath } = require('../config');


class MachineManager {

    static generateID() {
        // levanta as informacoes do alvo
        const systemInfo = {
            uuid: uniqid(),
            infection: Date.now(),
            user: os.userInfo(),
            os: {
                type: os.type(), //retornar o tipo de sistema operacional
                platform: os.platform(),
                architechture: os.arch(),
                release: os.release()
            }
        };
        // eu vou salvar as info localmente para dps quando for checar o status d maquina, n precsar ficar checando as info em memoria, pois vou ler de um arq localmente e enviar pro server :

        // escreve localmente
        fs.writeFileSync(systemInfoPath, JSON.stringify(systemInfo)); // escrever um arqv de forma assincrona no disco

        return systemInfo;
    }
    static loadId() {
        if (!fs.existsSync(systemInfoPath)) {
            return null
        }
        var systemInfo = JSON.parse(fs.readFileSync(systemInfoPath));
        if (typeof systemInfoPath != 'object') {
            return null;
        }
        return systemInfo;
    }
    static deleteId() {
        fs.unlinkSync(systemInfoPath);
    }
}

module.exports = MachineManager;