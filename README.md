# pp钱包支付SDK

## pp钱包支付回调

> 异步回调是get请求。

> 成功支付的同步回调是post请求，以表单形式。

> 支付失败的同步回调是post请求，以表单形式。

**pp钱包支付回调有一个坑:wap的回调数据与native SDK回调的数据不一样，数据格式也不一样(native SDK回调的数据格式为xml)**

pp钱包支付分两步：
+ 订单入库->获取pp钱包支付平台的订单号
+ 订单支付请求->通过第一步获取的订单号，加上商户支付信息组装成一条支付url(地址)

**截止作者写SDK时，pp钱包支付的Native SDK只有Android**

## 安装

npm install paypalm

## API

[`getPayUrl`](#getPayUrl)

[`paySuccess`](#paySuccess)

[`getStopNotifyData`](#getStopNotifyData)[]

[`verify`](#verify)

<a name="getPayUrl" />

获取pp钱包支付url,异步方法

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

<a name="paySuccess" />

验证支付是否成功(已对数据进行验签),异步方法

```js
//wap异步回调数据
var wapNotifyData = {
	merId: '',
    merOrderNo: 'navy_test-1438580789182',
    merUserId: '',
    orderNo: '',
    orderStatus: '1',
    payAmt: '1',
    resultInfo: 'success',
    tranResult: '000000',
    transTime: '20150803134548',
    remark: 'undefined',
    sign: ''
}
paypalmObj.paySuccess(wapNotifyData,function(err,data){
	if(!err && data.code === 0){
		//已完成支付可执行订单更新或者发货了
	}
});

//Native SDK 异步回调数据(截止作者写SDK时，pp钱包支付的Native SDK只有Android)
var nativeNotifyData = {
	merId: '2014123015',
    version: 'v1.0',
    encode: 'UTF-8',
    encType: '1',
    signType: '1',
    zipType: '0',
    transData:''//transData为需要进行解密以及验签的加密数据
}
paypalmObj.paySuccess(nativeNotifyData,function(err,data){
	if(!err && data.code === 0){
		//已完成支付可执行订单更新或者发货了
		//对于Native SDK的支付，可以从data获取回调后的解密数据
		//data解析后的数据结构:
		<!-- {
			merId: '',
			merOrderNo: '55bf24e573b942b35bbaaa1a',
			orderNo: '',
			payAmt: '1',
			remark: 'SDK2.0',
			userId: '',
			transTime: '20150803162548',
			bankId: '',
			bankName: '建设银行',
			orderStatus: '1',
			errorCode: '000000',
			errorMsg: 'success',
			merUserId: '1438590186170',
			bindId: ''
		} -->

		//respone to paypalm paypalmObj.getStopNotifyData()
	}
});
```

<a name="getStopNotifyData" />

获取终止pp钱包异步回调的相应字符串

**注：当向pp钱包相应此字符串时，代表商户已经成功处理回调，pp钱包将终止异步回调。**

```js
//wap异步回调数据
res.send(paypalmObj.getStopNotifyData());
```

<a name="verify" />

认证信息是否正确(未被篡改),返回boolean值或者字符串,同步方法

**注：wap支付回调时验签返回boolean,Native回调验签成功时返回xml字符串，失败返回boolean: false**

```js
//wap异步回调数据
var wapNotifyData = {
	merId: '',
    merOrderNo: 'navy_test-1438580789182',
    merUserId: '',
    orderNo: '',
    orderStatus: '1',
    payAmt: '1',
    resultInfo: 'success',
    tranResult: '000000',
    transTime: '20150803134548',
    remark: 'undefined',
    sign: ''
}
if(paypalmObj.verify(wapNotifyData)){
	//验签通过，数据未被篡改
}

//Native SDK 异步回调数据(截止作者写SDK时，pp钱包支付的Native SDK只有Android)
var nativeNotifyData = {
	merId: '2014123015',
    version: 'v1.0',
    encode: 'UTF-8',
    encType: '1',
    signType: '1',
    zipType: '0',
    transData:''//transData为需要进行解密以及验签的加密数据
}
if(paypalmObj.verify(nativeNotifyData)){
	//验签通过，数据未被篡改
}

```
