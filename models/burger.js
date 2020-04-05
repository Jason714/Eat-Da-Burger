const orm = require("../config/orm");

let burger = {
    selectAll: function (cb) {
        orm.selectAll("burgers", function (res) {
            cb(res);
        });
    },

    insertOne: function (cols, vals, cb) {
        orm.insertOne("burgers", cols, vals, function (res) {
            cb(res);
        });
    },

    updateOne: function (cols, vals, state, cb) {
        orm.updateOne("burgers", cols, vals, state, function (res) {
            cb(res);
        });
    },

    deleteOne: function (state, cb) {
        orm.deleteOne("burgers", state, function (res) {
            cb(res);
        });
    }
};

module.exports = burger;