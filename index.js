const Safira = require('./lib/Safira');
const safiraInstance = new Safira();

exports.default = Safira;
exports.getInstance = safiraInstance;
exports.BeanBuilder = require('./lib/bean/BeanBuilder');
