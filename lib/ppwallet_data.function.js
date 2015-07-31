var parser = require('xml2json');
var config = require('./config');
var HexBuffer = require('buffer').Buffer;

/**
 * xml string to json
 * @param xmlString
 * @returns {*}
 */
exports.xml2Json = function(xmlString){
  var option = {
    object: true
  };
  return parser.toJson(xmlString,option);
};


/**
 * json string to xml
 * @param jsonString
 * @returns {*}
 */
exports.json2Xml = function(jsonString){
  var option = {};
  return '<?xml version="1.0" encoding="UTF-8" ?>'+ parser.toXml(JSON.stringify(jsonString),option);
};


/**
 * parse data to binary
 * @returns {string}
 */
exports.hex2bin = function(string){
  var buf = new HexBuffer(1024);
  var len = buf.write(string,0);
  return result = buf.toString('binary', 0, len);//这里要用binary才可以使结果与sign一致,还可以用uft8,ascii
};


exports.geturl = function(data, randKey, EncMode, HashMode, ZipMode){
  payurl = '?version=' + config.VERSION + '&encode=' + config.EN_CODE + '&encType=' + EncMode + '&signType=' + HashMode + '&zipType=' +ZipMode + '&keyIndex=' +config.KEY_INDEX+ '&merId=' +config.MER_ID +'&subMerId=' +config.SUB_MER_ID+'&transData=';
  encodeData = encodeURIComponent(data);
  return payurl+encodeData;
};

/**
 *
 * @param data
 * @param key
 * @returns {string|*}
 */
exports.data2url = function(data,key){
  payurl = 'merId=' + data.merId + '&merOrderNo=' +data.merOrderNo+ '&merUserId=' +data.merUserId + '&orderNo=' +data.orderNo + '&orderStatus=' + data.orderStatus + '&payAmt='+ data.payAmt + '&resultInfo=' + data.resultInfo + '&tranResult=' +data.tranResult+'&transTime='+data.transTime +key;
  return payurl;
};

/**
 *
 * @param data
 * @param key
 * @returns {string|*}
 */
exports.append_data2url = function(data,key){
  append_data = 'merId='+data.merId+ '&merOrderNo='+ data.merOrderNo + '&merUserId=' +data.merUserId+ '&notifyUrl=' + data.notifyUrl+ '&opCode='+data.opCode+'&orderDesc='+data.orderDesc+'&orderType='+data.orderType+'&payAmt='+data.payAmt+'&productId='+data.productId+'&returnUrl='+data.returnUrl+ '&userId=' +data.userId+key;
  return append_data;
};

/**
 *
 * @param data
 * @param key
 * @returns {string|*}
 */
exports.append_data2_confirm_url = function(data,key){
  append_data = 'merId='+data.merId + '&opCode=' +data.opCode+ '&orderNo='+data.orderNo+key;
  return append_data;
};



/**
 *
 * @param data
 * @param sign
 * @param pay_url
 * @returns {string|*}
 */
exports.get_wap_url = function(data,sign,pay_url){
  wap_url = pay_url+ '?opCode='+ data.opCode +'&merUserId='+ data.merUserId + '&merOrderNo=' + data.merOrderNo +'&userId='+ data.userId + '&payAmt=' +data.payAmt+ '&orderDesc=' +data.orderDesc+ '&returnUrl='+ data.returnUrl +'&notifyUrl='+ data.notifyUrl +'&productId=' +data.productId+ '&orderType=' +data.orderType+ '&sign='+sign+'&merId='+data.merId;
  return wap_url;
};

/**
 * 获取确认wap支付URL
 * @param data
 * @param sign
 * @param enc_data
 * @param pay_url
 * @returns {string|*}
 */
exports.get_wap_confirm_url = function(data,sign,enc_data,pay_url) {
  wap_confirm_url = pay_url + '?opCode=' + data.opCode + '&orderNo='+ data.orderNo +'&merId='+data.merId+'&encdata='+enc_data +'&sign=' +sign;
  return wap_confirm_url;
};








