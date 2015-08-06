var paypalm = require('../lib/paypalm');
var muk = require('muk');
var should = require('should');
var requestUrl = 'https://www.paypalm.cn/bfsmob/http';
var data = {
    merUserId:"",//用户在商户系统的用户id 
    merOrderNo:'navy_test-'+Date.now(),//商户订单号 
    payAmt:1,//支付金额，分为单位 
    orderDesc:'',//订单描述 
    returnUrl:'http://xxx.com/paypalm/wap/return',//同步回调地址 
    notifyUrl:'http://xxx.com/paypalm/wap/notify',//异步回调地址 
    userId:"",//用户在商户系统的注册手机号 
    phone:"",//银行预留手机号 
    cardNum:"",//用户银行卡号 
    idCard:"",//用户身份证 
    accName:""//用户姓名 
}
var config = {
    'MER_ID': "",//pp钱包商户号 
    'KEY': "",//商户秘钥 
    'WAP_KEY': "",//预制密钥->wap获取支付链接时，需要使用该密钥进行实名信息加密 
    "PAY_API_URL":requestUrl//订单入库以及支付地址 
}
var paypalmObj = new paypalm(config);
describe('paypalm',function(){
	describe('#getPayUrl()',function(){
		before(function(){
			muk(paypalmObj,'getPayUrl',function(data,callback){
				callback(null,requestUrl);
			});
		});
		it('should be ok',function(done){
			paypalmObj.getPayUrl(data,
			    function(err,url){
			        if(!err){
			        	url.should.be.equal(url);
			            // console.log(url);//url为去pp钱包支付的地址 
			        }
			        done(err);
			    }
			);
		});
		after(function(){
			muk.restore();
		})
	})
})