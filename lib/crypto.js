var crypto = require('crypto');
var HexBuffer = require('buffer').Buffer;
var util = require('./util');
function md5Decode(data,digest){
	var md5Sign = crypto.createHash('md5').update(data).digest(digest || 'hex');
	return md5Sign;
}
function encTranData(data,key,algorithm,iv,encode,digest){
	var encData = '';
	try{
		algorithm = algorithm || "des-ede3";
		iv = iv || '';
		encode = encode || 'utf8';
		digest = digest || 'base64'
		key = new Buffer(key,'base64');
		var cipher = crypto.createCipheriv(algorithm, key, iv);
		cipher.setAutoPadding(true);
		encData = cipher.update(data,encode,digest);
		encData += cipher.final(digest);
	}catch(e){
		console.error('paypalm sdk encTranData error : '+e);
	}
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
function decTranData(data,key){
	var rawdata = '';
	var transData = data.transData;
	if(!transData && !util.isString(transData)){
		return false;
	}
	var transArr = transData.split(';');
	if(transArr.length !== 2 || !util.isString(transArr[0]) || !util.isString(transArr[1])){
		return false;
	}
	var tranStr = transArr[0];
	var signStr = transArr[1];
	signStr = signStr.replace(/ /g, "+");
	//encType:  加密类型-> 1:DESede 2:AES
  	//signType: 签名类型-> 1:MD5 2:SHA1
  	/**
  	目前只做了DESede 和 MD5 的加密和签名
  	encType: '1',
  	signType: '1',
  	**/
  	try{
		var algorithm = "des-ede3";
		var iv = '';
		var decode = 'hex';
		var digest = 'utf8'
		key = new Buffer(key,'base64');
		tranStr = new Buffer(tranStr,'base64');
		var decipher = crypto.createDecipheriv(algorithm, key, iv);
		rawdata = decipher.update(tranStr,decode,digest);
		rawdata += decipher.final(digest);
	}catch(e){
		console.error('paypalm sdk decTranData error : '+e);
	}
	var test = signData(hex2bin(rawdata));
	if(test === signStr){
		return rawdata;
	}else{
		return false;
	}
}
module.exports = {
	md5Decode:md5Decode,
	encTranData:encTranData,
	signData:signData,
	hex2bin:hex2bin,
	decTranData:decTranData
}