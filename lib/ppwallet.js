// var PPwalletSecurity = require('./ppwallet_security.function.js');
// var PPwalletData = require('./ppwallet_data.function.js');
// var _ = require('underscore');
var config = require('./config');
var request = require('request');
var paypalmCrypto = require('./crypto');
var util = require('./util');
/**
 * Constructor config
 * @param ppwallet_config
 * @constructor
 */
function PPwallet(ppwallet_config){
  //default config
  this.ppwallet_config = config;
  this.config = config;
  //config merge
  for(var key in ppwallet_config){
    this.ppwallet_config[key] = ppwallet_config[key];
    this.config[key] = ppwallet_config[key];
  }
}

PPwallet.prototype.getPayUrl = function(data,cbf){
	var config = this.config;
	var qs = {
		opCode:"33A11H",
		merUserId:data.merUserId,
		merOrderNo:data.merOrderNo,
		userId:data.userId,
		payAmt:data.payAmt,
		orderDesc:data.orderDesc,
		returnUrl:data.returnUrl,
		notifyUrl:data.notifyUrl,
		remark:data.remark,
		productId:data.productId || "100001",
		orderType:"collect",
		merId:config.MER_ID
	}
	var sign = paypalmCrypto.md5Decode(util.makeParamStr(qs));
	qs.sign = sign;
	request.get({url:config.PAY_API_URL, qs:qs, json:true}, function (err, response, body){
      cbf(err,body);
    })
}


// /**
//  * 解析PP钱包URL
//  * @param data
//  * @returns {*}
//  */
// PPwallet.prototype.parse_url_data = function(data){
//   var self = this;
//   plainData = PPwalletSecurity.decData(data.transData,self.ppwallet_config.KEY,data.encType,data.signType,data.zipType);
//   if (plainData!=null){
//      return PPwalletData.xml2Json(plainData);
//   }else{
//     return null;
//   }
// };

// /**
//  * 生成PP钱包URL
//  * @param data
//  * @returns {*}
//  */
// PPwallet.prototype.create_url_data = function(data){
//   var self = this;
//   if(_.isObject(data)){
//     plainData =  PPwalletData.json2Xml(data);
//     encData = PPwalletSecurity.encData(plainData,self.ppwallet_config.KEY,self.ppwallet_config.ENC_TYPE,self.ppwallet_config.SIGN_TYPE,self.ppwallet_config.ZIP_TYPE);
//     return PPwalletData.geturl(encData,self.ppwallet_config.KEY,self.ppwallet_config.ENC_TYPE,self.ppwallet_config.SIGN_TYPE,self.ppwallet_config.ZIP_TYPE);
//   }else{
//     return null;
//   }

// };

// /**
//  * 验证ios 数据是否被改动过
//  * @returns {boolean}
//  */
// PPwallet.prototype.verify_ios_data =  function(data){
//   var self = this;
//   if(_.isObject(data)){
//     plainData = PPwalletData.data2url(data,self.ppwallet_config.KEY);
//     flag = PPwalletSecurity.verify_ios_data(plainData,data.sign);
//     return flag;
//   }else{
//     return false;
//   }
// };

// /**
//  * 生成wap支付url
//  * @returns {string}
//  */
// PPwallet.prototype.create_wap_url = function(data){
//   var self = this;
//   if(_.isObject(data)){
//     append_data = PPwalletData.append_data2url(data,self.ppwallet_config.KEY);
//     md5_append_data = PPwalletSecurity.md5_decode(append_data);
//     wap_url = PPwalletData.get_wap_url(data,md5_append_data,self.ppwallet_config.PAY_APP_WAP_URL);
//     return wap_url;
//   }else{
//     return null;
//   }
// };

// /**
//  * 生成wap 支付确认URL
//  */
// PPwallet.prototype.create_wap_confirm_url = function(data){
//   var self = this;
//   if(_.isObject(data)){
//     append_data = PPwalletData.append_data2_confirm_url(data,self.ppwallet_config.KEY);
//     md5_append_data = PPwalletSecurity.md5_decode(append_data);
//     enc_data = PPwalletSecurity.get_wap_encdata(self.ppwallet_config.WAP_KEY, data);
//     wap_url = PPwalletData.get_wap_confirm_url(data,md5_append_data,enc_data,self.ppwallet_config.PAY_APP_WAP_URL);
//     return wap_url;
//   }else{
//     return null;
//   }
// };
var PPwalletObj = new PPwallet({});
PPwalletObj.getPayUrl(
	{
		merUserId:util.generateKey(),
		merOrderNo:util.generateKey(20),
		payAmt:1,
		orderDesc:'test',
		returnUrl:'http://navy.test.com',
		notifyUrl:'http://navy.test.com',
		remark:'remark',
	},
	function(err,data){
		console.log(data);
	}
)
exports.PPwallet = PPwallet;




