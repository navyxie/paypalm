var should = require('should');
var myCrypto = require('../lib/crypto');
var invalidKey = '234asdfsdr23sdfsdfq3r';
var key = 'xyWM4as64gUVXoh4k9+62xVn8pl+PC3K';
var encdataStr = "phone=15112190000&cardNum=6227003300000000000&idCard=440882199100000000&accName=navytest";
var transData = myCrypto.encTranData(encdataStr,key) + ';' + myCrypto.signData(myCrypto.hex2bin(encdataStr));
describe('lib/crypto',function(){
	describe('#encTranData()',function(){
		it('should be not ok!',function(){
			myCrypto.encTranData('dasdasdasfvb/dasdasdsdasfgsdf3',invalidKey).should.not.be.ok();
		});
		it('should be ok!',function(){
			myCrypto.encTranData('dasdasdasfvb/dasdasdsdasfgsdf3',key).should.be.equal('tFhoKMK+AV5ZvcbpxCNC4lQZ7f4IKOkzQlHjCFPWWfs=');
		});
	});
	describe('#decTranData()',function(){
		it('should be not ok!',function(){
			myCrypto.decTranData({transData:'dasdasdasfvb/dasdasdsdasfgsdf3'},invalidKey).should.not.be.ok();
		});
		it('should be not ok!',function(){
			myCrypto.decTranData('dasdasdasfvb/dasdasdsdasfgsdf3;asdasd',invalidKey).should.not.be.ok();
		});
		it('should be not ok!',function(){
			myCrypto.decTranData({transData:'dasdasdasfvb/dasdasdsdasfgsdf3;asdas'},key).should.not.be.ok();
		});
		it('should be not ok!',function(){
			myCrypto.decTranData({transData:'as1212/dasdasdsdasfgsdf3;12121'},key).should.not.be.ok();
		});
		it('should be ok!',function(){
			myCrypto.decTranData({transData:transData},key).should.be.equal(encdataStr);
		});
	})
})