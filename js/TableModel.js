const TableModelProto = {
        fullData: {},
        viewedData: {},
        pageSize: 5,
        curPage: 0,

        sort: "",
        sortDir: "desc",
        filter: "",

        getDataHeader: function () {
            return this.fullData[0]
        },

        //return table rows accroding to pagination, sort etc
        getDataRows: function () {
            var data = this.fullData.slice(1)
            //apply filter to all data
            if (this.filter != "") {
                data = this._applyFilter(data, this.filter);
            }
            //save filtered data count
            this.filteredDataCount = data.length;

            //apply sort to all data
            if (this.sort != "") {
                this._applySort(data, this.sort, this.sortDir)
            }

            //select data page
            if (data.length > this.pageSize) {
                data = this._applyPage(data, this.pageSize, this.curPage)

            }

            this.viewedData = data
            return data;
        },
        /**
         * Edit cell value
         *
         *
         * @param rowIndex
         * @param keyIndex
         * @param value
         */
        setValue: function (rowIndex, keyIndex, value) {
            try {
                this.fullData[rowIndex][keyIndex] = value
            } catch (e) {
                Controller.message("set value error")
            }

        },

        /**
         * apply new row to main Store
         */
        addItem: function (data) {
            //add new id
            data.unshift("new_" + this.fullData.length);

            this.fullData.push(data)

        },
        del: function (index) {
            var that = this
            let item = this.fullData.find(function (item, k) {
                    if (k == 0) return false
                    //d(item)
                    if (item[0] === index) {
                        that.fullData.splice(k, 1);
                        return true;

                    }
                }
            )

        },


        _applyFilter: function (data, filter) {

            data = data.filter(function (row) {
                var t = row.find(function (item) {

                    if (item == filter || (item.indexOf && item.indexOf(filter) > -1)) return true;
                });
                return t;
            })
            return data
        },

        _applySort: function (data, sortKey, sortDir) {

            data = data.sort(function (a, b) {

                const nameA = a[sortKey];
                const nameB = b[sortKey];
                let out = 0;

                if (nameA < nameB) {
                    out = -1;
                }
                if (nameA > nameB) {
                    out = 1;
                }
                if (sortDir === "desc") out = (out === 1 ? -1 : 1);

                return out;

            })

            return data
        },
        /**
         *
         * @param data
         * @param pageSize starting with 0
         * @param curPage
         * @private
         */
        _applyPage: function (data, pageSize, curPage) {
            const start = pageSize * curPage
            const end = start + pageSize

            return data.slice(start, end)

        }

    }
;

/**
 *
 * @param data
 * @constructor
 */
const TableModel = function (data) {

    //apply custom uniq ID
    for (let i = 1; i < data.length; i++) {
        data[i].unshift(i)
    }


    this.fullData = data
}


TableModel.prototype = TableModelProto


