/**
 *
 */
const TableViewProto = {
    // store (TableModel)
    model: {},
    //output stream
    html: "",

     _printHeader: function () {
        //start table row
        this._out(Templates.tr[0]);

        var header = this.model.getDataHeader()
        var keyIndex = 0;
        for (var key in header) {
            if (header.hasOwnProperty(key)) {

                //add header cell
                var out = Templates.th[0] + header[key] + this._printSortButtons(keyIndex) + Templates.th[1];
                this._out(out);
                keyIndex++
            }
        }
        //end table row
        this._out(Templates.tr[1]);
    },

    _printSortButtons: function (keyIndex) {
        var out = Templates.sortAsc[0] + keyIndex + Templates.sortAsc[1] +
            Templates.sortDesc[0] + keyIndex + Templates.sortDesc[1];
        return out
    },

    /**
     * outut table body = data rows
     * O(n*m) its terrible I know...
     * @private
     */
    _printRows: function () {

        let rows = this.model.getDataRows();
        for (let i = 0; i < rows.length; i++) {

            let out = Templates.tr[[0]]

            for (let e = 1; e < rows[i].length; e++) {
                out += Templates.td[0] +
                    " onblur=\"UIevents.change('" + rows[i][0] + "' , '" + e + "', this)\" " +
                    " onclick=\"UIevents.selectRow('" + rows[i][0] + "', this)\" >" +
                    rows[i][e] +
                    Templates.td[1];
            }


            this._out(out)
        }
        this._out(Templates.tr[[1]])
    },

    _printPagination: function () {
        //print pages list
        const model = this.model;
        let out = "<div class='pages'> Pages: ";
        const maxpages=model.filteredDataCount/ model.pageSize
        for (let i = 0; i < maxpages; i ++) {

            if (i == model.curPage) {
                // active button
                out += "<span>" + (i + 1) + "</span>";
            } else {
                out += "<button onclick='UIevents.page(" + i + ")'>" + (i + 1) + "</button>";
            }

        }
        out+="</div>";
        out+="<div>Total: "+(model.fullData.length-1)+" items. Filtered: "+(model.filteredDataCount)+" items";
        this._out(out)
    },
}

/**
 *
 * @param model
 * @constructor
 */
const TableView = function (model) {
    this.model = model;
    this.html = "";

    this._out(Templates.tabStart[0]);

    this._printHeader();
    this._printRows();
    this._out(Templates.tabStart[1]);

    this._printPagination();
}

Object.assign(TableViewProto, View)
TableView.prototype = TableViewProto;


const Templates = {
    tabStart: ["<table><tbody>", "</tbody></table>"],
    tr: ["<tr>", "</tr>"],
    th: ["<th>", "</th>"],
    td: ["<td contenteditable='true' ", "</td>"],
    sortAsc: ['<button class=\'asc\' onclick=\'UIevents.sortBy("', '","asc")\'>▲</button>'],
    sortDesc: ['<button class=\'desc\' onclick=\'UIevents.sortBy("', '","desc")\'>▼</button>']
};