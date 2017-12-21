const View = {
    html: "",
    _out: function (text) {
        this.html += text;

    },
    /**
     * renders Table
     * @param nodeId target DOM node ID
     */
    render: function (nodeId) {
        document.getElementById(nodeId).innerHTML = this.html;

    },

}