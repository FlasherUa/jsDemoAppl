var TableModel = (function () {
    var TableModelProto = {
        /**
         * @var {Object} all data holder
         */
        fullData: {},
        /**
         * @var {Object} Viewed in the table data
         */
        viewedData: {},
        /**
         * @var {Number} items on page
         */
        pageSize: 5,
        /**
         *  @var {Number}
         */
        curPage: 0,
        /**
         * @var {String}  Sort field index
         */
        sort: "",
        /**
         * @var  {String} Sort direction
         */
        sortDir: "desc",
        /**
         * @var {String} Filter pattern
         */
        filter: "",

        /**
         * get headers for cells
         * @return {Object}
         */
        getDataHeader: function () {
            return this.fullData[0]
        },
        /**
         * return viewing table rows accroding to pagination, sort, filter etc
         *
         * @return {Array}
         */
        getDataRows: function () {
            var data = this.fullData.slice(1)
            //apply filter to all data
            if (this.filter != "") {
                data = this._applyFilter(data, this.filter);
            }
            //save filtered data count
            this.filteredDataCount = data.length;

            //apply sort to all data
            if (this.sort !== "") {
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
         * @param {Number} rowIndex
         * @param {Number} keyIndex
         * @param {String} value
         */
        setValue: function (rowIndex, keyIndex, value) {

            var row = this.fullData.find(function (item) {
                return rowIndex == item[0]
            });

            try {
                row[keyIndex] = value
            } catch (e) {
                Controller.message("set value error")
            }
        },
        /**
         * Add new row to main Store
         *
         * @param {Array} data
         */
        addItem: function (data) {
            //add new id
            data.unshift("new_" + this.fullData.length);
            this.fullData.push(data)
        },
        /**
         * Delete row
         *
         * @param {Number} index
         */
        del: function (index) {
            var that = this
            this.fullData.find(function (item, k) {
                if (k == 0) return false
                //d(item)
                if (item[0] == index) {
                    that.fullData.splice(k, 1);
                    return true;
                }
            })// eof find

            //fix page
            if ((this.curPage + 1) * this.pageSize > this.fullData.length - 1) this.curPage--;
            if (this.curPage < 0) this.curPage = 0;
        },

        /**
         * Filter array with string pattern
         * @private
         *
         * @param {Array} data
         * @param {String} filter  string pattern
         *
         * @return {Array}
         *
         */
        _applyFilter: function (data, filter) {

            data = data.filter(function (row) {
                var t = row.find(function (item) {
                    if (item == filter || (item.indexOf && item.indexOf(filter) > -1)) return true;
                });
                return t;
            })
            return data
        },
        /**
         * Sort data in array
         * @private
         *
         * @param {Array} data
         * @param sortKey
         * @param sortDir
         *
         * @return {Array}
         */
        _applySort: function (data, sortKey, sortDir) {

            data = data.sort(function (a, b) {
                var A = a[1 + Number(sortKey)];
                var B = b[1 + Number(sortKey)];

                if (A.toUpperCase) {
                    A = A.toUpperCase();
                }
                if (B.toUpperCase) {
                    B = B.toUpperCase();
                }
                var nA = parseInt(A),
                    nB = parseInt(B);

                if (!isNaN(nA) && !isNaN(nB)) {
                    A = nA;
                    B = nB
                }

                var out = 0;
                if (A < B) {
                    out = -1;
                }
                if (A > B) {
                    out = 1;
                }
                if (sortDir === "desc") out = (out === 1 ? -1 : 1);
                return out;
            });
            return data
        },
        /**
         * Slice data with a current page value
         * @private
         *
         * @param data
         * @param pageSize starting with 0
         * @param curPage
         *
         * @return {Array}
         */
        _applyPage: function (data, pageSize, curPage) {
            var start = pageSize * curPage
            var end = start + pageSize
            return data.slice(start, end)
        }
    };
    /**
     *
     * @param data
     * @constructor
     */
    var TableModel = function (data) {
        //apply custom uniq ID
        for (var i = 1; i < data.length; i++) {
            data[i].unshift(i)
        }
        this.fullData = data
    }

    //apply prototypes
    TableModel.prototype = TableModelProto

    /**
     * @export
     */
    return TableModel
})()