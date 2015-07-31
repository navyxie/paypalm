var PPwallet = require('../../lib/ppwallet').PPwallet;
var should = require('should');

var ppwallet_config = {
  partner:152
};
var ppwallet = new PPwallet(ppwallet_config);

var data = {
  paypalm: {
    opCode: {"$t": 330007},
    merOrderNo: {"$t": 20130909203017105000},
    payAmt: {"$t": 1000},
    orderDesc: {"$t": '购物'},
    merUserId: {"$t": 'test'},
    notifyUrl: {"$t": 'http://192.168.1.45:1337/portfolio/find'},
    returnUrl: {"$t": 'http://192.168.1.45:1337/portfolio/find'}
  }
};

var validata  = {
  merId: '1000002395',
  version: 'v1.0',
  encode: 'UTF-8',
  encType: '1',
  signType: '1',
  zipType: '0',
  keyIndex: '1',
  de: undefined,
  transData: 'zqrR0y03KmkPjfHRJO3Yw+eClE9L1bwlnzFlOagcxUUf5AbKilaXy5lBuqQtfbgGbDRV6hjdqJpnt3NqiDZq9mYLegRzcjsRUBg4Z2uHOOjkBD81p6XuArSQi/APRRJIlZClL5h9Bo+pmPoDkvpYFEfQlaiXS63HB+0DOTUChSfR3U1kXzCnwYRnIJohiyATh9guaZ85hFxNC8tGC7Z21I3XRF+FWKF1hZz8TPJyxR8GmlSIn0lXKYWc/EzycsUfIfL5wIQfyLiyuKnw9MWCqYAbKBfjmRaOI2J8M87fp+bx+qZGp50ZNwezlhfFGeQJL8NVfbq3FK8xwByIeY9zg9P9Stlz+dvORajyg/mhAATIW85wbPENxiUzna3jR2iq6L9tOHcSEk/Wwoy5rKXI6XNIkaRVbPxo6Dvb7Zhh8fjz1CPO9EJ97A==;We52m1VYr/tMhIsLHjRWZA=='
};

var valid_ios_data = {
  merId: '2014123015',
  merOrderNo: '54a8f107c97f47b13d50b6c6',
  merUserId:'13265320130',
  orderNo: '20150104155039689542',
  orderStatus: 1,
  payAmt: '100',
  remark: '',
  resultInfo:'success',
  tranResult: '000000',
  transTime: 20150104155200,
  sign:'d8854905b63d1e892c04af1b35562fce'
};

var create_wap_url_data = {
  'merId':'2014123015',
  'merOrderNo': '550a5ed017c6d82e2b1c9fcd',
  'merUserId': '6212263602005775374',
  'notifyUrl': 'http://113.119.215.117:8002/pay/ppwalletIos',
  'opCode': '33A11H',
  'orderDesc':'buyKaoLaLiCai',
  'orderType': 'collect',
  'payAmt': '100',
  'productId': '100001',
  'returnUrl': 'http://113.119.215.117:8002/pay_finish.html?kllc_ppmoney=true',
  'userId':'13631841987'
};

var create_wap_confirm_url_data = {
  'merId':'2014123015',
  'opCode': '33A12H',
  'orderNo': '20150319150802423527',
  'phone': '13711111111',
  'cardNum': '6223459',
  'idNo': '3422247788521',
  'accName': '任测试'
};

var created_url,parsed_data;
describe("wallet APIS !", function() {
  it("test create url ",function(){
    created_url = ppwallet.create_url_data(data);
  });
  it("test parse url ",function(){
    parsed_data = ppwallet.parse_url_data(validata);
    parsed_data.should.have.property("paypalm");
  });
  //需要正式密钥验证，此处没验证
  it.skip("test verify ios notify url ",function(){
    var ppwallet_config = {
      KEY: "xyWM4as64gUVXoh4k9+62xVn8pl+PC3K",
      WAP_KEY: "xyWM4as64gUVXoh4k9+62xVn8pl+PC3K",
      PAY_APP_WAP_URL: "https://www.paypalm.cn/bfsmob/http",
      PAY_APP_WAP_CONFIRM_URL: "https://www.paypalm.cn/bfsmob/http"
    };
    var ppwallet = new PPwallet(ppwallet_config);
    flag = ppwallet.verify_ios_data(valid_ios_data);
    flag.should.be.equal(true);
  });
  it("test create wap pay url ",function(){
    wap_url = ppwallet.create_wap_url(create_wap_url_data);
    wap_url.should.be.equal('http://124.193.184.94/bfsmob/servlet/MerReqServlet?opCode=33A11H&merUserId=6212263602005775374&merOrderNo=550a5ed017c6d82e2b1c9fcd&userId=13631841987&payAmt=100&orderDesc=buyKaoLaLiCai&returnUrl=http://113.119.215.117:8002/pay_finish.html?kllc_ppmoney=true&notifyUrl=http://113.119.215.117:8002/pay/ppwalletIos&productId=100001&orderType=collect&sign=e8618d1714f4eea12fccf3949d4b484e&merId=2014123015');
  });
  it("test create wap pay url ",function(){
    wap_url = ppwallet.create_wap_confirm_url(create_wap_confirm_url_data);
    wap_url.should.be.equal('http://124.193.184.94/bfsmob/servlet/MerReqServlet?opCode=33A12H&orderNo=20150319150802423527&merId=2014123015&encdata=cnubfiAcaQ2knbo77o7zvEi2zgq1DOTz+CcxNeNxPXfzL9AFkgjQepr0TRgVol2A4kNypvL8/195Nij/ByAw39vqE6s/hAQW+p3zSNMyM/o=;jeykw361+a8I1/GZLyzNbg==&sign=5d61341cefaead37daf49261cb5adc9a')
  });
});
