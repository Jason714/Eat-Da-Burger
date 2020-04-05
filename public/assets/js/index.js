$(document).ready(function () {

    $(document).on("click", ".burger-item", editRecord);
    $(document).on("keyup", ".burger-item", finishEdit);
    $(document).on("blur", ".burger-item", hideEdit);
    $(document).on("click", "button.delete", deleteRecord);
    $(document).on("click", ".change-devour", updateDevour);

    $(".create-form").on("submit", function (event) {
        event.preventDefault();

        let newBurger = {
            burger_name: $("#burger_name").val().trim()
        };

        $.post("/api/burgers", newBurger)
            .then(function () {
                console.log("Created burger");
                location.reload();
            });

        $("#burger_name").val("");

    });

    function editRecord() {
        if ($(this).hasClass("list-group-item-warning")) {
            const name = $(this).data("name");
            $(this).children().children().children("span").hide();
            $(this).children().children().children("input.edit").val(name);
            $(this).children().children().children("input.edit").show();
            $(this).children().children().children("input.edit").focus();
        }
    }

    // This function starts updating a todo in the database if a user hits the "Enter Key"
    function finishEdit(event) {
        var updatedInfo = {
            id: $(this).children().children().children("input").data("id")
        }
        if (event.which === 13) {
            updatedInfo.burger_name = $(this).children().children().children("input").val().trim();
            $(this).blur();
            updateRecord($(this), updatedInfo);
        }
    }

    // This function is called whenever a burger item is in edit mode and loses focus
    function hideEdit() {
        var currentRec = $(this).children().children().children("input").data("id");
        if (currentRec) {
            $(this).children().children().children("input.edit").hide();
            $(this).children().children().children("input.edit").val($(this).data("name"));
            $(this).children().children().children("span").show();
            $(this).children().children().children("button").show();
        }
    }

    function updateRecord(obj, info) {
        $.ajax({
            method: "PUT",
            url: "/api/burgers",
            data: info
        }).then(function (result) {
            if (obj) {
                obj.data("name", info.burger_name);
                obj.children().children().children("span").text(info.burger_name);
                obj.children().children().children("input.edit").val(info.burger_name);
            } else {
                location.reload();
            }
        });
    }

    // This function deletes a todo when the user clicks the delete button
    function deleteRecord(event) {
        event.stopPropagation();
        var id = $(this).data("id");
        $.ajax({
            method: "DELETE",
            url: "/api/burgers",
            data: { id: id }
        }).then(function () {
            location.reload();
        });
    }

    function updateDevour() {
        var updatedInfo = {
            id: $(this).data("id")
        }
        updatedInfo.devoured = 1;
        updateRecord('', updatedInfo);
    }
});