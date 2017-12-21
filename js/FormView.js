var FormViewProto = {
    /**
     * return form values array
     * @return array
     */
    getValues: function () {


    },
    _renderForm: function () {

        this._out(FormTemplates.form[0]);

        const header = this.model.getDataHeader();
        let keyIndex = 0;
        for (let key in header) {
            if (header.hasOwnProperty(key)) {

                //add header cell
                let out = FormTemplates.inpContainer[0] +
                    header[key] +
                    FormTemplates.input[0] +
                    keyIndex +
                    FormTemplates.input[1] +
                    FormTemplates.inpContainer[1];
                ;
                this._out(out);
                keyIndex++
            }
        }

        this._out(FormTemplates.form[1]);
    }
}


var FormView = function (model) {
    this.model = model;
    this.html = "";
    this._renderForm();
}

Object.assign(FormViewProto, View);
FormView.prototype = FormViewProto

//s="<div> Title <input type='text' value='' name='Key'></div>";
var FormTemplates = {
    form: ["<h3>Enter new item values:</h3><form id='addForm' onsubmit='return false;'>", "<button onclick='UIevents.addItem(); return false;'>Submit</button>"],
    inpContainer: ["<div>", "</div>"],
    input: ["<input type='text' value='' name='", "'>"]

};
