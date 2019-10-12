const devConfig = require("./dev");
const prodConfig = require("./prod");

module.exports = process.env.NODE_ENV === 'prodution' ? prodConfig : devConfig;