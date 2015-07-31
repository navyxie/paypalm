var crypto = require('crypto');
var md5 = crypto.createHash('md5');
var PPwalletData = require('./ppwallet_data.function.js');

/**
 * 拆解pp钱包支付
 * @param transData
 * @param randKey
 * @param EncMode
 * @param HashMode
 * @param ZipMode
 */
exports.decData = function(transData, randKey, EncMode, HashMode, ZipMode){
  data_split = transData.split(';');
  if(data_split.length!== 2){
    return null;
  }
  randKey = new Buffer(randKey, 'base64');
  encTranData = new Buffer(data_split[0],'base64');
  signData = data_split[1];
  signData = signData.replace(/ /g, "+");
  var rawdata;
  var autoPad = true;
  var iv = new Buffer(0);
  var alg;
  if(EncMode == 1){
    alg = 'des-ede3'
  }else{
    return null;
  }
  var cipher = crypto.createCipheriv(alg, randKey, iv);
  var decipher = crypto.createDecipheriv(alg, randKey, iv);
  cipher.setAutoPadding(autoPad);
  rawdata = decipher.update(encTranData,'hex','utf8');
  rawdata += decipher.final('utf8');
  console.log("crypto data : "+crypto.createHash('md5').update(PPwalletData.hex2bin(rawdata)).digest('base64')) ;
  console.log("signData : "+signData) ;
  if(HashMode ==1){
    if (!(crypto.createHash('md5').update(PPwalletData.hex2bin(rawdata)).digest('base64')==signData)){
      return null;
    }
  } else{
    return null;
  }
  return rawdata;
};



/**
 * 封装PP钱包
 * @param data
 * @param randKey
 * @param EncMode
 * @param HashMode
 * @param ZipMode
 * @returns {*}
 */
exports.encData = function(data, randKey, EncMode, HashMode, ZipMode){
  //default true
  var autoPad = true;
  var iv = new Buffer(0);
  randKey = new Buffer(randKey,'base64');
  if(EncMode == 1){
    alg = 'des-ede3'
  }else{
    return null;
  }
  var cipher = crypto.createCipheriv(alg, randKey, iv);
  cipher.setAutoPadding(autoPad);
  var encTranData = cipher.update(data,'utf8','base64');
  encTranData += cipher.final('base64');
  if(HashMode ==1){
    signData = crypto.createHash('md5').update(PPwalletData.hex2bin(data)).digest('base64');
  }
  return encTranData+";"+signData;
};

/**
 * 验证ios 数据是否正确
 * @param data
 * @param sign
 * @returns {boolean}
 */
exports.verify_ios_data = function(data,sign){
  md5 = crypto.createHash('md5').update(data).digest('hex');
  return (md5 == sign);
};


/**
 *
 * @param data
 * @returns {boolean}
 */
exports.md5_decode = function(data){
  md5 = crypto.createHash('md5').update(data).digest('hex');
  return md5;
};


/**
 * 获取wap加密数据
 * @param randKey
 * @param data
 */
exports.get_wap_encdata = function(randKey,data){
  append_data = 'phone='+data.phone+ '&cardNum=' +data.cardNum+ '&idCard=' +data.idNo+ '&accName=' + data.accName;
  var autoPad = true;
  var iv = new Buffer(0);
  randKey = new Buffer(randKey,'base64');
  var cipher = crypto.createCipheriv('des-ede3', randKey, iv);
  cipher.setAutoPadding(autoPad);
  var encTranData = cipher.update(append_data,'utf8','base64');
  encTranData += cipher.final('base64');
  md5_decode = crypto.createHash('md5').update(PPwalletData.hex2bin(append_data)).digest('base64');
  return encTranData+';'+md5_decode;
};
