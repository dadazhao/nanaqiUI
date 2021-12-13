window.onload = function () {
	var treeBranchClassName = "nnq-tree__branch";
	var treeHideClassName = "nnq-hide";

	var outlineTreeOpenClassName = "nnq-icon-minus-circle";
	var outlineTreeCloseClassName = "nnq-icon-plus-circle";

	var defaultTreeOpenClassName = "nnq-icon-down-triangle";
	var defaultTreeCloseClassName = "nnq-icon-right-triangle";

	nnq("." + treeBranchClassName).each(function () {
		nnq(this).click(function () {
			if (nnq(this)[0].className.indexOf(outlineTreeOpenClassName) != -1) {
				nnq(this)[0].className = nnq(this)[0].className.replace(outlineTreeOpenClassName, outlineTreeCloseClassName)
				if (nnq(this)[0].parentNode.nextElementSibling) {
					nnq(this)[0].parentNode.nextElementSibling.className = treeHideClassName;
				}
				return;
			}
			if (nnq(this)[0].className.indexOf(outlineTreeCloseClassName) != -1) {
				nnq(this)[0].className = nnq(this)[0].className.replace(outlineTreeCloseClassName, outlineTreeOpenClassName)
				if (nnq(this)[0].parentNode.nextElementSibling) {
					nnq(this)[0].parentNode.nextElementSibling.className = "";
				}
				return;
			}

			if (nnq(this)[0].className.indexOf(defaultTreeOpenClassName) != -1) {
				nnq(this)[0].className = nnq(this)[0].className.replace(defaultTreeOpenClassName, defaultTreeCloseClassName)
				if (nnq(this)[0].parentNode.nextElementSibling) {
					nnq(this)[0].parentNode.nextElementSibling.className = treeHideClassName;
				}
				return;
			}
			if (nnq(this)[0].className.indexOf(defaultTreeCloseClassName) != -1) {
				nnq(this)[0].className = nnq(this)[0].className.replace(defaultTreeCloseClassName, defaultTreeOpenClassName)
				if (nnq(this)[0].parentNode.nextElementSibling) {
					nnq(this)[0].parentNode.nextElementSibling.className = "";
				}
				return;
			}
		});
	});

}
