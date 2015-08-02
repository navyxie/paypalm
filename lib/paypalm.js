var config = require('./config');
var request = require('request');
var paypalmCrypto = require('./crypto');
var util = require('./util');
/**
 * Constructor config
 * @param ppwallet_config
 * @constructor
 */
function Paypalm(ppwallet_config){
  //default config
  this.config = config;
  //config merge
  for(var key in ppwallet_config){
    this.config[key] = ppwallet_config[key];
  }
}

Paypalm.prototype.getPayUrl = function(data,cbf){
	if(!util.isObject(data)){
		return cbf('the first param must be object.');
	}
	var cloneData = util.clone(data);
	var config = this.config;
	var qs = {
		opCode:"33A11H",
		merUserId:cloneData.merUserId,
		merOrderNo:cloneData.merOrderNo,
		userId:data.userId,
		payAmt:data.payAmt,
		orderDesc:cloneData.orderDesc,
		returnUrl:cloneData.returnUrl,
		notifyUrl:cloneData.notifyUrl,
		remark:cloneData.remark,
		productId:data.productId || "100001",
		orderType:"collect",
		merId:config.MER_ID
	}
	var signStr = util.makeParamStr(qs)+config.KEY;
	var sign = paypalmCrypto.md5Decode(signStr);
	qs.sign = sign;
	var url = config.PAY_API_URL + '?' + util.jsonToSearch(qs);
	request.get(url, function (err, response, body){
		if(!err){
			var result = util.searchToJson(body);
			if(result.tranResult === '000000'){
				var confirmData = {
					merId:config.MER_ID,
					opCode:"33A12H",
					orderNo:result.orderNo
				}
				confirmData.sign = paypalmCrypto.md5Decode(util.makeParamStr(confirmData)+config.KEY);
				var encdataStr = "";
				cloneData.phone && (encdataStr += 'phone=' + cloneData.phone);
				cloneData.cardNum && (encdataStr += '&cardNum=' + cloneData.cardNum);
				cloneData.idCard && (encdataStr += '&idCard=' + cloneData.idCard);
				cloneData.accName && (encdataStr += '&accName=' + cloneData.accName);
				confirmData.encdata = paypalmCrypto.encTranData(encdataStr,config.WAP_KEY) + ';' + paypalmCrypto.signData(paypalmCrypto.hex2bin(encdataStr));
				cbf(null,config.PAY_API_URL + '?' + util.jsonToSearch(confirmData));
			}else{
				cbf('请求pp钱包订单入库失败了,tranResult:'+result.tranResult,result);
			}
		}else{
			cbf(err,body);
		}     
    })
}
module.exports = Paypalm;




