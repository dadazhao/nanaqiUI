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