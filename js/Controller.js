/**
 * Main Application Controller
 */
var Controller = (function () {

    /**
     * @var {Object} Container for TableView
     */
    var tableView;

    /**
     * @var {Object} Container for TableModel
     */
    var tableModel;

    /**
     * @var {Object} Container for StatusView
     */
    var statusView;

    var Controller = {
        /**
         * Do Start!
         * load data file
         * @param file
         */
        appStart: function (file) {
            ajax.get(file, null, Controller._onFileLoaded)

        },
        /**
         * Callback on file data loaded
         * @private
         * @throws
         *
         * @param {String} data JSON source
         */
        _onFileLoaded: function (data) {
            var obj;
            try {
                obj = JSON.parse(data)

            } catch (e) {

                Controller.error("bad file JSON", e)
                return
            }
            Controller.setModel(obj)
        },
        /**
         * On element edited
         *
         * @param rowIndex
         * @param keyIndex
         * @param node
         */
        change: function (rowIndex, keyIndex, node) {
            tableModel.setValue(rowIndex, keyIndex, node.innerHTML)
        },

        /**
         * Set new data model for app
         *
         * @param {Array} data
         */
        setModel: function (data) {
            tableModel = new TableModel(data);
            Controller._refreshList();
            Controller.hideForm()
        },
        /**
         * Select table row for future operations
         *
         * @param rowIndex
         */
        selectRow: function (rowIndex) {
            tableModel.selectedRow = rowIndex
            Controller._renderStatus();
        },
        /**
         * Add filter to table data
         *
         * @param {String} filter pattern
         */
        filter: function (filter) {
            tableModel.filter = filter
            Controller.page(0)
        },
        /**
         * Delete selected row
         *
         * @param {Number} index
         */
        del: function (index) {
            tableModel.del(index);
            delete tableModel.selectedRow;
            Controller._renderTable();
            Controller._renderStatus()

        },

        /**
         * Set page for list
         *
         * @param {Number} page
         */
        page: function (page) {
            tableModel.curPage = page
            Controller._renderTable()
        },
        /**
         * Show error message
         *
         * @param {String} message
         * @param {Object} e
         */
        error: function (message, e) {
            d(e);
            alert(message);

        },
        /**
         * Show add item inputs
         */
        showAddForm: function () {
            var formView = new FormView(tableModel);
            formView.render("form");
        },
        hideForm:function () {

          document.getElementById("formContainer").classList.remove("shown")
        },
        /**
         * Add data as model item
         *
         * @param data
         */
        addItem: function (data) {
            tableModel.addItem(data)
            Controller._refreshList()
        },
        /**
         * Apply sort to table data
         *
         * @param {Number} sort key index
         * @param {String} sortDir asc|desc
         */
        sortBy: function (sort, sortDir) {
            //sort model
            tableModel.sort = sort;
            tableModel.sortDir = sortDir;
            //re-render table
            Controller._refreshList()
        },
        /**
         * Delete sort params from model
         */
        clearSort: function () {
            tableModel.sort = "";
            Controller._refreshList()
        },
        /**
         * Re-render all views
         * set page =0
         *
         * @private
         */
        _refreshList: function () {
            tableModel.curPage = 0;
            Controller._renderTable();
            Controller._renderStatus()
        },
        /**
         * (Re)render table only
         * @private
         */
        _renderTable: function () {
            tableView = new TableView(tableModel);
            tableView.render("tab");
        },
        /**
         * (Re)render status block
         * @private
         */
        _renderStatus: function () {
            statusView = new StatusView(tableModel);
            statusView.render("status");
        }
    };

    /**
     * @export
     */
    return Controller;
})();
