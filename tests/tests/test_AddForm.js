QUnit.test("Form Add  test", function (assert) {
    var model = SampleData()[0];
    Controller.setModel(model);


    assert.equal($("#form form").length, 0, "form hiden count");

    $("#add").click();
    assert.equal($("#form form").length, 1, "form shown count");

    var $inputs = $("#form form").find("input");

    var i = 0;
    $inputs.each(function () {
        this.value = "Value " + i;
        i++
    })

    $("#form form button").click()

    $inputs.each(function () {
        this.value = "Value " + i;
        i++
    })

    $("#form form button").click()

    $inputs.each(function () {
        this.value = "Value " + i;
        i++
    })

    $("#form form button").click()
    assert.equal($(".pages button").length, 1, "pages butt count");

    var td = $("table td")[19]
    assert.equal(td.innerHTML, "Value 7", "Value check ");
    $(td).click()
    $("#del").click()
    $("table td").first().click()
    $("#del").click()

    assert.equal($("table tr").length, 5, "tr count");

})