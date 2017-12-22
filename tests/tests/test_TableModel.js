/**
 * Unit test TableModel
 */

var tableModel = new TableModel(SampleData()[0]);

QUnit.test("Table Model raw data test", function (assert) {

    var header = tableModel.getDataHeader();
    assert.deepEqual(header, SampleData()[0][0], "Passed!");

});


QUnit.test("Table Model sorted data test", function (assert) {

    var tableModel = new TableModel(SampleData()[0]);

    tableModel.filter = "";
    tableModel.sort = 0
    tableModel.sortDir = "desc";
    var rows = tableModel.getDataRows()
    var ids = getItds(rows)
    assert.deepEqual(ids, [3, 2, 1], "0, desc");

    tableModel.sort = 1
    tableModel.sortDir = "asc";
    rows = tableModel.getDataRows();
    ids = getItds(rows);
    assert.deepEqual(ids, [2, 3, 1], "1 asc ");

    tableModel.sort = 1
    tableModel.sortDir = "desc";
    rows = tableModel.getDataRows();
    ids = getItds(rows);
    assert.deepEqual(ids, [1, 3, 2], "1 desc ");

});


QUnit.test("Table Model filtered data test", function (assert) {

    var tableModel = new TableModel(SampleData()[0]);

    tableModel.filter = "i"
    var rows = tableModel.getDataRows()
    var ids = getItds(rows)
    assert.deepEqual(ids, [2], "i filter ");

    tableModel.filter = "o"
    rows = tableModel.getDataRows();
    ids = getItds(rows);
    assert.deepEqual(ids, [2, 3], "o filter ");

    tableModel.filter = "o";
    tableModel.sort = 1;
    tableModel.sortDir = "desc";
    rows = tableModel.getDataRows();
    ids = getItds(rows);
    assert.deepEqual(ids, [3, 2], "o filter+sort ");


    tableModel.filter = "o";
    tableModel.sort = 1;
    tableModel.sortDir = "asc";
    rows = tableModel.getDataRows();
    ids = getItds(rows);
    assert.deepEqual(ids, [2, 3], "o filter+sort2 ");
});


QUnit.test("Table Model pages data test", function (assert) {

    var tableModel = new TableModel(SampleData()[1]);

    tableModel.filter = "i"
    var rows = tableModel.getDataRows()
    var ids = getItds(rows)
    assert.ok(rows.length == 5, " lenght ");
    assert.deepEqual(ids, [1, 2, 3, 4, 5], " page ids ");
});
/**
 * return ids for data
 * @param rows
 * @return {Array}
 */
var getItds = function (rows) {
    var out = []
    rows.forEach(function (item) {
        out.push(item[1])
    })

    return out;
}