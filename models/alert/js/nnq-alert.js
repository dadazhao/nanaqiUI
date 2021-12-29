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
            nnq(this).html(nnq(this).html() + element.alertText);
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
            nnq.alert.defaults.icon = "nnq-icon-warnning";
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
    nnq.alert("aaaa");
    nnq.alert("bbb");
    nnq.alert("ccc");
    nnq.alert("aaaa");
    nnq.alert("bbb");
    nnq.alert("ccc");
    nnq.alert({ message: "ccc", type: "success" });
    // console.log(nnq("#aaa"));
}