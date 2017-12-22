/**
 * Prototype for renderable object
 *
 * @abstract
 */
const View = (function () {
    return {
        /**
         * @var {String} Output buffer
         */
        html: "",
        /**
         * Add string to output buffer
         * @private
         *
         * @param text
         */
        _out: function (text) {
            this.html += text;
        },
        /**
         * Renders to DOM Node
         *
         * @param nodeId target DOM node ID
         */
        render: function (nodeId) {
            document.getElementById(nodeId).innerHTML = this.html;
        }}
})();