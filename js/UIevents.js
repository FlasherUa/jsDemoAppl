/**
 * User interface events holder
 */
const UIevents = (function () {
    return {
        change:Controller.change,
        selectRow: Controller.selectRow,
        sortBy: Controller.sortBy,
        clearSort: Controller.clearSort,
        filter: Controller.filter,
        page: Controller.page,
        del: Controller.del,
        /**
         * Add button clicked
         */
        showAddForm: function () {
            //hide butt
            var formC = document.getElementById("formContainer");
            formC.classList.add("shown")
            Controller.showAddForm()
        },
        /**
         * On add form submit action
         * @return {boolean} false
         */
        addItem: function () {
            var elements = document.getElementById("addForm").elements;
            var obj = [];
            for (var i = 0; i < elements.length; i++) {

                var item = elements.item(i);
                if (item.name !== "") obj[item.name] = item.value;
            }
            Controller.addItem(obj)
            return false;
        },
    }
})();
