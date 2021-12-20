nnq.pagination = {
    refresh: function() {
        var paginationClassName = ".nnq-pagination";
        var pagerClassName = ".nnq-pagination-pager";
        nnq(paginationClassName).each(function() {
            var total = nnq(this).attr("total");
            var current = nnq(this).attr("current");
            var pageNum = nnq(this).attr("pageNum");
            var pageNumConut = 7;
            if (pageNum) {
                var pageNumConut = Number(pageNum);
            }
            if (!total || !current) {
                return;
            }
            if (Number(total) < Number(current))
                return;
            nnq(this).find(pagerClassName).each(function() {
                var pagerEle = [];
                if (Number(total) <= pageNumConut) {
                    for (var i = 1; i <= Number(total); i++) {
                        if (i == Number(current)) {
                            pagerEle.push('&nbsp;<li class="number nnq-pagination-pager--active">');
                            pagerEle.push(i);
                            pagerEle.push('</li>&nbsp;');
                        } else {
                            pagerEle.push('&nbsp;<li class="number">');
                            pagerEle.push(i);
                            pagerEle.push('</li>&nbsp;');
                        }
                    }
                } else {
                    if ((pageNumConut - 2) > Number(current)) {
                        for (var i = 1; i <= (pageNumConut - 1); i++) {
                            if (i == Number(current)) {
                                pagerEle.push('&nbsp;<li class="number nnq-pagination-pager--active">');
                                pagerEle.push(i);
                                pagerEle.push('</li>&nbsp;');
                            } else {
                                pagerEle.push('&nbsp;<li class="number">');
                                pagerEle.push(i);
                                pagerEle.push('</li>&nbsp;');
                            }
                        }
                        pagerEle.push('&nbsp;<li class="number nnq-icon-omit">');
                        pagerEle.push('</li>&nbsp;');
                        pagerEle.push('&nbsp;<li class="number">');
                        pagerEle.push(Number(total));
                        pagerEle.push('</li>&nbsp;');
                    } else if (Number(current) > Number(total) - (pageNumConut - 2)) {
                        pagerEle.push('&nbsp;<li class="number">');
                        pagerEle.push(1);
                        pagerEle.push('</li>&nbsp;');
                        pagerEle.push('&nbsp;<li class="number nnq-icon-omit">');
                        pagerEle.push('</li>&nbsp;');
                        for (var i = Number(total) - (pageNumConut - 2); i <= Number(total); i++) {
                            if (i == Number(current)) {
                                pagerEle.push('&nbsp;<li class="number nnq-pagination-pager--active">');
                                pagerEle.push(i);
                                pagerEle.push('</li>&nbsp;');
                            } else {
                                pagerEle.push('&nbsp;<li class="number">');
                                pagerEle.push(i);
                                pagerEle.push('</li>&nbsp;');
                            }
                        }
                    } else {
                        var startPageNum = Number(current) - Math.floor((pageNumConut - 2) / 2);
                        var endPageNum = Number(current) + Math.floor((pageNumConut - 2) / 2);
                        pagerEle.push('&nbsp;<li class="number">');
                        pagerEle.push(1);
                        pagerEle.push('</li>&nbsp;');
                        pagerEle.push('&nbsp;<li class="number nnq-icon-omit">');
                        pagerEle.push('</li>&nbsp;');

                        for (var i = startPageNum; i <= endPageNum; i++) {
                            if (i == Number(current)) {
                                pagerEle.push('&nbsp;<li class="number  nnq-pagination-pager--active">');
                                pagerEle.push(i);
                                pagerEle.push('</li>&nbsp;');
                            } else {
                                pagerEle.push('&nbsp;<li class="number">');
                                pagerEle.push(i);
                                pagerEle.push('</li>&nbsp;');
                            }
                        }
                        pagerEle.push('&nbsp;<li class="number nnq-icon-omit">');
                        pagerEle.push('</li>&nbsp;');
                        pagerEle.push('&nbsp;<li class="number">');
                        pagerEle.push(Number(total));
                        pagerEle.push('</li>&nbsp;');
                    }
                }
                nnq(this).html(pagerEle.join(""));
            });
        });
    },
    bindEvent: function() {
        nnq.pagination.skipEvent();
        nnq.pagination.prevEvent();
        nnq.pagination.nextEvent();
    },
    skipEvent: function() {
        var pagerClassName = ".nnq-pagination-pager";
        var numberClassName = ".number";
        nnq(pagerClassName).find(numberClassName).each(function() {
            nnq(this).click(function() {
                if (nnq(this).html()) {
                    nnq(nnq(this)[0].parentNode.parentNode).attr("current", nnq(this).html());
                    nnq.pagination.refresh();
                    nnq.pagination.skipEvent();
                    nnq.pagination.callback(nnq(this).html());
                }
            });
        });
    },
    prevEvent: function() {
        var prevClassName = ".nnq-pagination-prev";
        nnq(prevClassName).each(function() {
            nnq(this).click(function() {
                var current = Number(nnq(nnq(this)[0].parentNode).attr("current"));
                if (current-- < 0) {
                    current = 0
                }
                nnq(nnq(this)[0].parentNode).attr("current", current);
                nnq.pagination.refresh();
                nnq.pagination.skipEvent();
                nnq.pagination.callback(current);
            });
        })
    },
    nextEvent: function() {
        var nextClassName = ".nnq-pagination-next";
        nnq(nextClassName).each(function() {
            nnq(this).click(function() {
                var current = Number(nnq(nnq(this)[0].parentNode).attr("current"));
                var total = Number(nnq(nnq(this)[0].parentNode).attr("total"));
                if (current++ >= total) {
                    current = total
                }
                nnq(nnq(this)[0].parentNode).attr("current", current);
                nnq.pagination.refresh();
                nnq.pagination.skipEvent();
                nnq.pagination.callback(current);
            });
        })
    },
    callback: function(current, pageSize) {
        console.log(current, pageSize);
    }
}

window.onload = function() {
    nnq(function() {
        nnq.pagination.refresh();
        nnq.pagination.bindEvent();
    });
}