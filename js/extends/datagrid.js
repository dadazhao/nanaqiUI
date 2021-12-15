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
        //createTableBody(1, jq);
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
        nnq(opts.id).html(ele.join(""));
    }

    function createTableHeader(jq) {
        var datagrid = nnq.data(jq, "datagrid");
        var opts = datagrid.options;
        //table column format
        var cols = opts.columns;
        //header start
        var ele = ["<tr>"];
        for (var i = 0; i < cols.length; i++) {
            if (cols[i].field == 'ck') {
                if (cols[i].width == null) {
                    ele.push("<th width='5%'>");
                } else {
                    ele.push('<th width="');
                    ele.push(cols[i].width);
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
                ele.push('<div class="aaa"></div>');
                ele.push(cols[i].title);
                ele.push('</div>');
            }
        }
        ele.push('</tr>');
        //add to header element
        nnq(opts.id).find(".nnq-table-header").each(function() {
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