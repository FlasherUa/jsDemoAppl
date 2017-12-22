QUnit.test("Table View test Simple", function (assert) {
    var model = SampleData()[0];
    Controller.setModel(model);

    var $tab = $("#tab table")
    assert.equal($tab.find("tr").length, 4, "tr count");
    assert.equal($tab.find("th").length, 4, "th count");
    assert.equal($tab.find("td").length, 12, "th count");
    assert.equal($tab.find("button").length, 8, "buttons count");

    //do sort
    var header =$tab.find("th")[3]
    var $butt=$(header).find("button.desc");

    //assert.equal($tab.find("td")[0].innerHTML, "3", "first ID value");

    assert.ok($butt.length, 1, "tr count");
    $butt.click();

    assert.equal($tab.find("td")[0].innerHTML, "1", "first ID value");

})


QUnit.test("Table View test Complex", function (assert) {
    var model = SampleData()[1];
    Controller.setModel(model);

    var $tab = $("#tab table")
    assert.equal($tab.find("tr").length, 6, "tr count");
    assert.equal($tab.find("th").length, 5, "th count");
    assert.equal($tab.find("td").length, 25, "td count");

    assert.equal($(".pages button").length, 4, "pages butt count");

    var $filter=$("#filter")
    $filter.val("iPhone");
    $filter.trigger("change")

    assert.equal($(".pages button").length, 1, "pages butt count");

    $(".pages button").click();
    $tab = $("#tab table")
    assert.equal($tab.find("td").length, 20, "td count");

})