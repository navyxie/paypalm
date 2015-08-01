var crypto = require('crypto');
function md5Decode(data,digest){
	return crypto.createHash('md5').update(data).digest(digest || 'hex');
}
module.exports = {
	md5Decode:md5Decode
}
exports.md5_decode = function(data){
  md5 = crypto.createHash('md5').update(data).digest('hex');
  return md5;
};