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