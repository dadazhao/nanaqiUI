var nnq = function (selector) {
	return new nnq.fn.init(selector)
}

nnq.fn = nnq.prototype = {
	init: function (selector) {
		this[0] = selector;
		return this
	}
}
// object extend method
nnq.extend = function (destination, source) {
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

nnq.data = function (obj, name, value) {

	function getData (cache, name) {
		return cache[name];
	}

	function setData (cache, name, value) {
		cache[name] = value;
	}

	function getCache (obj) {
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

(function (nnq) {

	function init (nnq) {
		initalizeElement(nnq);
	}

	function initalizeElement (nnq) {
		var alter_ele = [];
		alter_ele.push(' <div class="nnq-message nnq-message--primary" ');
		var baseTop = nnq.alter.defaults.baseTop;
		var alterNum = nnq.alter.defaults.alterList.length;
		if (alterNum >= 1) {
			baseTop = alterNum * nnq.alter.defaults.addTop + nnq.alter.defaults.baseTop;
		}
		alter_ele.push('style="top:');
		alter_ele.push(baseTop);
		alter_ele.push('px;"');
		alter_ele.push(' >');
		alter_ele.push('<i class="nnq-message-icon nnq-icon-warnning"></i>');
		alter_ele.push('<span class="nnq-message-lable">');
		alter_ele.push(nnq.alter.defaults.message);
		alter_ele.push('</span>');
		alter_ele.push('</div>');

		var alterText = alter_ele.join("");
		var date = new Date();
		var element = { "datetime": date.getTime(), "alterText": alterText };
		nnq.alter.defaults.alterList.push(element);
		alterElement(element);
	}

	function alterElement (element) {
		var body = document.getElementsByTagName("body")[0];
		body.innerHTML = body.innerHTML + element.alterText;
	}

	nnq.alter = function (options) {
		if (typeof options == 'string') {
			nnq.alter.defaults.message = options;
		}
		init(nnq);
	}

	nnq.alter.defaults = {
		message: "alter message",
		alterList: [],
		baseTop: 20,
		addTop: 64,
		lifeDate: 5000
	}

})(nnq)

window.onload = function () {
	nnq.alter("aaaa"); nnq.alter("bbb"); nnq.alter("ccc"); nnq.alter("aaaa"); nnq.alter("bbb"); nnq.alter("ccc");
}
