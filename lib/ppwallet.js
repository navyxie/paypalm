var PPwalletSecurity = require('./ppwallet_security.function.js');
var PPwalletData = require('./ppwallet_data.function.js');
var _ = require('underscore');
var config = require('./config');
/**
 * Constructor config
 * @param ppwallet_config
 * @constructor
 */
function PPwallet(ppwallet_config){
  //default config
  this.ppwallet_config = config;
  //config merge
  for(var key in ppwallet_config){
    this.ppwallet_config[key] = ppwallet_config[key];
  }
}


/**
 * 解析PP钱包URL
 * @param data
 * @returns {*}
 */
PPwallet.prototype.parse_url_data = function(data){
  var self = this;
  plainData = PPwalletSecurity.decData(data.transData,self.ppwallet_config.KEY,data.encType,data.signType,data.zipType);
  if (plainData!=null){
     return PPwalletData.xml2Json(plainData);
  }else{
    return null;
  }
};

/**
 * 生成PP钱包URL
 * @param data
 * @returns {*}
 */
PPwallet.prototype.create_url_data = function(data){
  var self = this;
  if(_.isObject(data)){
    plainData =  PPwalletData.json2Xml(data);
    encData = PPwalletSecurity.encData(plainData,self.ppwallet_config.KEY,self.ppwallet_config.ENC_TYPE,self.ppwallet_config.SIGN_TYPE,self.ppwallet_config.ZIP_TYPE);
    return PPwalletData.geturl(encData,self.ppwallet_config.KEY,self.ppwallet_config.ENC_TYPE,self.ppwallet_config.SIGN_TYPE,self.ppwallet_config.ZIP_TYPE);
  }else{
    return null;
  }

};

/**
 * 验证ios 数据是否被改动过
 * @returns {boolean}
 */
PPwallet.prototype.verify_ios_data =  function(data){
  var self = this;
  if(_.isObject(data)){
    plainData = PPwalletData.data2url(data,self.ppwallet_config.KEY);
    flag = PPwalletSecurity.verify_ios_data(plainData,data.sign);
    return flag;
  }else{
    return false;
  }
};

/**
 * 生成wap支付url
 * @returns {string}
 */
PPwallet.prototype.create_wap_url = function(data){
  var self = this;
  if(_.isObject(data)){
    append_data = PPwalletData.append_data2url(data,self.ppwallet_config.KEY);
    md5_append_data = PPwalletSecurity.md5_decode(append_data);
    wap_url = PPwalletData.get_wap_url(data,md5_append_data,self.ppwallet_config.PAY_APP_WAP_URL);
    return wap_url;
  }else{
    return null;
  }
};

/**
 * 生成wap 支付确认URL
 */
PPwallet.prototype.create_wap_confirm_url = function(data){
  var self = this;
  if(_.isObject(data)){
    append_data = PPwalletData.append_data2_confirm_url(data,self.ppwallet_config.KEY);
    md5_append_data = PPwalletSecurity.md5_decode(append_data);
    enc_data = PPwalletSecurity.get_wap_encdata(self.ppwallet_config.WAP_KEY, data);
    wap_url = PPwalletData.get_wap_confirm_url(data,md5_append_data,enc_data,self.ppwallet_config.PAY_APP_WAP_URL);
    return wap_url;
  }else{
    return null;
  }
};
exports.PPwallet = PPwallet;




