var nnq = function(selector) {
    if (isFunc(selector)) {
        selector(nnq);
    }
    return new nnq.fn.init(selector);;
}

var isFunc = function(obj) {
    return typeof obj === "function" && typeof obj.nodeType !== "number";
}

nnq.fn = nnq.prototype = {
    init: function(selector) {
        this[0] = selector;
        if (typeof selector != 'string')
            return this;
        if (0 == selector.indexOf("#")) {
            this[0] = document.getElementById(selector.slice(1));
        } else if (0 == selector.indexOf(".")) {
            this[0] = document.getElementsByClassName(selector.slice(1));
        } else {
            this[0] = document.getElementsByTagName(selector);
        }
        return this;
    }
}
nnq.prototype.find = function(selector) {
    if (typeof selector != 'string')
        return this;
    if (this[0] instanceof HTMLCollection || this[0] instanceof Array) {
        var elements = [];
        for (var i = 0; i < this[0].length; i++) {

            if (0 == selector.indexOf("#")) {
                var eles = this[0][i].getElementById(selector.slice(1));
                if (eles) {
                    elements = elements.concat(Array.from(eles));
                }
            } else if (0 == selector.indexOf(".")) {
                var eles = this[0][i].getElementsByClassName(selector.slice(1));
                if (eles) {
                    elements = elements.concat(Array.from(eles));
                }
            } else {
                var eles = this[0][i].getElementsByTagName(selector);
                if (eles) {
                    elements = elements.concat(Array.from(eles));
                }
            }
        }
        return nnq(elements);
    }
    if (0 == selector.indexOf("#")) {
        return nnq(this[0].getElementById(selector.slice(1)));
    } else if (0 == selector.indexOf(".")) {
        return nnq(this[0].getElementsByClassName(selector.slice(1)));
    } else {
        return nnq(this[0].getElementsByTagName(selector));
    }
}

nnq.prototype.html = function(html) {

    if (this[0]) {
        if (this[0] instanceof HTMLCollection) {
            // for (var i = 0; i < this[0].length; i++) {
            // 	this[0][i].remove();
            // }
            return null;
        } else {
            if (html) {
                this[0].innerHTML = html;
            }
            return this[0].innerHTML;
        }
    }

}

nnq.prototype.remove = function() {
    if (this[0]) {
        if (this[0] instanceof HTMLCollection) {
            // for (var i = 0; i < this[0].length; i++) {
            // 	this[0][i].remove();
            // }
            return;
        } else {
            this[0].remove();
        }
    }
}

nnq.prototype.each = function(callback, args) {
    if (callback || this[0]) {
        if (this[0] instanceof HTMLCollection || this[0] instanceof Array) {
            for (var i = 0; i < this[0].length; i++) {
                callback.apply(this[0][i], args);
            }
        } else {
            callback.apply(this[0], args);
        }
    }
}

nnq.prototype.click = function(callback, args) {
    if (callback || this[0]) {
        if (this[0] instanceof HTMLCollection) {
            for (var i = 0; i < this[0].length; i++) {
                this[0].addEventListener("click", callback);
            }
        } else {
            this[0].addEventListener("click", callback);
        }
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

// alter js
nnq(function(nnq) {

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
        alter_ele.push('<i class="nnq-message-icon ')
        alter_ele.push(nnq.alter.defaults.icon);
        alter_ele.push('"></i>');
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
        nnq("body").each(function() {
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

                nnq(".nnq-alter__message").each(function() {
                    var top = nnq(this)[0].style.top.replace("px", "");
                    nnq(this)[0].style.top = (Number(top) - nnq.alter.defaults.addTop) + "px";
                });
                break;
            }
        }
    }

    nnq.alter = function(options) {
        if (typeof options == 'string') {
            nnq.alter.defaults.message = options;
            nnq.alter.defaults.type = "primary";
        } else {
            nnq.extend(nnq.alter.defaults, options);
        }
        init(nnq);
    }

    nnq.alter.defaults = {
        message: "Tips Message",
        type: "primary",
        icon: "nnq-icon-warnning",
        alterList: [],
        baseTop: 20,
        addTop: 64,
        lifeDate: 3000
    }

})

// table js
window.onload = function() {
    var tableBranchClassName = "nnq-table__branch"
    var tableHideClassName = "nnq-hide";

    var tableOpenClassName = "nnq-icon-down-arrows";
    var tableCloseClassName = "nnq-icon-right-arrows";

    var tableAttributeIdClassName = "nnq-id";
    var tableAttributeParentIdClassName = "nnq-pid";

    var tableBranchs = document.getElementsByClassName(tableBranchClassName);

    nnq("." + tableBranchClassName).each(function() {
        nnq(this).click(function() {
            if (nnq(this)[0].className.indexOf(tableOpenClassName) != -1) {
                nnq(this)[0].className = nnq(this)[0].className.replace(tableOpenClassName, tableCloseClassName);
                //get parent element tr nnq-id value
                if (nnq(this)[0].parentNode && nnq(this)[0].parentNode.parentNode) {
                    var parentElement = nnq(this)[0].parentNode.parentNode.parentNode;
                    if (parentElement && parentElement.parentNode) {
                        var trNodes = parentElement.parentNode.childNodes;
                        var id = parentElement.getAttribute(tableAttributeIdClassName);
                        closeChildenElement(trNodes, id);
                    }
                }
                return;
            }
            if (nnq(this)[0].className.indexOf(tableCloseClassName) != -1) {
                nnq(this)[0].className = nnq(this)[0].className.replace(tableCloseClassName, tableOpenClassName);
                //get parent element tr nnq-id value
                if (nnq(this)[0].parentNode && nnq(this)[0].parentNode.parentNode) {
                    var parentElement = nnq(this)[0].parentNode.parentNode.parentNode;
                    if (parentElement && parentElement.parentNode) {
                        var trNodes = parentElement.parentNode.childNodes;
                        var id = parentElement.getAttribute(tableAttributeIdClassName);
                        openChildenElement(trNodes, id);
                    }
                }
                return;
            }
        });
    });

    function closeChildenElement(trNodes, parentId) {
        for (var i = 0; i < trNodes.length; i++) {
            if (trNodes[i] && trNodes[i].tagName == "TR") {
                var id = trNodes[i].getAttribute(tableAttributeIdClassName);
                var pid = trNodes[i].getAttribute(tableAttributeParentIdClassName);
                if (parentId != null && parentId == pid) {
                    //changed childen icon
                    var trIcons = trNodes[i].getElementsByClassName(tableBranchClassName);
                    for (var j = 0; j < trIcons.length; j++) {
                        if (trIcons[j].className.indexOf(tableOpenClassName) != -1) {
                            trIcons[j].className = trIcons[j].className.replace(tableOpenClassName, tableCloseClassName);
                        }
                    }
                    trNodes[i].className = tableHideClassName;
                    closeChildenElement(trNodes, id);
                }
            }
        }
    }

    function openChildenElement(trNodes, parentId) {
        for (var i = 0; i < trNodes.length; i++) {
            if (trNodes[i] && trNodes[i].tagName == "TR") {
                var id = trNodes[i].getAttribute(tableAttributeIdClassName);
                var pid = trNodes[i].getAttribute(tableAttributeParentIdClassName);
                if (parentId != null && parentId == pid) {
                    trNodes[i].className = "";
                }
            }
        }
    }
}

// tree js
window.onload = function() {
    var treeBranchClassName = "nnq-tree__branch";
    var treeHideClassName = "nnq-hide";

    var outlineTreeOpenClassName = "nnq-icon-minus-circle";
    var outlineTreeCloseClassName = "nnq-icon-plus-circle";

    var defaultTreeOpenClassName = "nnq-icon-down-triangle";
    var defaultTreeCloseClassName = "nnq-icon-right-triangle";

    nnq("." + treeBranchClassName).each(function() {
        nnq(this).click(function() {
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