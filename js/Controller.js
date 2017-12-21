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

/**
 * main Controller
 *
 */
const Controller = {
    /**
     * Do Start!
     * @param file
     */
    appStart: function (file) {
        ajax.get(file, null, Controller.onFileLoaded)

    },
    onFileLoaded: function (data) {
        try {
            data = JSON.parse(data)

        } catch (e) {

            Controller.error("bad file JSON", e)
            return
        }

        tableModel = new TableModel(data);
        Controller._renderTable()

        Controller._renderStatus()


    },
    selectRow: function (rowIndex) {
        tableModel.selectedRow = rowIndex
        Controller._renderStatus();
    },

    filter: function (filter) {
        tableModel.filter = filter
        Controller.page(0)
    },
    del: function (index) {
        tableModel.del(index)
        delete tableModel.selectedRow
        Controller._renderTable()
        Controller._renderStatus()

    },
    onDataChanged: function () {
    },

    page: function (page) {
        tableModel.curPage = page
        Controller._renderTable()
    },
    error: function (message, e) {
        d(e);
        alert(message);

    },
    showAddForm: function () {


        var formView = new FormView(tableModel);
        formView.render("form");


    },
    addItem: function (data) {
       tableModel.addItem(data)
       Controller._refreshList()

    },
    sortBy: function (key, dir) {
        //sort model
        //re-render table
        tableModel.sort = key;
        tableModel.sortDir = dir;
        Controller._refreshList()
    },
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
    _renderTable: function () {
        tableView = new TableView(tableModel);
        tableView.render("tab");
    },
    _renderStatus: function () {
        statusView = new StatusView(tableModel);
        statusView.render("status");
    }


};