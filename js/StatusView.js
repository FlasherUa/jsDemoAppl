var StatusViewProto = {
    changed: function () {

    },

    _printFilter: function () {

        let out = "<div >Filter: <input type='text' onchange='UIevents.filter(this.value)' /></div>";
        this._out(out)
    },

    _printSelectedRow: function () {
        if (typeof this.model.selectedRow === "undefined") return
        let out = "<div >Selected index: "+this.model.selectedRow+" <button onclick='UIevents.del("+this.model.selectedRow+")' />Del</div>";
        this._out(out)

    },

    _printSortParams: function () {
        if ( this.model.sort == "") return
        const header=this.model.getDataHeader()
        const keys=Object.keys(header)

        let out = "<div >Sorted by: <i>["+keys[this.model.sort] +", "+ this.model.sortDir +"] </i> <button onclick='UIevents.clearSort()' />Clear sort</div>";
        this._out(out)
    }

}


var StatusView = function (model) {
    this.model = model;
    this.html = "";

    this._printFilter();
    this._printSelectedRow();
    this._printSortParams();


}


Object.assign(StatusViewProto, View);

StatusView.prototype = StatusViewProto