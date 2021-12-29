var nnq = function(selector) {
    if (isFunc(selector)) {
        selector(nnq);
    }
    return new nnq.fn.init(selector);;
}

var isFunc = function(obj) {
    return typeof obj === "function" && typeof obj.nodeType !== "number";
}

var toArray = function(collection) {
    var arr = [];
    if (collection && collection instanceof HTMLCollection) {
        for (let i = 0; i < collection.length; i++) {
            arr.push(collection[i]);
        }
    }
    return arr;
}

nnq.fn = nnq.prototype = {
    init: function(selector) {
        this[0] = selector;
        if (typeof selector != 'string')
            return this;
        // trim string 
        selector = selector.trim();
        if (-1 != selector.indexOf(" ")) {
            if (-1 != selector.lastIndexOf("#")) {
                selector = selector.slice(selector.lastIndexOf("#"));
            }
            var arr = selector.split(" ");
            var eles = null;
            for (var i = 0; i < arr.length; i++) {
                if (!eles) {
                    eles = nnq(arr[i])
                } else {
                    eles = eles.find(arr[i]);
                }
            }
            return eles;
        }
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
                    elements = elements.concat(toArray(eles));
                }
            } else if (0 == selector.indexOf(".")) {
                var eles = this[0][i].getElementsByClassName(selector.slice(1));
                if (eles) {
                    elements = elements.concat(toArray(eles));
                }
            } else {
                var eles = this[0][i].getElementsByTagName(selector);
                if (eles) {
                    elements = elements.concat(toArray(eles));
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

nnq.prototype.change = function(callback, args) {
    if (callback || this[0]) {
        if (this[0] instanceof HTMLCollection) {
            for (var i = 0; i < this[0].length; i++) {
                this[0].addEventListener("change", callback);
            }
        } else {
            this[0].addEventListener("change", callback);
        }
    }
}

nnq.prototype.blur = function(callback, args) {
    if (callback || this[0]) {
        if (this[0] instanceof HTMLCollection) {
            for (var i = 0; i < this[0].length; i++) {
                this[0].addEventListener("blur", callback);
            }
        } else {
            this[0].addEventListener("blur", callback);
        }
    }
}

nnq.prototype.attr = function(name, value) {
    if (this[0]) {
        if (name) {
            if (value) {
                this[0].setAttribute(name, value);
            } else {
                return this[0].getAttribute(name);
            }
        }
    }
}

nnq.prototype.value = function(value) {
    if (this[0]) {
        if (value) {
            this[0].value = value;
        } else {
            return this[0].value;
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

// alert js
nnq(function(nnq) {

    function init(nnq) {
        initalizeElement(nnq);
    }

    function initalizeElement(nnq) {
        var date = new Date().getTime();
        var id = date + Math.random();
        var alert_ele = [];
        alert_ele.push(' <div id="')
        alert_ele.push(id);
        alert_ele.push('" class="nnq-message nnq-alert__message nnq-message--');
        alert_ele.push(nnq.alert.defaults.type);
        alert_ele.push('" ');
        var baseTop = nnq.alert.defaults.baseTop;
        var alertNum = nnq.alert.defaults.alertList.length;
        if (alertNum >= 1) {
            baseTop = alertNum * nnq.alert.defaults.addTop + nnq.alert.defaults.baseTop;
        }
        alert_ele.push('style="top:');
        alert_ele.push(baseTop);
        alert_ele.push('px;"');
        alert_ele.push(' >');
        alert_ele.push('<i class="nnq-message-icon ')
        alert_ele.push(nnq.alert.defaults.icon);
        alert_ele.push('"></i>');
        alert_ele.push('<span class="nnq-message-lable">');
        alert_ele.push(nnq.alert.defaults.message);
        alert_ele.push('</span>');
        alert_ele.push('</div>');

        var alertText = alert_ele.join("");

        var element = { "id": "" + id, "datetime": date, "alertText": alertText };
        nnq.alert.defaults.alertList.push(element);
        alertElement(element);
    }

    function alertElement(element) {
        nnq("body").each(function() {
            nnq(this).innerHTML(nnq(this).innerHTML() + element.alertText);
        })
    }

    setInterval(() => {
        removeElement();
    }, 1000);

    function removeElement() {

        var alertList = nnq.alert.defaults.alertList;

        for (var i = 0; i < alertList.length; i++) {
            var date = new Date().getTime();
            if (alertList[i].datetime < date - nnq.alert.defaults.lifeDate) {
                nnq("#" + alertList[i].id).remove()
                alertList.splice(i, i + 1);

                nnq(".nnq-alert__message").each(function() {
                    var top = nnq(this)[0].style.top.replace("px", "");
                    nnq(this)[0].style.top = (Number(top) - nnq.alert.defaults.addTop) + "px";
                });
                break;
            }
        }
    }

    nnq.alert = function(options) {
        if (typeof options == 'string') {
            nnq.alert.defaults.message = options;
            nnq.alert.defaults.type = "primary";
        } else {
            nnq.extend(nnq.alert.defaults, options);
        }
        init(nnq);
    }

    nnq.alert.defaults = {
        message: "Tips Message",
        type: "primary",
        icon: "nnq-icon-warnning",
        alertList: [],
        baseTop: 20,
        addTop: 64,
        lifeDate: 3000
    }

})

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
                    trNodes[i].className = "nnq-table-row";
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
                    nnq(this)[0].parentNode.nextElementSibling.className = "nnq-tree-ul";
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
                    nnq(this)[0].parentNode.nextElementSibling.className = "nnq-tree-ul";
                }
                return;
            }
        });
    });

}