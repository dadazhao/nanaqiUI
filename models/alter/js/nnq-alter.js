nnq(function (nnq) {

	function init(nnq) {
		initalizeElement(nnq);
	}

	function initalizeElement(nnq) {
		var date = new Date().getTime();
		var id = date + Math.random();
		var alter_ele = [];
		alter_ele.push(' <div id="')
		alter_ele.push(id);
		alter_ele.push('" class="nnq-message nnq-alter__message nnq-message--');
		alter_ele.push(nnq.alter.defaults.type);
		alter_ele.push('" ');
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

	function alterElement(element) {
		nnq("body").each(function () {
			nnq(this).innerHTML(nnq(this).innerHTML() + element.alterText);
		})
	}

	setInterval(() => {
		removeElement();
	}, 1000);

	function removeElement() {

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
		type: "primary",
		alterList: [],
		baseTop: 20,
		addTop: 64,
		lifeDate: 3000
	}

})

window.onload = function () {
	nnq.alter("aaaa"); nnq.alter("bbb"); nnq.alter("ccc"); nnq.alter("aaaa"); nnq.alter("bbb"); nnq.alter("ccc");

	// console.log(nnq("#aaa"));
}
