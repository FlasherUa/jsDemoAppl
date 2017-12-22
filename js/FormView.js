/**
 * Form item renderer
 * @extends View
 */
let FormView = (function () {
    /**
     * Form item renderer prototype
     */
    let FormViewProto = {
        /**
         * Render form cycle
         * @private
         */
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
                    this._out(out);
                    keyIndex++
                }
            }
            this._out(FormTemplates.form[1]);
        }
    };
    /**
     * Form item renderer constructor
     *
     * @param model
     * @constructor
     */
    let FormView = function (model) {
        this.model = model;
        this.html = "";
        this._renderForm();
    }

    //apply prototypes
    Object.assign(FormViewProto, View);
    FormView.prototype = FormViewProto
    /**
     * Templates
     */
    let FormTemplates = {
        form: ["<h3>Enter new item values:</h3><form id='addForm' onsubmit='return false;'>", "<button onclick='UIevents.addItem(); return false;'>Submit</button>"],
        inpContainer: ["<div>", "</div>"],
        input: ["<input type='text' value='' name='", "'>"]

    };
    /**
     * @export
     */
    return FormView
})();