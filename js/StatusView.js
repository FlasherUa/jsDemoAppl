/**
 * Status block renderer
 * @extends View
 */
const StatusView = (function () {
    /**
     * Prototype for StatusView
     */
    const StatusViewProto = {
        /**
         * Print filter status block
         * @private
         */
        _printFilter: function () {
            let out = "<div >Filter: <input id='filter' type='text' placeholder='Press Enter' onchange='UIevents.filter(this.value)' /></div>";
            this._out(out)
        },
        /**
         * Print selected row status block
         * @private
         */
        _printSelectedRow: function () {
            if (typeof this.model.selectedRow === "undefined") return
            let out = "<div >Selected index: " + this.model.selectedRow + " <button id='del' onclick='UIevents.del(\"" + this.model.selectedRow + "\")' />Del</div>";
            this._out(out)
        },
        /**
         * Print sort params status block
         * @private
         */
        _printSortParams: function () {
            if (this.model.sort == "") return;
            const header = this.model.getDataHeader();
            const keys = Object.keys(header);
            let out = "<div >Sorted by: <i>[" + keys[this.model.sort] + ", " + this.model.sortDir + "] </i> <button onclick='UIevents.clearSort()' />Clear sort</div>";
            this._out(out)
        }
    };
    /**
     * StatusView constructor
     * @param {Array} model
     * @constructor
     */
    const StatusView = function (model) {
        //intial setup
        this.model = model;
        this.html = "";
        //do render
        this._printFilter();
        this._printSelectedRow();
        this._printSortParams();
    };

    //apply prototypes
    Object.assign(StatusViewProto, View);
    StatusView.prototype = StatusViewProto;

    /**
     * @export
     */
    return StatusView;
})()