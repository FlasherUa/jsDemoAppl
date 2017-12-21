window.UIevents = {

    /**
     * on element edited
     * @param rowIndex
     * @param keyIndex
     * @param node
     */
    change: function (rowIndex, keyIndex, node) {

        var value = this.innerHTML;
        tableModel.setValue(rowIndex, keyIndex, value)

    },
    selectRow: function (rowIndex, node) {

        Controller.selectRow(rowIndex)

    },
    sortBy: Controller.sortBy,

    clearSort: Controller.clearSort,
    filter: Controller.filter,
    page: Controller.page,
    del: Controller.del,
    showAddForm: function () {
        //hide butt
        var formC = document.getElementById("formContainer");
        formC.classList.add("shown")

        Controller.showAddForm()
    },
    addItem:function () {
        var elements = document.getElementById("addForm").elements;
        var obj =[];
        for(var i = 0 ; i < elements.length ; i++){

            var item = elements.item(i);
            if (item.name!=="") obj[item.name] = item.value;
        }
        Controller.addItem(obj)

        return false;
    },

}
