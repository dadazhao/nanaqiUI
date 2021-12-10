var nnq = function(selector) {
	return new nnq.fn.init(selector)
}

nnq.fn = nnq.prototype = {
	init: function(selector) {
		this[0] = selector;
		return this
	}
}
// object extend method
nnq.extend = function(destination, source) {
	if (typeof destination == "object") {
		if (typeof source == "object") {
			for (var i in source) {
				destination[i] = source[i];
			}
		}
	}
	if (typeof destination == "function") {
		if (typeof source == "object") {
			for (var i in source) {
				destination.prototype[i] = source[i];
			}
		}
		if (typeof source == "function") {
			destination.prototype = source.prototype;
		}
	}
	return destination;
}

var expando = "NNQ" + ("1.6" + Math.random()).replace(/\D/g, '');  

nnq.data = function(obj, name, value) {

function getData(cache, name) {
	return cache[name];
}

function setData(cache, name, value) {
	cache[name] = value;
}

function getCache(obj) {
	obj[expando] = obj[expando] || {};
	return obj[expando];
}
	var cache = getCache(obj);

	if (value === undefined) {
		return getData(cache, name);
	} else {
		setData(cache, name, value);
	}
}
nnq.fn.init.prototype = nnq.fn;
window.nnq = nnq;

(function(nnq) {

	var alterList = [];

	function init(nnq) {
		initalizeElement(nnq);
	}

	function initalizeElement(nnq) {
		var alter_ele = [];
		alter_ele.push(' <div class="nnq-message nnq-message--primary" >');
		alter_ele.push('<i class="nnq-message-icon nnq-icon-warnning"></i>');
		alter_ele.push('<span class="nnq-message-lable">');
		alter_ele.push('</span>');
		alter_ele.push('</div>');
	}

})(nnq)
