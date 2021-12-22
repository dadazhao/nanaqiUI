nnq(function(nnq) {

    function init(nq) {
        initalizeElement(nq);
        initalizeTotalElement(nq);
        initalizeSelecterElement(nq);
        initalizeSkipPageElement(nq);
        refresh(nq);
    }

    function bindEvent(nq) {
        bindSkipEvent(nq);
        bindPrevEvent(nq);
        bindNextEvent(nq);
        bindSelecterEvent(nq);
        bindSkipPageEvent(nq);
    }

    function initalizeElement(nq) {
        var pagination = nnq.data(nq, "pagination");
        var opts = pagination.options;
        var pagination_ele = [];
        pagination_ele.push('<div class="nnq-pagination" ');
        pagination_ele.push(' total=');
        pagination_ele.push(opts.total);
        pagination_ele.push(' current=');
        pagination_ele.push(opts.current);
        pagination_ele.push('>');
        if (opts.showTotalNum) {
            pagination_ele.push('<div class="nnq-pagination-total"></div>');
        }
        if (opts.showPageSize) {
            pagination_ele.push('<select class="nnq-pagination-selecter"></select>');
        }
        pagination_ele.push('<button class="nnq-pagination-prev"><i class="nnq-icon nnq-icon-left-arrows"></i></button>');
        pagination_ele.push('<ul class="nnq-pagination-pager"></ul>');
        pagination_ele.push('<button class="nnq-pagination-next"><i class="nnq-icon nnq-icon-right-arrows"></i></button>');
        if (opts.showSkipPage) {
            pagination_ele.push('<div class="nnq-pagination-skip">');
            pagination_ele.push('<input class="nnq-pagination-skip-number" value="1" type="text" />');
            pagination_ele.push('</div>');
        }
        pagination_ele.push('</div>');
        nnq(nq).html(pagination_ele.join(""));
    }

    function initalizeTotalElement(nq) {
        var pagination = nnq.data(nq, "pagination");
        var opts = pagination.options;
        var totalClassName = ".nnq-pagination-total";
        nnq(nq).find(totalClassName).each(function() {
            nnq(this).html(opts.totalText.replace("[total]", opts.total));
        });
    }

    function initalizeSelecterElement(nq) {
        var pagination = nnq.data(nq, "pagination");
        var opts = pagination.options;
        var pageSizeClassName = ".nnq-pagination-selecter";
        nnq(nq).find(pageSizeClassName).each(function() {
            var pageSize_ele = [];
            for (var i = 0; i < opts.pageSizeEnum.length; i++) {
                pageSize_ele.push('<option value="');
                pageSize_ele.push(opts.pageSizeEnum[i]);
                pageSize_ele.push('">');
                pageSize_ele.push(opts.pageSizeEnum[i] + opts.pageSizeText);
                pageSize_ele.push('</option>');
            }
            pageSize_ele.push('<option selected value="');
            pageSize_ele.push(opts.pageSize);
            pageSize_ele.push('">');
            pageSize_ele.push(opts.pageSize);
            pageSize_ele.push(opts.pageSizeText);
            pageSize_ele.push('</option>')
            nnq(this).html(pageSize_ele.join(""));
        });
    }

    function initalizeSkipPageElement(nq) {
        var pagination = nnq.data(nq, "pagination");
        var opts = pagination.options;
        var paginationSkip = ".nnq-pagination-skip";
        nnq(nq).find(paginationSkip).each(function() {
            var skipPage_ele = [];
            var skipPage_input = '<input class="nnq-pagination-skip-number"  value="1" type="text" />';
            skipPage_ele.push(opts.skipPageText.replace("[skip]", skipPage_input))
            nnq(this).html(skipPage_ele);
        })
    }

    function refresh(nq) {
        var pagination = nnq.data(nq, "pagination");
        var opts = pagination.options;
        var paginationClassName = ".nnq-pagination";
        var pagerClassName = ".nnq-pagination-pager";
        nnq(nq).find(paginationClassName).each(function() {
            if (!opts.total || !opts.current) {
                return;
            }
            if (opts.total < opts.current)
                return;
            opts.totalPage = Math.ceil(opts.total / opts.pageSize);
            nnq(this).find(pagerClassName).each(function() {
                var pagerEle = [];
                if (opts.totalPage <= opts.pageNumConut) {
                    for (var i = 1; i <= opts.totalPage; i++) {
                        if (i == opts.current) {
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
                    if ((opts.pageNumConut - 2) > opts.current) {
                        for (var i = 1; i <= (opts.pageNumConut - 1); i++) {
                            if (i == opts.current) {
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
                        pagerEle.push(opts.totalPage);
                        pagerEle.push('</li>&nbsp;');
                    } else if (opts.current > opts.totalPage - (opts.pageNumConut - 2)) {
                        pagerEle.push('&nbsp;<li class="number">');
                        pagerEle.push(1);
                        pagerEle.push('</li>&nbsp;');
                        pagerEle.push('&nbsp;<li class="number nnq-icon-omit">');
                        pagerEle.push('</li>&nbsp;');
                        for (var i = opts.totalPage - (opts.pageNumConut - 2); i <= opts.totalPage; i++) {
                            if (i == opts.current) {
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
                        var startPageNum = opts.current - Math.floor((opts.pageNumConut - 2) / 2);
                        var endPageNum = opts.current + Math.floor((opts.pageNumConut - 2) / 2);
                        pagerEle.push('&nbsp;<li class="number">');
                        pagerEle.push(1);
                        pagerEle.push('</li>&nbsp;');
                        pagerEle.push('&nbsp;<li class="number nnq-icon-omit">');
                        pagerEle.push('</li>&nbsp;');

                        for (var i = startPageNum; i <= endPageNum; i++) {
                            if (i == opts.current) {
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
                        pagerEle.push(opts.totalPage);
                        pagerEle.push('</li>&nbsp;');
                    }
                }
                skipEventListener(nq);
                nnq(this).html(pagerEle.join(""));
            });
        });
    }

    function bindSkipEvent(nq) {
        var pagination = nnq.data(nq, "pagination");
        var opts = pagination.options;
        var pagerClassName = ".nnq-pagination-pager";
        var numberClassName = ".number";
        nnq(nq).find(pagerClassName).find(numberClassName).each(function() {
            nnq(this).click(function() {
                if (nnq(this).html()) {
                    opts.current = Number(nnq(this).html());
                    refresh(nq);
                    bindSkipEvent(nq);
                }
            });
        });
    }

    function bindPrevEvent(nq) {
        var pagination = nnq.data(nq, "pagination");
        var opts = pagination.options;
        var prevClassName = ".nnq-pagination-prev";
        nnq(nq).find(prevClassName).each(function() {
            nnq(this).click(function() {
                if (opts.current-- <= 1) {
                    opts.current = 1;
                    return;
                }
                refresh(nq);
                bindSkipEvent(nq);
            });
        })
    }

    function bindNextEvent(nq) {
        var pagination = nnq.data(nq, "pagination");
        var opts = pagination.options;
        var nextClassName = ".nnq-pagination-next";
        nnq(nq).find(nextClassName).each(function() {
            nnq(this).click(function() {
                if (opts.current++ >= opts.totalPage) {
                    opts.current = opts.totalPage
                    return;
                }
                refresh(nq);
                bindSkipEvent(nq);
            });
        })
    }

    function skipEventListener(nq) {
        var pagination = nnq.data(nq, "pagination");
        var opts = pagination.options;
        if (isFunc(opts.skipEvent)) {
            opts.skipEvent(opts.current, opts.totalPage);
        }
    }

    function bindSelecterEvent(nq) {
        var pagination = nnq.data(nq, "pagination");
        var opts = pagination.options;
        var pageSizeClassName = ".nnq-pagination-selecter";
        nnq(nq).find(pageSizeClassName).each(function() {
            nnq(this).change(function() {
                opts.pageSize = Number(nnq(this).value());
                refresh(nq);
                bindSkipEvent(nq);
            });
        })
    }

    function bindSkipPageEvent(nq) {
        var pagination = nnq.data(nq, "pagination");
        var opts = pagination.options;
        var skipPageClassName = ".nnq-pagination-skip-number";

        nnq(nq).find(skipPageClassName).each(function() {
            nnq(this).blur(function() {
                if (Number(nnq(this).value()) < 1 || Number(nnq(this).value()) > opts.totalPage)
                    return;
                opts.current = Number(nnq(this).value());
                refresh(nq);
                bindSkipEvent(nq);
            });
        })

    }

    nnq.fn.pagination = function(options, param) {
        if (typeof options == "string") {
            return nnq.fn.pagination.methods[options](this[0], param);
        }
        options = options || {};
        return this.each(function() {
            var state = nnq.data(this, "pagination");
            var opts;
            if (state) {
                opts = nnq.extend(state.options, options);
                state.options = opts;
            } else {
                opts = nnq.extend(nnq.extend({}, nnq.fn.pagination.defaults), options);
                nnq.data(this, "pagination", {
                    options: opts
                });
            }
            init(this);
            bindEvent(this);
        });
    }

    nnq.fn.pagination.methods = {
        skipEvent: function(nq, param) {
            var pagination = nnq.data(nq, "pagination");
            var opts = pagination.options;
            if (isFunc(param)) {
                param(opts.current, opts.totalPage);
            }
        }
    }

    nnq.fn.pagination.defaults = {
        total: 1000,
        pageSize: 50,
        current: 1,
        totalText: "共[total]条",
        pageNumConut: 7,
        pageSizeText: "条/页",
        pageSizeEnum: [50, 100, 150],
        skipPageText: "前往[skip]页",
        showTotalNum: false,
        showPageSize: false,
        showSkipPage: false
    }
})