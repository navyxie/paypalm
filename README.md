# pp钱包支付SDK

pp钱包支付分两步：
+ 订单入库->获取pp钱包支付平台的订单号
+ 订单支付请求->通过第一步获取的订单号，加上商户支付信息组装成一条支付url(地址)

## 安装

npm install paypalm

## API

[`getPayUrl`](#getPayUrl)

<a name="getPayUrl" />

```js
var paypalm = require('paypalm');
var config = {
	'MER_ID': "",//pp钱包商户号
	'KEY': "",//商户秘钥
	'WAP_KEY': "",//预制密钥->wap获取支付链接时，需要使用该密钥进行实名信息加密
	"PAY_API_URL":"https://www.paypalm.cn/bfsmob/http"//订单入库以及支付地址
}
var paypalmObj = new paypalm(config);
var data = {
	merUserId:"",//用户在商户系统的用户id
	merOrderNo:'',//商户订单号
	payAmt:1,//支付金额，分为单位
	orderDesc:'',//订单描述
	returnUrl:'http://navy.test.com',//同步回调地址
	notifyUrl:'http://navy.test.com',//异步回调地址
	userId:"",//用户在商户系统的注册手机号
	phone:"",//银行预留手机号
	cardNum:"",//用户银行卡号
	idCard:"",//用户身份证
	accName:""//用户姓名
}
paypalmObj.getPayUrl(data,
	function(err,url){
		if(!err){
			console.log(url);//url为去pp钱包支付的地址
		}
	}
)
```
