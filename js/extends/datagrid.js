nnq(function() {

    // init
    function init(jq) {
        var datagrid = nnq.data(jq, "datagrid");
        var opts = datagrid.options;

        //initalize element
        initalizeElement(jq);
        //create table header
        createTableHeader(jq);
        //create table body
        createTableBody(1, jq);
        //create table footer
        //createTableFooter(jq);
    }
    // bind event
    function bindEvent(jq) {
        //first page event
        registerFirstPageEvent(jq);
        //page up event
        registerPageUpEvent(jq);
        //page down event
        registerPageDownEvent(jq);
        //last page event
        registerLastPageEvent(jq);
        //skip page event
        registerSkipPageEvent(jq);
        //page size select event
        registerPageSizeEvent(jq);
        //close event bubble
        registerBubbleCloseEvent(jq);
    }

    function initalizeElement(jq) {
        var datagrid = nnq.data(jq, "datagrid");
        var opts = datagrid.options;
        //table header
        var ele = [];
        ele.push('<table class="nnq-table nnq-table--hover nnq-table--border">');
        ele.push('<thead class="nnq-table-header"></thead>');
        //table body
        ele.push('<tbody class="nnq-table-body"></tbody>');
        //add to table container element
        nnq(jq).html(ele.join(""));
    }

    function createTableHeader(jq) {
        var datagrid = nnq.data(jq, "datagrid");
        var opts = datagrid.options;
        //table column format
        var cols = opts.columns;
        //header start
        var ele = ['<tr>'];
        for (var i = 0; i < cols.length; i++) {
            if (cols[i].field == 'ck') {
                if (cols[i].width == null) {
                    ele.push('<th width="5%"');
                    ele.push('" align="');
                    ele.push(cols[i].align);
                    ele.push('">');
                } else {
                    ele.push('<th width="');
                    ele.push(cols[i].width);
                    ele.push('" align="');
                    ele.push(cols[i].align);
                    ele.push('">');
                }
                ele.push('<label class="nnq-checkbox"> <span class="nnq-checkbox--input"> <input type="checkbox" hidden="hidden"> <span class="nnq-checkbox--icon"></span> </span> <span class="nnq-checkbox--lable"></span> </label>');
                ele.push('</th>');
            } else {
                ele.push('<th width="');
                ele.push(cols[i].width);
                ele.push('" align="');
                ele.push(cols[i].align);
                ele.push('">');
                ele.push('<div class="nnq-cell ">');
                ele.push(cols[i].title);
                ele.push('</div>');
            }
        }
        ele.push('</tr>');
        //add to header element
        nnq(jq).find('.nnq-table-header').each(function() {
            nnq(this).html(ele.join(""));
        })

    }

    function createTableBody(pn, jq) {
        var datagrid = nnq.data(jq, "datagrid");
        var opts = datagrid.options;
        //table column format
        var cols = opts.columns;
        if (opts.url != null) {
            opts.data = getAjaxData(opts.url, opts.method, opts.params);
        }
        //data json 
        var json = opts.data[opts.dataName];
        var totalNum = opts.data[opts.totalName];
        //is use paging
        if (opts.paging) {
            //calculation total page num
            opts.totalPage = Math.ceil(totalNum / opts.pageSize);
            //start row num
            var startRow = opts.pageSize * (pn - 1);
            //end rows num
            var endRow = startRow + opts.pageSize;
        } else {
            //calculation total page num
            opts.totalPage = Math.ceil(json.length / opts.pageSize);
            //start row num
            var startRow = 0;
            //end rows num
            var endRow = json.length;
        }

        //data element
        var ele = [];

        for (var i = startRow; i < endRow; i++) {
            //Crossing the line detection
            if (i >= json.length) break;
            ele.push('<tr>');
            //list cols
            for (var j = 0; j < cols.length; j++) {
                //user interface
                if (cols[j].template != null) {
                    ele.push('<td width="' + cols[j].width + '" align="' + cols[j].align + '">');
                    ele.push('<div class="nnq-cell">');
                    ele.push(cols[j].template(json[i]));
                    ele.push('</div>');
                    ele.push('</td>');
                } else {
                    if (cols[j].field == 'ck') {
                        if (cols[j].width == null) {
                            ele.push('<td width="5%"');
                            ele.push(' align="');
                            ele.push(cols[j].align);
                            ele.push('">');
                        } else {
                            ele.push('<td width="' + cols[j].width + '"');
                            ele.push(' align="');
                            ele.push(cols[j].align);
                            ele.push('">');
                        }
                        ele.push('<label class="nnq-checkbox"> <span class="nnq-checkbox--input"> <input type="checkbox" hidden="hidden"> <span class="nnq-checkbox--icon"></span> </span> <span class="nnq-checkbox--lable"></span> </label></td>');
                    } else {
                        ele.push('<td width="' + cols[j].width + '" align="' + cols[j].align + '">');
                        ele.push('<div class="nnq-cell">');
                        ele.push(json[i][cols[j].field]);
                        ele.push('</div>');
                        ele.push('</td>');
                    }
                }
            }
            ele.push('</tr>');
        }
        nnq(jq).find('.nnq-table-body').each(function() {
            nnq(this).html(ele.join(""));
        })
    }

    nnq.fn.datagrid = function(options, param) {

        if (typeof options == "string") {
            return nnq.fn.datagrid.methods[options](this, param);
        }
        options = options || {};
        return this.each(function() {
            var state = nnq.data(this, "datagrid");

            var opts;
            if (state) {
                opts = nnq.extend(state.options, options);
                state.options = opts;
            } else {
                opts = nnq.extend(nnq.extend({}, nnq.fn.datagrid.defaults), options);
                nnq.data(this, "datagrid", {
                    options: opts,
                    selectedRows: [],
                    checkedRows: [],
                    data: { total: 0, rows: [] },
                    originalRows: [],
                    updatedRows: [],
                    insertedRows: [],
                    deletedRows: []
                });
            }
            init(this);
            //bindEvent(this);
        });
    }

    function getAjaxData(url, type, params) {
        var result;
        nnq.ajax({
            url: url,
            type: type,
            async: false,
            dataType: "json",
            //async
            data: params,
            success: function(data) {
                result = data;
            }
        });
        return result;
    }
    nnq.fn.datagrid.defaults = {
        // element id ps:"#id"
        id: '',
        url: null,
        method: 'post',
        params: {},
        columns: [],
        data: {},
        //key name
        dataName: 'data',
        totalName: 'total',
        //everyone page line num
        select: [10, 20, 30],
        //default show text
        showText: ['first', 'page up', 'page down', 'last'],
        //hover chaged color
        isHoverColor: false,
        //interlaced discoloration
        isEvenColor: false,
        //current page index 1
        pageIndex: 1,
        //one page size
        pageSize: 10,
        //total page
        totalPage: 0,
        //use paging
        paging: false,
    }
})