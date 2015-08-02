var crypto = require('crypto');
var HexBuffer = require('buffer').Buffer;
function md5Decode(data,digest){
	var md5Sign = crypto.createHash('md5').update(data).digest(digest || 'hex');
	return md5Sign;
}
function encTranData(data,key,algorithm,iv,encode,digest){
	algorithm = algorithm || "des-ede3";
	iv = iv || '';
	encode = encode || 'utf8';
	digest = digest || 'base64'
	key = new Buffer(key,'base64');
	var cipher = crypto.createCipheriv(algorithm, key, iv);
	cipher.setAutoPadding(true);
	var encData = cipher.update(data,encode,digest);
	encData += cipher.final(digest);
	return encData;
}
function signData(data){
	return md5Decode(data,'base64');
}
function hex2bin(string){
  var buf = new HexBuffer(1024);
  var len = buf.write(string,0);
  return result = buf.toString('binary', 0, len);//这里要用binary才可以使结果与sign一致,还可以用uft8,ascii
}
module.exports = {
	md5Decode:md5Decode,
	encTranData:encTranData,
	signData:signData,
	hex2bin:hex2bin
}