const express = require("express");
const router = express.Router();
const burger = require("../models/burger");

// Create all our routes and set up logic within those routes where required.
router.get("/", function (req, res) {
    burger.selectAll(function (data) {
        var burgObj = {
            burgers: data
        };
        res.render("index", burgObj);
    });
});

router.post("/api/burgers", function (req, res) {
    burger.insertOne('burger_name', req.body.burger_name, function (data) {
        res.json({ id: data.insertId });
    });
});

router.put("/api/burgers", function (req, res) {
    let state = "id = '" + req.body.id + "'";
    let col, val;
    if (req.body.burger_name) {
        col = "burger_name";
        val = req.body.burger_name;
    } else {
        col = "devoured";
        val = req.body.devoured;
    }
    burger.updateOne(col, val, state, function (result) {
        if (result.changedRows === 0) {

            return res.status(404).end();
        }
        res.status(200).end();
    });
});

router.delete("/api/burgers", function (req, res) {
    let state = "id = '" + req.body.id + "'";
    burger.deleteOne(state, function () {
        res.status(200).end();
    });
});

module.exports = router;