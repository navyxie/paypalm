var util = {
		/**
	 * 对象按键排序
	 * @param object obj
	 * @param boolean desc
	 * @return object
	*/
	sortObjectByKey:function(obj,desc){
		var keys = Object.keys(obj);
		var returnObj = {};
		keys = keys.sort();
		if(desc){
			keys = keys.reverse();
		}
		for(var i = 0 , len = keys.length ; i < len ; i++){
			obj[keys[i]] && (returnObj[keys[i]] = obj[keys[i]]);
		}
		return returnObj;
	},
	/**
	 * 将字符串转化为查询字符串
	 * @param object json
	 * @return str
	*/
	jsonToSearch:function(json){
		var str = "";
		for(var key in json){
			if(json.hasOwnProperty(key)){
				str += key + '=' + json[key]+'&';
			}
		}
		//把最后的&去掉
		if(str){
			str = str.substring(0,str.length -1);
		}
		return str;
	},
	/**
	*生成一个随机的字符串
	*@param number len
	*/
	generateKey:function(len){
		var baseString = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
		len = len || 16;
		var str = '';
		for(var i = 0 ; i < len ; i++){
			str += baseString[parseInt(Math.random()*(len-1))];
		}
		return str;
	},
	makeParamStr:function(data){
		var cloneData = util.clone(data);
		var sortData = util.sortObjectByKey(cloneData);
		delete sortData.remark;
		return util.jsonToSearch(sortData);
	},
	isFunction:function(fn){
		return util.isType(fn,'Function');
	},
	isObject:function(obj){
		return util.isType(obj,'Object');
	},
	isArray:function(arr){
		return util.isType(arr,'Array');
	},
	isString:function(str){
		return util.isType(str,'String');
	},
	isBoolean:function(flag){
		return util.isType(flag,'Boolean');
	},
	isType:function(obj,type){
		return Object.prototype.toString.call(obj) === '[object '+type+']';
	},
	isEmpty:function(obj){
		if(!obj){
			return true;
		}
		if(util.isArray(obj) && obj.length === 0){
			return true;
		}
		if(util.isObject(obj) && Object.keys(obj).length === 0){
			return true;
		}
		return false;
	},
	extend:function(destination,source){
		for(var key in source){
			if(source.hasOwnProperty(key) && source[key]){
				destination[key] = source[key];
			}
		}
		return destination;
	},
	clone:function(obj){
		if(!util.isObject(obj)){
			return obj;
		}
		return util.isArray(obj) ? obj.slice() : util.extend({},obj);
	}
}
module.exports = util;