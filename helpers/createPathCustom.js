const path = require("path");
const createPathCustom = (fileName) => path.join(__dirname, "..", "view", `${fileName}.ejs`);
module.exports.createPathCustom = createPathCustom;
