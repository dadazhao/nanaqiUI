var nnq = function (selector) {
	return new nnq.fn.init(selector);
}

nnq.fn = nnq.prototype = {
	init: function (selector) {
		this[0] = selector;
		this.eles = null;
		if (typeof selector != 'string')
			return this;
		if (0 == selector.indexOf("#")) {
			this[0] = document.getElementById(selector.slice(1));
		} else if (0 == selector.indexOf(".")) {
			this[0] = document.getElementsByClassName(selector.slice(1))[0];
			this.eles = document.getElementsByClassName(selector.slice(1));
		} else {
			this[0] = document.getElementsByTagName(selector)[0];
			this.eles = document.getElementsByTagName(selector);
		}
		return this;
	}
}

nnq.prototype.innerHTML = function (html) {
	if (html == null)
		return this[0].innerHTML;
	this[0].innerHTML = html;
}

nnq.prototype.remove = function () {
	if (this[0])
		this[0].remove();
}

nnq.prototype.each = function (callback, args) {
	if (callback == null || this.eles == null)
		return;
	for (var i = 0; i < this.eles.length; i++) {
		callback.apply(this.eles[i], args);
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
		var date = new Date().getTime();
		var id = date + Math.random();
		var alter_ele = [];
		alter_ele.push(' <div id="')
		alter_ele.push(id);
		alter_ele.push('" class="nnq-message nnq-alter__message nnq-message--primary" ');
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

		var element = { "id": "" + id, "datetime": date, "alterText": alterText };
		nnq.alter.defaults.alterList.push(element);
		alterElement(element);
	}

	function alterElement (element) {
		nnq("body").innerHTML(nnq("body").innerHTML() + element.alterText);
	}

	setInterval(() => {
		removeElement();
	}, 1000);

	function removeElement () {

		var alterList = nnq.alter.defaults.alterList;

		for (var i = 0; i < alterList.length; i++) {
			var date = new Date().getTime();
			if (alterList[i].datetime < date - nnq.alter.defaults.lifeDate) {
				nnq("#" + alterList[i].id).remove()
				alterList.splice(i, i + 1);

				nnq(".nnq-alter__message").each(function () {
					var top = nnq(this)[0].style.top.replace("px", "");
					nnq(this)[0].style.top = (Number(top) - nnq.alter.defaults.addTop) + "px";
				});
				break;
			}
		}
	}

	nnq.alter = function (options) {
		if (typeof options == 'string') {
			nnq.alter.defaults.message = options;
		}
		init(nnq);
	}

	nnq.alter.defaults = {
		message: "Tips Message",
		alterList: [],
		baseTop: 20,
		addTop: 64,
		lifeDate: 3000
	}

})(nnq)

window.onload = function () {
	nnq.alter("aaaa"); nnq.alter("bbb"); nnq.alter("ccc"); nnq.alter("aaaa"); nnq.alter("bbb"); nnq.alter("ccc");

	// console.log(nnq("#aaa"));
}
